import { Input, Textarea, Checkbox, Button, Tabs, Tab, Link } from '@nextui-org/react'
import { useTranslations, useLocale } from 'next-intl'
import { useFormState, useFormStatus } from 'react-dom'
import { useEffect, useMemo, useState, useCallback } from 'react'
import { Product } from '@/features/Product'
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
  const [userType, setUserType] = useState(contact.userType)

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
  const getFieldValidator = useCallback(
    (fieldName: string) => () => {
      if (!formErrors || !(fieldName in formErrors)) return true

      return formErrors[fieldName]
    },
    [formErrors],
  )

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
    if (!formState || formState.type === FormStateType.FAILED) return

    setView('thank-you')
    dispatch(formState.data?.save ? populate(formState.data) : wipe(undefined))
  }, [dispatch, formState, formState?.type, handleClose])

  // shared class names, props, ...
  const wrapperClassName = useMemo(() => clsx('flex flex-col gap-4', handleClose && 'pb-4'), [handleClose])
  const hiddenInputProps = useMemo(() => ({ isRequired: true, type: 'hidden', className: 'hidden' }), [])

  // handle "thank-you" view render
  if (view === 'thank-you') {
    return (
      <div className={wrapperClassName}>
        <p>{t('contact.formSentSuccessfully')}</p>
        <Button color="primary" onClick={handleThankYouClick}>
          {t('menu.done')}
        </Button>
      </div>
    )
  }

  return (
    <form className={wrapperClassName} action={formAction}>
      <Tabs
        aria-label={`${t('contact.legalEntity')}/${t('contact.individual')}}`}
        fullWidth
        selectedKey={userType}
        onSelectionChange={(key) => setUserType(key.toString())}
      >
        <Tab key="legalEntity" title={t('contact.legalEntity')} />
        <Tab key="individual" title={t('contact.individual')} />
      </Tabs>

      <Input {...hiddenInputProps} name="productId" value={product?.id} />
      <Input {...hiddenInputProps} name="productTitle" value={product?.title.ru} />
      <Input {...hiddenInputProps} name="url" value={window.location.toString()} />
      <Input {...hiddenInputProps} name="locale" value={locale} />
      <Input {...hiddenInputProps} name="userType" value={userType} />

      <Input
        isRequired={userType === 'legalEntity'}
        type="text"
        name="companyName"
        label={t('contact.companyName')}
        defaultValue={contact.companyName}
        validate={getFieldValidator('companyName')}
        classNames={{
          label: clsx(userType === 'legalEntity' ? 'max-h-[20px]' : 'max-h-0', 'transition-all'),
        }}
        className={clsx(
          // eslint-disable-next-line no-nested-ternary
          userType === 'legalEntity'
            ? // shown
              !formErrors || 'companyName' in formErrors
              ? // ... and has error label below
                'opacity-100 max-h-[80px] mt-0 mb-0'
              : // ... and doesn't have error label below
                'opacity-100 max-h-[56px] mt-0 mb-0'
            : // hidden
              'opacity-0 max-h-0 -mt-2 -mb-2',
          'transition-all ease-[cubic-bezier(.47,1.83,.68,.99)] duration-500 ',
        )}
      />

      <Input
        isRequired
        type="text"
        name="fullName"
        label={t('contact.fullName')}
        defaultValue={contact.fullName}
        validate={getFieldValidator('fullName')}
      />

      <Input
        isRequired
        type="email"
        name="email"
        label={t('contact.email')}
        defaultValue={contact.email}
        validate={getFieldValidator('email')}
      />

      <Input
        isRequired
        type="tel"
        name="phone"
        label={t('contact.phone')}
        description={t('contact.phoneDescription')}
        defaultValue={contact.phone}
        validate={getFieldValidator('phone')}
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
          isInvalid={textareaValue.length > textareaMaxLength}
        />

        <div className="flex flex-row justify-between text-tiny p-1 gap-1.5">
          <p className="text-danger">
            {textareaValue.length > textareaMaxLength ? t('error.fieldTooLong') : ''}
          </p>

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
          validate={getFieldValidator('agreeWithPrivacyPolicy')}
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
        <p className="text-tiny p-1 text-danger">{getFieldValidator('agreeWithPrivacyPolicy')()}</p>
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
