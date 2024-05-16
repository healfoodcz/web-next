import { Input, Textarea, Checkbox, Button, Tabs, Tab, Link } from '@nextui-org/react'
import { useTranslations, useLocale } from 'next-intl'
import { useFormState, useFormStatus } from 'react-dom'
import { Product } from '@/features/Product'
import { useEffect, useMemo, useState } from 'react'
import { FormStateType } from '@/features/Form'
import { useAppSelector, useAppDispatch } from '@/features/Store'
import clsx from 'clsx'
import { submitContactForm } from './actions'
import { FieldError, textareaMaxLength } from './lib'
import { populate, wipe, toggleSave } from './slices'

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
  handleClose?: () => void
  product?: Product
}

export default function ContactForm({ handleClose, product }: ContactFormProps) {
  // language
  const t = useTranslations('features')
  const locale = useLocale()

  // store - contact slice
  const contact = useAppSelector((state) => state.contact)
  const dispatch = useAppDispatch()

  // tabs
  const [tabsKey, setTabsKey] = useState(contact.userType)

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
        case FieldError.MUST_BE_CHECKED:
          message = t('error.mustBeChecked')
          break
        default:
          message = t('error.unknown')
          break
      }

      mappedFormErrors[key] = message
    })

    return mappedFormErrors
  }, [formState, t])

  // form view - the form itself or the "thank-you" view
  const [view, setView] = useState<'form' | 'thank-you'>('form')

  function handleThankYouClick() {
    if (handleClose) {
      return handleClose()
    }

    return setView('form')
  }

  // redux effect
  useEffect(() => {
    if (formState === null || formState.type === FormStateType.FAILED) {
      // console.debug(formErrors)
      return
    }

    setView('thank-you')

    if (formState.data?.save) {
      dispatch(populate(formState.data))
    } else {
      dispatch(wipe(undefined))
    }

    // update: don't close since there is "thank-you" view that will handle this
    // if (handleClose) {
    //   handleClose()
    // }
  }, [dispatch, formErrors, formState, formState?.type, handleClose])

  // shared class names
  const className = useMemo(() => clsx('flex flex-col gap-4', handleClose && 'pb-4'), [handleClose])

  // handle "thank-you" view render
  if (view === 'thank-you') {
    return (
      <div className={className}>
        <p>{t('contact.formSentSuccessfully')}</p>
        <Button color="primary" onClick={handleThankYouClick}>
          {t('menu.done')}
        </Button>
      </div>
    )
  }

  return (
    <form className={className} action={formAction}>
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
        selectedKey={tabsKey}
        onSelectionChange={(key) => setTabsKey(key.toString())}
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
        className={tabsKey === 'individual' ? '-mt-4' : ''}
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
          min={0}
          max={textareaMaxLength}
          minRows={5}
          maxRows={10}
          value={textareaValue}
          onValueChange={setTextareaValue}
          isInvalid={Boolean(formErrors && formErrors?.message && formErrors.message.length > 0)}
        />

        {/* instead of text area's errorMessage because two custom columns */}
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

      <div>
        <Checkbox
          name="agreeWithPrivacyPolicy"
          defaultSelected={contact.agreeWithPrivacyPolicy}
          required
          isInvalid={Boolean(
            formErrors && formErrors?.agreeWithPrivacyPolicy && formErrors.agreeWithPrivacyPolicy.length > 0,
          )}
        >
          {t.rich('documents.iAgreeWithPrivacyPolicy', {
            l: (chunks: any) => (
              <Link href="/documents/privacy-policy" isExternal className="inline">
                {chunks}
              </Link>
            ),
          })}
        </Checkbox>

        {/* errorMessage prop that is missing on <Checkbox /> */}
        <p className="text-tiny p-1 text-danger">
          {formErrors ? formErrors?.agreeWithPrivacyPolicy && formErrors.agreeWithPrivacyPolicy : ''}
        </p>
      </div>

      {formErrors &&
        ('url' in formErrors || 'locale' in formErrors || Object.keys(formErrors).length === 0) && (
          <div className="p-2 bg-danger text-danger-foreground text-medium rounded-lg">
            {t('error.somethingWentWrong')}
          </div>
        )}

      <SubmitButton />

      {handleClose && (
        <Button type="reset" onClick={handleClose}>
          {t('menu.cancel')}
        </Button>
      )}
    </form>
  )
}
