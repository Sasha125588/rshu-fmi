import { CopyButton } from '@/components/common/CopyButton/CopyButton'
import { Typography } from '@/components/ui'

interface PaymentDetailsProps {
  details: {
    iban: string
    note: string | null
    purpose: string
    recipientBank: string
    recipientCode: string
    recipientName: string
  }
}

export const PaymentDetails = ({ details }: PaymentDetailsProps) => {
  const copyableDetails = [
    'ПЛАТНЕ НАВЧАННЯ',
    `Отримувач: ${details.recipientName}`,
    `Код: ${details.recipientCode}`,
    `Банк отримувача: ${details.recipientBank}`,
    `Р/р: ${details.iban}`,
    `Призначення платежу: ${details.purpose}`,
  ].join('\n')

  return (
    <section className="border-b px-4 py-14 md:px-12 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-16 xl:gap-24">
        <div className="max-w-md">
          <Typography
            as="p"
            variant="overline"
            className="text-accent-violet"
          >
            Оплата
          </Typography>
          <Typography
            as="h2"
            variant="heading-md"
            className="mt-3 text-pretty"
          >
            Реквізити для оплати навчання
          </Typography>
          <Typography
            as="p"
            variant="body-md"
            className="text-muted-foreground mt-3 max-w-sm"
          >
            Перед оплатою перевірте реквізити й обов’язково заповніть призначення платежу даними
            студента.
          </Typography>
          <div className="mt-7">
            <CopyButton
              text={copyableDetails}
              label="Скопіювати реквізити"
              copiedLabel="Реквізити скопійовано"
              variant="outline"
            />
          </div>
        </div>

        <div className="border-y">
          <dl>
            <div className="grid gap-2 border-b py-5 md:grid-cols-[10rem_1fr] md:gap-6">
              <dt className="text-muted-foreground text-sm">Отримувач</dt>
              <dd className="text-base font-medium">{details.recipientName}</dd>
            </div>
            <div className="grid gap-2 border-b py-5 md:grid-cols-[10rem_1fr] md:gap-6">
              <dt className="text-muted-foreground text-sm">Код</dt>
              <dd className="font-jetbrains text-sm font-medium tracking-tight">
                {details.recipientCode}
              </dd>
            </div>
            <div className="grid gap-2 border-b py-5 md:grid-cols-[10rem_1fr] md:gap-6">
              <dt className="text-muted-foreground text-sm">Банк отримувача</dt>
              <dd className="text-base font-medium">{details.recipientBank}</dd>
            </div>
            <div className="grid gap-3 border-b py-5 md:grid-cols-[10rem_1fr] md:gap-6">
              <dt className="text-muted-foreground text-sm">Рахунок (IBAN)</dt>
              <dd className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-jetbrains text-base font-semibold tracking-tight">
                  {details.iban}
                </span>
                <CopyButton
                  text={details.iban}
                  label="Скопіювати IBAN"
                  copiedLabel="IBAN скопійовано"
                  size="sm"
                  variant="ghost"
                />
              </dd>
            </div>
            <div className="grid gap-2 py-5 md:grid-cols-[10rem_1fr] md:gap-6">
              <dt className="text-muted-foreground text-sm">Призначення платежу</dt>
              <dd className="text-base leading-7 font-medium">{details.purpose}</dd>
            </div>
          </dl>

          {!!details.note && (
            <p className="text-muted-foreground border-t py-4 text-sm leading-6">{details.note}</p>
          )}
        </div>
      </div>
    </section>
  )
}
