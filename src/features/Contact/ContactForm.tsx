import { Input, Textarea, Checkbox, Button, Tabs, Tab } from '@nextui-org/react'
import { useTranslations, useLocale } from 'next-intl'
import { useFormState, useFormStatus } from 'react-dom'
import {
  submitContactForm,
  populate,
  wipe,
  toggleSave,
  FieldError,
  textareaMaxLength,
} from '@/features/Contact'
import { Product } from '@/features/Product'
import { useEffect, useMemo, useState } from 'react'
import { FormStateType } from '@/features/Form'
import { useAppSelector, useAppDispatch } from '@/features/Store'
import clsx from 'clsx'

function SubmitButton() {
  const t = useTranslations('features.contact')
  const { pending } = useFormStatus()

  return (
    <Button type="submit" color="primary" isLoading={pending}>
      {t('send')}
    </Button>
  )
}

interface ContactFormProps {
  handleClose: () => void
  product?: Product
}

export default function ContactForm({ handleClose, product }: ContactFormProps) {
  // language
  const t = useTranslations('features')
  const locale = useLocale()

  // store - contact slice
  const contact = useAppSelector((state) => state.contact)
  const dispatch = useAppDispatch()

  // textarea length description
  const [textareaValue, setTextareaValue] = useState(contact.message)

  // form
  const [formState, formAction] = useFormState(submitContactForm, null)
  const formErrors = useMemo(() => {
    if (!formState || formState.type !== FormStateType.FAILED) return null
    const mappedFormErrors: Record<string, string> = {}

    Object.entries(formState.errors).forEach(([key, value]) => {
      let message: string

      switch (value[0]) {
        case FieldError.EMPTY:
          message = t('error.fieldEmpty')
          break
        case FieldError.WRONG_FORMAT:
          message = t('error.fieldWrongFormat')
          break
        case FieldError.TOO_LONG:
          message = t('error.fieldTooLong')
          break
        default:
          message = t('error.unknown')
          break
      }

      mappedFormErrors[key] = message
    })

    return mappedFormErrors
  }, [formState, t])

  useEffect(() => {
    if (formState === null || formState.type === FormStateType.FAILED) {
      // console.debug(formErrors)
      return
    }

    if (formState.data?.save) {
      dispatch(populate(formState.data))
    } else {
      dispatch(wipe(undefined))
    }

    handleClose()
  }, [dispatch, formErrors, formState, formState?.type, handleClose])

  return (
    <form className="flex flex-col gap-4 pb-4" action={formAction}>
      {product && (
        <>
          <Input isRequired type="hidden" className="hidden" name="productId" value={product.id} />
          <Input isRequired type="hidden" className="hidden" name="productTitle" value={product.title.ru} />
        </>
      )}

      <Input isRequired type="hidden" className="hidden" name="url" value={window.location.toString()} />
      <Input isRequired type="hidden" className="hidden" name="locale" value={locale} />

      <Tabs
        classNames={{ panel: 'p-0' }}
        aria-label={`${t('contact.legalEntity')}/${t('contact.individual')}}`}
        fullWidth
        defaultSelectedKey={contact.save && !contact.companyName ? 'individual' : 'legalEntity'}
      >
        <Tab key="legalEntity" title={t('contact.legalEntity')}>
          <Input isRequired type="hidden" className="hidden" name="userType" value="legalEntity" />
          <Input
            isRequired={false}
            type="text"
            name="companyName"
            label={t('contact.companyName')}
            defaultValue={contact.companyName}
            isInvalid={Boolean(formErrors && formErrors?.companyName && formErrors.companyName.length > 0)}
            errorMessage={formErrors ? formErrors?.companyName && formErrors.companyName : ''}
          />
        </Tab>
        <Tab key="individual" title={t('contact.individual')}>
          <Input isRequired type="hidden" className="hidden" name="companyName" value="" />
          <Input isRequired type="hidden" className="hidden" name="userType" value="individual" />
        </Tab>
      </Tabs>

      <Input
        isRequired={false}
        type="text"
        name="fullName"
        label={t('contact.fullName')}
        defaultValue={contact.fullName}
        isInvalid={Boolean(formErrors && formErrors?.fullName && formErrors.fullName.length > 0)}
        errorMessage={formErrors ? formErrors?.fullName && formErrors.fullName : ''}
      />

      <Input
        isRequired={false}
        type="email"
        name="email"
        label={t('contact.email')}
        defaultValue={contact.email}
        isInvalid={Boolean(formErrors && formErrors?.email && formErrors.email.length > 0)}
        errorMessage={formErrors ? formErrors?.email && formErrors.email : ''}
      />

      <Input
        isRequired={false}
        type="tel"
        name="phone"
        label={t('contact.phone')}
        description={t('contact.phoneDescription')}
        defaultValue={contact.phone}
        isInvalid={Boolean(formErrors && formErrors?.phone && formErrors.phone.length > 0)}
        errorMessage={formErrors ? formErrors?.phone && formErrors.phone : ''}
      />

      <Checkbox name="hasTelegram" defaultSelected={contact.hasTelegram}>
        {t('contact.communicateVia', { application: 'Telegram' })}
      </Checkbox>

      <Checkbox name="hasWhatsApp" defaultSelected={contact.hasWhatsApp}>
        {t('contact.communicateVia', { application: 'WhatsApp' })}
      </Checkbox>

      <div>
        <Textarea
          name="message"
          label={t('contact.message')}
          defaultValue={contact.message}
          min={0}
          max={textareaMaxLength}
          minRows={5}
          maxRows={10}
          value={textareaValue}
          onValueChange={setTextareaValue}
          isInvalid={Boolean(formErrors && formErrors?.message && formErrors.message.length > 0)}
          // errorMessage={formErrors ? formErrors?.message && formErrors.message : ''}
        />

        <div className="flex flex-row justify-between text-tiny p-1 gap-1.5">
          <p className="text-danger">{formErrors ? formErrors?.message && formErrors.message : ''}</p>

          <p className={clsx('opacity-70', textareaValue.length > textareaMaxLength ? 'text-danger' : '')}>
            {textareaValue.length}/{textareaMaxLength}
          </p>
        </div>
      </div>

      <Checkbox
        name="save"
        defaultSelected={contact.save}
        onValueChange={(save) => dispatch(toggleSave(save))}
      >
        {t('contact.save')}
      </Checkbox>

      {formErrors &&
        ('url' in formErrors || 'locale' in formErrors || Object.keys(formErrors).length === 0) && (
          <div className="p-2 bg-danger text-danger-foreground text-medium rounded-lg">
            {t('error.somethingWentWrong')}
          </div>
        )}

      <SubmitButton />

      <Button type="reset" onClick={handleClose}>
        {t('menu.cancel')}
      </Button>
    </form>
  )
}