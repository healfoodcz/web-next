'use client'

import { Section } from '@/features/Page'
import { useTranslations } from 'next-intl'
import { Breadcrumbs, BreadcrumbItem, ScrollShadow } from '@nextui-org/react'
import React from 'react'
import { LocaleParams } from '@/features/Translations'

// export async function generateMetadata({ params: { locale } }: LocaleParams) {
//   const t = await getTranslations({ locale, namespace: 'pages.juridical.privacyPolicy' })
//
//   return {
//     title: createTitle(t('titleAndLink')),
//     description: '',
//   }
// }

export default function PageContent({ params }: LocaleParams) {
  const t = useTranslations()

  return (
    <Section>
      <ScrollShadow orientation="horizontal" className="w-full">
        <Breadcrumbs className="[&>ol]:flex-nowrap">
          <BreadcrumbItem>{t('features.documents.label')}</BreadcrumbItem>
          <BreadcrumbItem>{t('pages.juridical.privacyPolicy.titleAndLink')}</BreadcrumbItem>
        </Breadcrumbs>
      </ScrollShadow>

      {params.locale !== 'cs' && (
        <div className="py-3 px-4 bg-default/50 text-danger-foreground text-medium rounded-lg">
          {t('features.documents.privacyPolicyOnlyInCzech')}
        </div>
      )}

      <div className="prose dark:prose-invert text-justify max-w-none">
        <h1>Zásady ochrany osobních údajů</h1>

        <ol className="list-[upper-roman]">
          <li>
            <h2>Základní ustanovení</h2>

            <ol>
              <li>
                <p>
                  Správcem osobních údajů podle čl. 4 bod 7 nařízení Evropského parlamentu a&nbsp;Rady (EU)
                  2016/679 o&nbsp;ochraně fyzických osob v&nbsp;souvislosti se zpracováním osobních údajů
                  a&nbsp;o&nbsp;volném pohybu těchto údajů (dále jen: „GDPR”) je HEALFOOD&nbsp;CZ&nbsp;s.r.o.
                  IČ 09552481 se sídlem K.&nbsp;Čapka 1231/6, 360 01 Karlovy Vary (dále jen: „správce“).
                </p>
              </li>
              <li>
                <p>
                  Kontaktní údaje správce jsou <br />
                  adresa: K. Čapka 1231/6, 360 01 Karlovy Vary <br />
                  email: familydvorovoy@gmail.com <br />
                  telefon: +420 775 587 855
                </p>
              </li>
              <li>
                <p>
                  Osobními údaji se rozumí veškeré informace o&nbsp;identifikované nebo identifikovatelné
                  fyzické osobě; identifikovatelnou fyzickou osobou je fyzická osoba, kterou lze přímo či
                  nepřímo identifikovat, zejména odkazem na určitý identifikátor, například jméno,
                  identifikační číslo, lokační údaje, síťový identifikátor nebo na jeden či více zvláštních
                  prvků fyzické, fyziologické, genetické, psychické, ekonomické, kulturní nebo společenské
                  identity této fyzické osoby.
                </p>
              </li>
              <li>
                <p>Správce nejmenoval pověřence pro ochranu osobních údajů.</p>
              </li>
            </ol>
          </li>

          <li>
            <h2>Zdroje a&nbsp;kategorie zpracovávaných osobních údajů</h2>

            <ol>
              <li>
                <p>
                  Správce zpracovává osobní údaje, které jste mu poskytl/a nebo osobní údaje, které správce
                  získal na základě plnění Vaší objednávky.
                </p>
              </li>
              <li>
                <p>
                  Správce zpracovává Vaše identifikační a&nbsp;kontaktní údaje a&nbsp;údaje nezbytné pro
                  plnění smlouvy.
                </p>
              </li>
            </ol>
          </li>

          <li>
            <h2>Zákonný důvod a&nbsp;účel zpracování osobních údajů</h2>

            <ol>
              <li>
                <span>
                  Zákonným důvodem zpracování osobních údajů je
                  <ul>
                    <li>
                      <p>plnění smlouvy mezi Vámi a&nbsp;správcem podle čl. 6 odst. 1 písm. b) GDPR,</p>
                    </li>
                  </ul>
                </span>
              </li>
              <li>
                <span>
                  Účelem zpracování osobních údajů je
                  <ul>
                    <li>
                      <p>
                        vyřízení Vaší objednávky a&nbsp;výkon práv a&nbsp;povinností vyplývajících ze
                        smluvního vztahu mezi Vámi a&nbsp;správcem; při objednávce jsou vyžadovány osobní
                        údaje, které jsou nutné pro úspěšné vyřízení objednávky (jméno a&nbsp;adresa,
                        kontakt), poskytnutí osobních údajů je nutným požadavkem pro uzavření a&nbsp;plnění
                        smlouvy, bez poskytnutí osobních údajů není možné smlouvu uzavřít či jí ze strany
                        správce plnit.
                      </p>
                    </li>
                  </ul>
                </span>
              </li>
              <li>
                <p>
                  Ze strany správce nedochází k&nbsp;automatickému individuálnímu rozhodování ve smyslu čl. 22
                  GDPR. S&nbsp;takovým zpracováním jste poskytl/a svůj výslovný souhlas.
                </p>
              </li>
            </ol>
          </li>

          <li>
            <h2>Doba uchovávání údajů</h2>

            <ol>
              <li>
                <span>
                  Správce uchovává osobní údaje
                  <ul>
                    <li>
                      <p>
                        po dobu nezbytnou k&nbsp;výkonu práv a&nbsp;povinností vyplývajících ze smluvního
                        vztahu mezi Vámi a&nbsp;správcem a&nbsp;uplatňování nároků z&nbsp;těchto smluvních
                        vztahů (po dobu 15 let od ukončení smluvního vztahu).
                      </p>
                    </li>
                  </ul>
                </span>
              </li>
              <li>
                <p>Po uplynutí doby uchovávání osobních údajů správce osobní údaje vymaže.</p>
              </li>
            </ol>
          </li>

          <li>
            <h2>Příjemci osobních údajů (subdodavatelé správce)</h2>

            <ol>
              <li>
                <span>
                  Příjemci osobních údajů jsou osoby
                  <ul>
                    <li>
                      <p>podílející se na dodání zboží / služeb / realizaci plateb na základě smlouvy,</p>
                    </li>
                    <li>
                      <p>podílející se na zajištění provozu služeb,</p>
                    </li>
                    <li>
                      <p>zajišťující marketingové služby.</p>
                    </li>
                  </ul>
                </span>
              </li>
              <li>
                <p>
                  Správce má v&nbsp;úmyslu předat osobní údaje do třetí země (do země mimo EU) nebo
                  mezinárodní organizaci. Příjemci osobních údajů ve třetích zemích jsou poskytovatelé
                  mailingových služeb / cloudových služeb.
                </p>
              </li>
            </ol>
          </li>

          <li>
            <h2>Vaše práva</h2>

            <ol>
              <li>
                <span>
                  Za podmínek stanovených v&nbsp;GDPR máte
                  <ul>
                    <li>
                      <p>právo na přístup ke svým osobním údajům dle čl. 15 GDPR,</p>
                    </li>
                    <li>
                      <p>
                        právo opravu osobních údajů dle čl. 16 GDPR, popřípadě omezení zpracování dle čl. 18
                        GDPR.
                      </p>
                    </li>
                    <li>
                      <p>právo na výmaz osobních údajů dle čl. 17 GDPR.</p>
                    </li>
                    <li>
                      <p>právo vznést námitku proti zpracování dle čl. 21 GDPR a</p>
                    </li>
                    <li>
                      <p>právo na přenositelnost údajů dle čl. 20 GDPR.</p>
                    </li>
                    <li>
                      <p>
                        právo odvolat souhlas se zpracováním písemně nebo elektronicky na adresu nebo email
                        správce uvedený v&nbsp;čl. III těchto podmínek.
                      </p>
                    </li>
                  </ul>
                </span>
              </li>
              <li>
                <p>
                  Dále máte právo podat stížnost u&nbsp;Úřadu pro ochranu osobních údajů v&nbsp;případě, že se
                  domníváte, že bylo porušeno Vaší právo na ochranu osobních údajů.
                </p>
              </li>
            </ol>
          </li>

          <li>
            <h2>Podmínky zabezpečení osobních údajů</h2>

            <ol>
              <li>
                <p>
                  Správce prohlašuje, že přijal veškerá vhodná technická a&nbsp;organizační opatření
                  k&nbsp;zabezpečení osobních údajů.
                </p>
              </li>
              <li>
                <p>
                  Správce přijal technická opatření k&nbsp;zabezpečení datových úložišť a&nbsp;úložišť
                  osobních údajů v&nbsp; listinné podobě.
                </p>
              </li>
              <li>
                <p>Správce prohlašuje, že k&nbsp;osobním údajům mají přístup pouze jím pověřené osoby.</p>
              </li>
            </ol>
          </li>

          <li>
            <h2>Zákonný důvod a&nbsp;účel zpracování osobních údajů</h2>

            <ol>
              <li>
                <p>
                  Odesláním objednávky z&nbsp;internetového objednávkového formuláře potvrzujete, že jste
                  seznámen/a s&nbsp;podmínkami ochrany osobních údajů a&nbsp;že je v&nbsp;celém rozsahu
                  přijímáte.
                </p>
              </li>
              <li>
                <p>
                  S&nbsp;těmito podmínkami souhlasíte zaškrtnutím souhlasu prostřednictvím internetového
                  formuláře. Zaškrtnutím souhlasu potvrzujete, že jste seznámen/a s&nbsp;podmínkami ochrany
                  osobních údajů a&nbsp; že je v&nbsp;celém rozsahu přijímáte.
                </p>
              </li>
              <li>
                <p>
                  Správce je oprávněn tyto podmínky změnit. Novou verzi podmínek ochrany osobních údajů
                  zveřejní na svých internetových stránkách, případně Vám zašle novou verzi těchto podmínek na
                  e-mailovou adresu, kterou jste správci poskytl/a.
                </p>
              </li>
            </ol>
          </li>
        </ol>

        <p>Tyto podmínky nabývají účinnosti dnem 1.1.2024.</p>
      </div>
    </Section>
  )
}
