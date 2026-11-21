'use client'

import { XIcon } from 'lucide-react'
import Form from 'next/form'
import Link from 'next/link'
import { useActionState } from 'react'

import { SubmissionSuccess } from '../../../../../../_components/SubmissionSuccess'
import { submitProjectApplication } from '../../../../../_actions'
import { APPLICATION_LIMITS, INITIAL_APPLICATION_STATE } from '../../../../../_constants'
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
  Textarea,
} from '@/components/ui'
import { cn } from '@/lib/utils'
import { CONTACT_LIMITS, PROJECT_COURSES } from '@/shared/projects/constants'

interface ApplicationDialogProps {
  projectId: number
  title: string
  roles: { id: string; title: string }[]
}

export const ApplicationDialog = ({ projectId, title, roles }: ApplicationDialogProps) => {
  const [state, action, pending] = useActionState(
    submitProjectApplication.bind(null, projectId),
    INITIAL_APPLICATION_STATE
  )
  const { success, values, errors } = state

  const closed = errors?.form === 'closed'
  const availableRoles = errors?.roleId?.length
    ? roles.filter((role) => role.id !== values.roleId)
    : roles
  const selectedRole = availableRoles.find((role) => role.id === values.roleId)?.id ?? ''

  return (
    <Dialog
      onOpenChange={(open, event) => {
        if (!open && pending) event.cancel()
      }}
    >
      <DialogTrigger
        render={
          <Button
            className="w-full max-lg:h-12"
            size="lg"
            variant="lavender"
          />
        }
      >
        Долучитися
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[calc(100dvh-2rem)] flex-col gap-0 overflow-hidden p-0"
      >
        <DialogHeader
          className={cn(
            'relative shrink-0 px-5 pr-14 sm:px-6 sm:pr-16',
            success ? 'h-9' : 'border-b py-4'
          )}
        >
          <DialogTitle className={success ? 'sr-only' : 'text-xl leading-snug'}>
            Долучитися до проєкту
          </DialogTitle>
          <DialogDescription className={success ? 'sr-only' : 'wrap-anywhere'}>
            {title}
          </DialogDescription>
          <DialogClose
            render={
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3"
                disabled={pending}
              />
            }
            aria-label="Закрити"
          >
            <XIcon aria-hidden="true" />
          </DialogClose>
        </DialogHeader>
        <div className="flex min-h-0 flex-col gap-4 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
          {success && (
            <SubmissionSuccess
              headingLevel={2}
              title="Заявку надіслано"
              description="Відповідальний за проєкт перегляне заявку й за потреби зв’яжеться з тобою."
            />
          )}
          {!success && (
            <Form
              action={action}
              aria-busy={pending}
              className="flex flex-col gap-4"
            >
              <FieldSet
                disabled={pending || closed}
                className="min-w-0 disabled:opacity-75"
              >
                <FieldGroup className="gap-4">
                  <Field
                    className="min-w-0 gap-1.5"
                    data-invalid={!!errors?.name?.length}
                  >
                    <FieldLabel htmlFor="application-name">
                      Ім’я та прізвище
                      <span
                        aria-hidden="true"
                        className="text-destructive"
                      >
                        *
                      </span>
                    </FieldLabel>
                    <Input
                      id="application-name"
                      name="name"
                      autoComplete="name"
                      maxLength={CONTACT_LIMITS.name}
                      defaultValue={values.name}
                      aria-invalid={errors?.name?.length ? true : undefined}
                      aria-describedby={errors?.name?.length ? 'application-name-error' : undefined}
                      required
                    />
                    <FieldError
                      id="application-name-error"
                      errors={errors?.name}
                    />
                  </Field>
                  <FieldGroup className="grid grid-cols-[minmax(0,1fr)_minmax(6rem,0.55fr)] gap-4">
                    <Field
                      className="min-w-0 gap-1.5"
                      data-invalid={!!errors?.group?.length}
                    >
                      <FieldLabel htmlFor="application-group">
                        Група
                        <span
                          aria-hidden="true"
                          className="text-destructive"
                        >
                          *
                        </span>
                      </FieldLabel>
                      <Input
                        id="application-group"
                        name="group"
                        placeholder="Наприклад, ІПЗ-21"
                        maxLength={CONTACT_LIMITS.group}
                        defaultValue={values.group}
                        aria-invalid={errors?.group?.length ? true : undefined}
                        aria-describedby={
                          errors?.group?.length ? 'application-group-error' : undefined
                        }
                        required
                      />
                      <FieldError
                        id="application-group-error"
                        errors={errors?.group}
                      />
                    </Field>
                    <Field
                      className="min-w-0 gap-1.5"
                      data-invalid={!!errors?.course?.length}
                    >
                      <FieldLabel htmlFor="application-course">
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
                        id="application-course"
                        name="course"
                        defaultValue={values.course}
                        className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive h-9 w-full rounded-4xl border px-3 text-base outline-none focus-visible:ring-[3px] md:text-sm"
                        aria-invalid={errors?.course?.length ? true : undefined}
                        aria-describedby={
                          errors?.course?.length ? 'application-course-error' : undefined
                        }
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
                        id="application-course-error"
                        errors={errors?.course}
                      />
                    </Field>
                  </FieldGroup>
                  <Field
                    className="min-w-0 gap-1.5"
                    data-invalid={!!errors?.contact?.length}
                  >
                    <FieldLabel htmlFor="application-contact">
                      Email або Telegram
                      <span
                        aria-hidden="true"
                        className="text-destructive"
                      >
                        *
                      </span>
                    </FieldLabel>
                    <Input
                      id="application-contact"
                      name="contact"
                      autoCapitalize="none"
                      spellCheck={false}
                      placeholder="name@example.com або @username"
                      maxLength={CONTACT_LIMITS.contact}
                      defaultValue={values.contact}
                      aria-invalid={errors?.contact?.length ? true : undefined}
                      aria-describedby={
                        errors?.contact?.length ? 'application-contact-error' : undefined
                      }
                      required
                    />
                    <FieldError
                      id="application-contact-error"
                      errors={errors?.contact}
                    />
                  </Field>
                  {availableRoles.length > 0 ? (
                    <Field
                      className="min-w-0 gap-1.5"
                      data-invalid={!!errors?.roleId?.length}
                    >
                      <FieldLabel htmlFor="application-role">
                        Роль
                        <span className="text-muted-foreground font-normal">(необов’язково)</span>
                      </FieldLabel>
                      <select
                        key={selectedRole}
                        id="application-role"
                        name="roleId"
                        defaultValue={selectedRole}
                        className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive h-9 w-full rounded-4xl border px-3 text-base outline-none focus-visible:ring-[3px] md:text-sm"
                        aria-invalid={errors?.roleId?.length ? true : undefined}
                        aria-describedby={
                          errors?.roleId?.length ? 'application-role-error' : undefined
                        }
                      >
                        <option value="">Без конкретної ролі</option>
                        {availableRoles.map((role) => (
                          <option
                            key={role.id}
                            value={role.id}
                          >
                            {role.title}
                          </option>
                        ))}
                      </select>
                      <FieldError
                        id="application-role-error"
                        errors={errors?.roleId}
                      />
                    </Field>
                  ) : (
                    <FieldError errors={errors?.roleId} />
                  )}
                  <Field
                    className="min-w-0 gap-1.5"
                    data-invalid={!!errors?.message?.length}
                  >
                    <FieldLabel htmlFor="application-message">
                      Коротко про себе
                      <span className="text-muted-foreground font-normal">(необов’язково)</span>
                    </FieldLabel>
                    <Textarea
                      id="application-message"
                      name="message"
                      className="min-h-20 resize-y"
                      maxLength={APPLICATION_LIMITS.message}
                      defaultValue={values.message}
                      placeholder="Наприклад, чим хочеш допомогти проєкту"
                      aria-invalid={errors?.message?.length ? true : undefined}
                      aria-describedby={
                        errors?.message?.length ? 'application-message-error' : undefined
                      }
                    />
                    <FieldError
                      id="application-message-error"
                      errors={errors?.message}
                    />
                  </Field>
                </FieldGroup>
              </FieldSet>
              {!closed && (
                <>
                  <FieldDescription>
                    Адміністратори бачать твій контакт і можуть використати його, щоб зв’язатися з
                    тобою щодо заявки.
                  </FieldDescription>
                  <DialogFooter>
                    <DialogClose
                      render={
                        <Button
                          variant="ghost"
                          disabled={pending}
                        />
                      }
                    >
                      Скасувати
                    </DialogClose>
                    <Button
                      type="submit"
                      variant="lavender"
                      disabled={pending}
                    >
                      {pending ? 'Надсилання…' : 'Надіслати заявку'}
                    </Button>
                  </DialogFooter>
                </>
              )}
            </Form>
          )}
          {errors?.form && (
            <Alert variant={closed ? 'warning' : 'destructive'}>
              <AlertTitle>{closed ? 'Набір закрито' : 'Не вдалося надіслати'}</AlertTitle>
              <AlertDescription>
                {closed ? (
                  <>
                    Цей проєкт більше не приймає заявки.{' '}
                    <Link href="/projects?open=true">Переглянути проєкти з відкритим набором</Link>
                  </>
                ) : (
                  'Введені дані залишилися у формі. Спробуй надіслати її пізніше.'
                )}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
