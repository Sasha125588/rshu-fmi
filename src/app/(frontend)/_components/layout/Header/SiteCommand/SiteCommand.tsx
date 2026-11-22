'use client'

import { SearchIcon, XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Suspense, useRef, useState } from 'react'

import { SiteCommandList } from './components/SiteCommandList'
import {
  Button,
  Command,
  CommandInput,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Kbd,
  KbdGroup,
  Separator,
  buttonVariants,
} from '@/components/ui'
import { FacebookIcon, GitHubIcon, InstagramIcon, TiktokIcon } from '@/public/images/components'
import { FACULTY_SOCIAL_URLS } from '@/shared/constants'
import { useHotkeys, useOperatingSystem } from '@/shared/hooks'

const externalLinks = [
  {
    label: 'Instagram',
    href: FACULTY_SOCIAL_URLS.instagram,
    icon: InstagramIcon,
  },
  { label: 'TikTok', href: FACULTY_SOCIAL_URLS.tiktok, icon: TiktokIcon },
  { label: 'Facebook', href: FACULTY_SOCIAL_URLS.facebook, icon: FacebookIcon },
  {
    label: 'GitHub',
    href: FACULTY_SOCIAL_URLS.github,
    icon: GitHubIcon,
  },
]

export const SiteCommand = () => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const operatingSystem = useOperatingSystem()
  const modifierLabel = operatingSystem === 'macos' ? '⌘' : 'Ctrl'

  function changeOpen(nextOpen: boolean) {
    if (nextOpen) setQuery('')
    setOpen(nextOpen)
  }

  useHotkeys(
    'mod+k, mod+code:KeyK',
    (event) => {
      if (event.defaultPrevented || event.isComposing) return

      event.preventDefault()
      if (!event.repeat) changeOpen(!open)
    },
    { preventDefault: false }
  )

  return (
    <Dialog
      open={open}
      onOpenChange={changeOpen}
    >
      <DialogTrigger
        aria-label="Пошук по сайту"
        aria-keyshortcuts="Control+K Meta+K"
        render={
          <Button
            variant="outline"
            size="icon-lg"
            className="sm:h-9 sm:w-auto sm:gap-1 sm:px-3"
          />
        }
      >
        <SearchIcon data-icon="inline-start" />
        <span className="hidden sm:inline">Пошук</span>
        <KbdGroup
          aria-hidden
          className="ml-1 hidden xl:[@media(any-pointer:fine)]:inline-flex"
        >
          <Kbd>{modifierLabel}</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </DialogTrigger>

      <DialogContent
        initialFocus={inputRef}
        showCloseButton={false}
        className="top-[max(1rem,env(safe-area-inset-top))] translate-y-0 gap-0 overflow-hidden p-0 motion-reduce:animate-none sm:top-[12svh] sm:max-w-xl"
      >
        <Command
          label="Пошук розділів сайту"
          shouldFilter={false}
          vimBindings={false}
          className="**:data-[slot=input-group]:focus-within:border-ring p-0 **:data-[slot=command-input-wrapper]:px-4 **:data-[slot=input-group]:h-11"
        >
          <DialogHeader className="flex-row items-center justify-between px-4 pt-3 pb-2 sm:px-5">
            <DialogTitle>Пошук по сайту</DialogTitle>
            <DialogDescription className="sr-only">
              Знайдіть потрібний розділ за назвою або ключовими словами.
            </DialogDescription>
            <DialogClose
              aria-label="Закрити пошук"
              render={
                <Button
                  variant="ghost"
                  size="icon"
                />
              }
            >
              <XIcon aria-hidden />
            </DialogClose>
          </DialogHeader>

          <CommandInput
            ref={inputRef}
            value={query}
            onValueChange={setQuery}
            placeholder="Розклад, спеціальність, деканат…"
            className="h-full pr-3 text-base"
          />

          <Suspense fallback={null}>
            <SiteCommandList
              query={query}
              onSelect={(href) => {
                setOpen(false)
                router.push(href)
              }}
            />
          </Suspense>
        </Command>

        <Separator />
        <nav
          aria-label="Соцмережі та репозиторій сайту"
          className="grid grid-cols-4 gap-1 px-3 py-2 sm:gap-2 sm:px-4"
        >
          {externalLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: 'outline',
                size: 'xs',
                className:
                  'text-muted-foreground hover:bg-muted focus-visible:bg-muted h-14 min-w-0 flex-col rounded-2xl px-1',
              })}
            >
              <Icon aria-hidden="true" />
              <span className="max-w-full truncate">{label}</span>
            </a>
          ))}
        </nav>

        <div
          aria-hidden
          className="hidden sm:[@media(any-pointer:fine)]:block"
        >
          <Separator />
          <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3 text-xs">
            <span className="flex items-center gap-1.5">
              <KbdGroup>
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd>
              </KbdGroup>
              Вибрати
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd>Enter</Kbd> Відкрити
            </span>
            <span className="ml-auto flex items-center gap-1.5">
              <Kbd>Esc</Kbd> Закрити
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
