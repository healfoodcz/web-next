'use server'

import { headers } from 'next/headers'
import { FormState, createFailedFormState, createSuccessfulFormState } from '@/features/Form'
import {
  contactFormSchema,
  createWhatsAppLink as createWALink,
  createTelegramLink as createTgLink,
} from '@/features/Contact/lib'
import { getTelegramBot } from '@/features/Contact/lib.server'

// formatting helpers
function bold(text?: string) {
  if (!text) return undefined

  return `<b>${text}</b>`
}

// function italic(text?: string) {
//   if (!text) return undefined
//
//   return `<i>${text}</i>`
// }

function spoiler(text?: string) {
  if (!text) return undefined

  return `<span class="tg-spoiler">${text}</span>`
}

function blockquote(text?: string) {
  if (!text) return undefined

  return `<blockquote>${text}</blockquote>`
}

function link(text?: string, url?: string, includeUrl: boolean = false) {
  if (!text || !url) return undefined

  return `<a href="${url}">${text}${includeUrl ? ` (${url})` : ''}</a>`
}

function keyValue(key: string, value?: string | null, condition?: boolean) {
  if (condition === false || !value) return undefined

  return `${key}: ${bold(value)}`
}

function escapeHtml(text?: string | null) {
  if (!text) return undefined

  const escapeChars = /[<>&]/g

  const replaceFn = (character: string) => {
    switch (character) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '&':
        return '&amp;'
      case '\r\n':
        return '\n'
      default:
        return character
    }
  }

  return text.replace(escapeChars, replaceFn)
}

export async function submitContactForm(_: FormState, formData: FormData) {
  // gather & validate the form data
  const fields = contactFormSchema.safeParse({
    url: formData.get('url'),
    locale: formData.get('locale'),
    productId: formData.get('productId'),
    productTitle: formData.get('productTitle'),
    userType: formData.get('userType'),
    companyName: formData.get('companyName'),
    fullName: formData.get('fullName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    hasTelegram: formData.has('hasTelegram'),
    hasWhatsApp: formData.has('hasWhatsApp'),
    message: formData.get('message'),
    save: formData.has('save'),
    agreeWithPrivacyPolicy: formData.has('agreeWithPrivacyPolicy'),
  })

  if (fields.success) {
    console.info('Processing contact form. Validating. Details:\n', JSON.stringify(fields.data, null, 2))
  } else {
    console.error('Contact form validation failed. Details:\n', JSON.stringify(fields.error, null, 2))
    return createFailedFormState(fields.error.flatten().fieldErrors)
  }

  // additional data
  const ip = headers().get('x-forwarded-for') ?? undefined

  // create inquiry
  /*
    example (for simplicity, formatting via Telegram Markdown was shown):
      Внимание: Неподдельные данные в целях тестирования
      Страница отправки: **http://localhost:3000/cs/catalog/fruits-and-vegetables/apple**
      IP отправки: **||127.0.0.1||**
      Язык: en
      Название товара: **яблоко**
      ID товара: **apple**
      Сообщение:
      **
      > Hello,
      > I would be interested in buying apples at a wholesale scale. What would be the price?
      > Thanks
      **
      Полное имя: **Some Name**
      Название компании: **Some Company Name**
      Эл. адрес: **some@email.address**
      Номер телефона: **+0 123 456 789**
      Доступен в Telegram: **[Да](https://t.me/+0123456789)**
      Доступен в WhatsApp: **[Да](https://wa.me/+0123456789)**
   */
  const inquiry = [
    keyValue(
      'Внимание',
      process.env.NODE_ENV !== 'production' ? 'Неподдельные данные в целях тестирования' : undefined,
    ),
    keyValue('Страница отправки', fields.data.url),
    keyValue('IP отправки', spoiler(ip)),
    keyValue('Язык', fields.data.locale),
    keyValue('Название товара', fields.data.productTitle),
    keyValue('ID товара', fields.data.productId),
    keyValue('Сообщение', blockquote(escapeHtml(fields.data.message))),
    keyValue('Полное имя', fields.data.fullName),
    keyValue('Название компании', fields.data.companyName),
    keyValue('Эл. адрес', fields.data.email),
    keyValue('Номер телефона', fields.data.phone),
    keyValue('Доступен в Telegram', link('Да', createTgLink(fields.data.phone)), fields.data.hasTelegram),
    keyValue('Доступен в WhatsApp', link('Да', createWALink(fields.data.phone)), fields.data.hasWhatsApp),
  ]
    .filter(Boolean)
    .join('\n')

  // send inquiry
  console.info(
    'Sending inquiry to the Telegram bot. Details:\n',
    `(inquiry length ${inquiry.length})`,
    inquiry,
  )

  const telegramBot = await getTelegramBot()
  try {
    const botAnswer = await telegramBot.sendMessage(process.env.TELEGRAM_CHAT_ID as string, inquiry, {
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    })
    console.info('Sending inquiry to the Telegram bot was successful. Details:\n', botAnswer)
  } catch (error) {
    if (error instanceof Error) {
      console.error('Sending inquiry to the Telegram bot failed. Details:\n', JSON.stringify(error, null, 2))
    } else {
      console.error('Sending inquiry to the Telegram bot failed.')
    }

    return createFailedFormState()
  }

  // action result
  // TODO: would be great to create a way to pass as a generic argument a schema types representation
  //  of a data property in a form state
  return createSuccessfulFormState(fields.data)
}
