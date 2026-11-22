'use client'

import Form from 'next/form'
import Link from 'next/link'
import { useActionState, useEffect } from 'react'

import { SubmissionSuccess } from '../../_components/SubmissionSuccess'
import { submitProjectProposal } from '../_actions'
import { INITIAL_PROPOSAL_STATE, PROPOSAL_LIMITS } from '../_constants'
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  Input,
  Textarea,
  buttonVariants,
} from '@/components/ui'
import { CONTACT_LIMITS, PROJECT_COURSES } from '@/shared/projects/constants'

import type { ReactNode } from 'react'

export function ProjectProposalForm({ intro }: { intro: ReactNode }) {
  const [state, action, pending] = useActionState(
    submitProjectProposal,
    INITIAL_PROPOSAL_STATE,
    '/projects/propose'
  )
  const { success, values, errors } = state

  useEffect(() => {
    if (success) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [success])

  if (success) {
    return (
      <SubmissionSuccess
        headingId="propose-project-heading"
        headingLevel={1}
        title="Пропозицію надіслано"
        description="Адміністратори переглянуть твою ідею. Якщо знадобиться уточнення, вони напишуть за вказаним контактом."
      />
    )
  }

  return (
    <>
      {intro}
      <Form
        action={action}
        aria-busy={pending}
        className="flex flex-col gap-6"
      >
        <FieldSet
          disabled={pending}
          className="min-w-0 gap-6 disabled:opacity-75"
        >
          <FieldSet className="min-w-0 border-b pb-6">
            <ProposalStepLegend step={1}>Про ідею</ProposalStepLegend>
            <FieldGroup className="gap-4">
              <Field
                className="min-w-0 gap-1.5"
                data-invalid={!!errors?.title?.length}
              >
                <FieldLabel htmlFor="proposal-title">
                  Назва проєкту
                  <span
                    aria-hidden="true"
                    className="text-destructive"
                  >
                    *
                  </span>
                </FieldLabel>
                <Input
                  id="proposal-title"
                  name="title"
                  maxLength={PROPOSAL_LIMITS.title}
                  defaultValue={values.title}
                  aria-invalid={errors?.title?.length ? true : undefined}
                  aria-describedby={errors?.title?.length ? 'proposal-title-error' : undefined}
                  required
                />
                <FieldError
                  id="proposal-title-error"
                  errors={errors?.title}
                />
              </Field>
              <Field
                className="min-w-0 gap-1.5"
                data-invalid={!!errors?.description?.length}
              >
                <FieldLabel htmlFor="proposal-description">
                  Опис ідеї
                  <span
                    aria-hidden="true"
                    className="text-destructive"
                  >
                    *
                  </span>
                </FieldLabel>
                <Textarea
                  id="proposal-description"
                  name="description"
                  className="min-h-32 resize-y"
                  maxLength={PROPOSAL_LIMITS.description}
                  defaultValue={values.description}
                  aria-invalid={errors?.description?.length ? true : undefined}
                  aria-describedby={
                    errors?.description?.length ? 'proposal-description-error' : undefined
                  }
                  required
                />
                <FieldError
                  id="proposal-description-error"
                  errors={errors?.description}
                />
              </Field>
              <Field
                className="min-w-0 gap-1.5"
                data-invalid={!!errors?.lookingFor?.length}
              >
                <FieldLabel htmlFor="proposal-looking-for">
                  Кого шукаєш?
                  <span className="text-muted-foreground font-normal">(необов’язково)</span>
                </FieldLabel>
                <Textarea
                  id="proposal-looking-for"
                  name="lookingFor"
                  className="resize-y"
                  maxLength={PROPOSAL_LIMITS.lookingFor}
                  defaultValue={values.lookingFor}
                  aria-invalid={errors?.lookingFor?.length ? true : undefined}
                  aria-describedby={
                    errors?.lookingFor?.length ? 'proposal-looking-for-error' : undefined
                  }
                />
                <FieldError
                  id="proposal-looking-for-error"
                  errors={errors?.lookingFor}
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSet className="min-w-0">
            <ProposalStepLegend step={2}>Контактні дані</ProposalStepLegend>
            <FieldGroup className="gap-4">
              <Field
                className="min-w-0 gap-1.5"
                data-invalid={!!errors?.name?.length}
              >
                <FieldLabel htmlFor="proposal-name">
                  Ім’я та прізвище
                  <span
                    aria-hidden="true"
                    className="text-destructive"
                  >
                    *
                  </span>
                </FieldLabel>
                <Input
                  id="proposal-name"
                  name="name"
                  autoComplete="name"
                  maxLength={CONTACT_LIMITS.name}
                  defaultValue={values.name}
                  aria-invalid={errors?.name?.length ? true : undefined}
                  aria-describedby={errors?.name?.length ? 'proposal-name-error' : undefined}
                  required
                />
                <FieldError
                  id="proposal-name-error"
                  errors={errors?.name}
                />
              </Field>
              <FieldGroup className="grid grid-cols-[minmax(0,1fr)_minmax(6rem,0.55fr)] gap-4">
                <Field
                  className="min-w-0 gap-1.5"
                  data-invalid={!!errors?.group?.length}
                >
                  <FieldLabel htmlFor="proposal-group">
                    Група
                    <span
                      aria-hidden="true"
                      className="text-destructive"
                    >
                      *
                    </span>
                  </FieldLabel>
                  <Input
                    id="proposal-group"
                    name="group"
                    placeholder="Наприклад, ІПЗ-21"
                    maxLength={CONTACT_LIMITS.group}
                    defaultValue={values.group}
                    aria-invalid={errors?.group?.length ? true : undefined}
                    aria-describedby={errors?.group?.length ? 'proposal-group-error' : undefined}
                    required
                  />
                  <FieldError
                    id="proposal-group-error"
                    errors={errors?.group}
                  />
                </Field>
                <Field
                  className="min-w-0 gap-1.5"
                  data-invalid={!!errors?.course?.length}
                >
                  <FieldLabel htmlFor="proposal-course">
                    Курс
                    <span
                      aria-hidden="true"
                      className="text-destructive"
                    >
                      *
                    </span>
                  </FieldLabel>
                  <select
                    key={values.course}
                    id="proposal-course"
                    name="course"
                    defaultValue={values.course}
                    className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive h-9 w-full rounded-4xl border px-3 text-base outline-none focus-visible:ring-[3px] md:text-sm"
                    aria-invalid={errors?.course?.length ? true : undefined}
                    aria-describedby={errors?.course?.length ? 'proposal-course-error' : undefined}
                    required
                  >
                    <option
                      value=""
                      disabled
                    >
                      Обери
                    </option>
                    {PROJECT_COURSES.map((course) => (
                      <option
                        key={course}
                        value={course}
                      >
                        {course} курс
                      </option>
                    ))}
                  </select>
                  <FieldError
                    id="proposal-course-error"
                    errors={errors?.course}
                  />
                </Field>
              </FieldGroup>
              <Field
                className="min-w-0 gap-1.5"
                data-invalid={!!errors?.contact?.length}
              >
                <FieldLabel htmlFor="proposal-contact">
                  Email або Telegram
                  <span
                    aria-hidden="true"
                    className="text-destructive"
                  >
                    *
                  </span>
                </FieldLabel>
                <Input
                  id="proposal-contact"
                  name="contact"
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder="name@example.com або @username"
                  maxLength={CONTACT_LIMITS.contact}
                  defaultValue={values.contact}
                  aria-invalid={errors?.contact?.length ? true : undefined}
                  aria-describedby={errors?.contact?.length ? 'proposal-contact-error' : undefined}
                  required
                />
                <FieldError
                  id="proposal-contact-error"
                  errors={errors?.contact}
                />
              </Field>
              <FieldDescription>
                Лише адміністратори бачать твої контактні дані. Вони можуть зв’язатися з тобою щодо
                пропозиції.
              </FieldDescription>
              <Field
                orientation="horizontal"
                className="items-start"
              >
                <input
                  id="proposal-show-initiator-name"
                  type="checkbox"
                  name="showInitiatorName"
                  value="on"
                  className="accent-primary focus-visible:outline-ring mt-0.5 size-4 shrink-0 rounded focus-visible:outline-2 focus-visible:outline-offset-2"
                  defaultChecked={values.showInitiatorName}
                />
                <FieldLabel htmlFor="proposal-show-initiator-name">
                  Показати моє ім’я як ініціатора на сторінці проєкту
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
          {errors?.form && (
            <Alert variant="destructive">
              <AlertTitle>Не вдалося надіслати</AlertTitle>
              <AlertDescription>{errors.form}</AlertDescription>
            </Alert>
          )}
        </FieldSet>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="submit"
            size="lg"
            variant="lavender"
            disabled={pending}
          >
            {pending ? 'Надсилання…' : 'Надіслати пропозицію'}
          </Button>
          <Link
            href="/projects"
            className={buttonVariants({ variant: 'ghost', size: 'lg' })}
          >
            Скасувати
          </Link>
        </div>
      </Form>
    </>
  )
}

const ProposalStepLegend = ({ step, children }: { step: number; children: ReactNode }) => (
  <FieldLegend className="mb-4">
    <span className="inline-flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="bg-foreground text-background grid size-6 shrink-0 place-items-center rounded-full text-xs leading-none font-semibold tabular-nums"
      >
        {step}
      </span>
      {children}
    </span>
  </FieldLegend>
)
