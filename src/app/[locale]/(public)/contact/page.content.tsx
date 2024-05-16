'use client'

import Section from '@/features/Page/Section'
import { Card, CardBody, Link } from '@nextui-org/react'
import {
  ContactForm,
  createTelegramLink,
  createWhatsAppLink,
  normalizePhoneNumber,
  contactInformation,
} from '@/features/Contact'
import {
  Phone,
  BuildingOffice,
  MapPin,
  WhatsappLogo,
  TelegramLogo,
  FileText,
  Hash,
  Envelope,
} from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { CopyButton } from '@/features/Copy'

interface ContactFieldProps {
  Icon: typeof Phone
  href?: string
  description: string
  content: string
}

function ContactField({ href, Icon, description, content }: ContactFieldProps) {
  return (
    <div className="flex flex-row justify-between items-center gap-4 group/row">
      <Link className="flex flex-row gap-4 text-foreground w-full" href={href} isExternal>
        <Icon aria-label={description} className="flex-shrink-0" />

        <div className="flex flex-col">
          <span>{content}</span>
          <small className="text-tiny opacity-70">{description}</small>
        </div>
      </Link>

      <CopyButton copyContent={content} />
    </div>
  )
}

export default function PageContent() {
  const t = useTranslations()

  return (
    <Section className="flex flex-col md:flex-row gap-6 items-start">
      <Card className="w-full">
        <CardBody className="flex flex-col gap-4 p-4">
          <ContactField
            href={`https://google.com/search?q="${contactInformation.companyName}"`}
            Icon={BuildingOffice}
            description={t('features.contact.companyName')}
            content={contactInformation.companyName}
          />

          <ContactField
            Icon={Hash}
            description={t('features.contact.companyId')}
            content={contactInformation.companyId}
          />

          <ContactField
            href={`https://maps.google.com/?q="${contactInformation.companyLegalAddress}"`}
            Icon={MapPin}
            description={t('features.contact.companyLegalAddress')}
            content={contactInformation.companyLegalAddress}
          />

          <ContactField
            Icon={FileText}
            description={t('features.contact.companyCommercialRegister')}
            content={t('features.contact.companyCommercialRegisterLabel')}
          />

          <ContactField
            href={`tel:${normalizePhoneNumber(contactInformation.contactPhone)}`}
            Icon={Phone}
            description={t('features.contact.phone')}
            content={contactInformation.contactPhone}
          />

          <ContactField
            href={`mailto:${contactInformation.contactEmail}`}
            Icon={Envelope}
            description={t('features.contact.email')}
            content={contactInformation.contactEmail}
          />

          <ContactField
            href={createTelegramLink(contactInformation.contactPhone)}
            Icon={TelegramLogo}
            description="Telegram"
            content={contactInformation.contactPhone}
          />

          <ContactField
            href={createWhatsAppLink(contactInformation.contactPhone)}
            Icon={WhatsappLogo}
            description="WhatsApp"
            content={contactInformation.contactPhone}
          />
        </CardBody>
      </Card>

      <Card className="w-full">
        <CardBody className="p-4">
          <ContactForm />
        </CardBody>
      </Card>
    </Section>
  )
}
