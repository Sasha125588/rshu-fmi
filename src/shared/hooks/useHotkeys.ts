import { useEffect, useRef } from 'react'

import { useRefState } from './useRefState'
import { isTarget } from '@/shared/utils/helpers'

import type { StateRef } from './useRefState'
import type { HookTarget } from '@/shared/utils/helpers'

export interface UseHotkeysOptions {
  enabled?: boolean
  preventDefault?: boolean
  onChange?: (event: KeyboardEvent) => void
}

export interface KeyboardModifiers {
  alt: boolean
  ctrl: boolean
  meta: boolean
  mod: boolean
  shift: boolean
}

export interface Hotkey extends KeyboardModifiers {
  key?: string
}

type CheckHotkeyMatch = (event: KeyboardEvent) => boolean

const KEY_NAME_MAP: Record<string, string> = {
  ' ': 'space',
  arrowleft: 'arrowleft',
  arrowright: 'arrowright',
  arrowup: 'arrowup',
  arrowdown: 'arrowdown',
  escape: 'escape',
  esc: 'escape',
  enter: 'enter',
  return: 'enter',
  tab: 'tab',
  backspace: 'backspace',
  delete: 'delete',
  insert: 'insert',
  home: 'home',
  end: 'end',
  pageup: 'pageup',
  pagedown: 'pagedown',
  '+': 'plus',
  '-': 'minus',
  '*': 'asterisk',
  '/': 'slash',
}

const normalizeKey = (key: string) => {
  const lowerKey = key
    .replace(/^Key/, '')
    .replace(/^Digit/, '')
    .toLowerCase()
  return KEY_NAME_MAP[lowerKey] ?? lowerKey
}

export const parseHotkey = (hotkey: string): Hotkey => {
  const keys = hotkey
    .toLowerCase()
    .split('+')
    .map((part) => part.trim())

  const modifiers: KeyboardModifiers = {
    alt: keys.includes('alt'),
    ctrl: keys.includes('ctrl') || keys.includes('control'),
    meta: keys.includes('meta') || keys.includes('cmd') || keys.includes('command'),
    mod: keys.includes('mod'),
    shift: keys.includes('shift'),
  }

  const reservedKeys = ['alt', 'ctrl', 'control', 'meta', 'cmd', 'command', 'shift', 'mod']

  const freeKey = keys.find((key) => key && !reservedKeys.includes(key))

  return {
    ...modifiers,
    key: freeKey,
  }
}

const isHotkeyMatch = (hotkey: Hotkey, event: KeyboardEvent) => {
  const { alt, ctrl, meta, mod, shift, key } = hotkey
  const { altKey, ctrlKey, metaKey, shiftKey, key: pressedKey, code: pressedCode } = event

  if (alt !== altKey) {
    return false
  }

  if (mod) {
    if (!ctrlKey && !metaKey) {
      return false
    }
  } else {
    if (ctrl !== ctrlKey) {
      return false
    }
    if (meta !== metaKey) {
      return false
    }
  }

  if (shift !== shiftKey || !key) {
    return false
  }

  if (key.startsWith('code:')) {
    return pressedCode.toLowerCase() === key.slice('code:'.length)
  }

  return normalizeKey(pressedKey ?? pressedCode) === normalizeKey(key)
}

export const getHotkeyMatcher =
  (hotkey: string): CheckHotkeyMatch =>
  (event) =>
    isHotkeyMatch(parseHotkey(hotkey), event)

export type UseHotkeysHotkeys = string

export interface UseHotkeysKey {
  alias: string
  code: string
  key: string
}

export interface UseHotkeys {
  (target: HookTarget, hotkeys: UseHotkeysHotkeys, options?: UseHotkeysOptions): void

  (
    target: HookTarget,
    hotkeys: UseHotkeysHotkeys,
    callback: (event: KeyboardEvent) => void,
    options?: UseHotkeysOptions
  ): void

  <Target extends Element>(
    hotkeys: UseHotkeysHotkeys,
    options?: UseHotkeysOptions,
    target?: never
  ): StateRef<Target>

  <Target extends Element>(
    hotkeys: UseHotkeysHotkeys,
    callback: (event: KeyboardEvent) => void,
    options?: UseHotkeysOptions,
    target?: never
  ): StateRef<Target>
}

export const useHotkeys = ((...params: any[]) => {
  const target = (isTarget(params[0]) ? params[0] : undefined) as HookTarget | undefined
  const hotkeys = (target ? params[1] : params[0]) as UseHotkeysHotkeys
  const options = (
    target
      ? typeof params[2] === 'object'
        ? params[2]
        : { ...params[3], onChange: params[2] }
      : typeof params[1] === 'object'
        ? params[1]
        : { ...params[2], onChange: params[1] }
  ) as UseHotkeysOptions | undefined

  const optionsRef = useRef(options)
  optionsRef.current = options

  const internalRef = useRefState<Element | Window>()
  const enabled = options?.enabled ?? true

  useEffect(() => {
    if (!enabled) return

    const eventTarget =
      ((target ? isTarget.getElement(target) : internalRef.current) as Element | Window) ?? window
    if (!eventTarget) return

    const matchers = hotkeys
      .split(',')
      .map((h) => h.trim())
      .filter(Boolean)
      .map(getHotkeyMatcher)

    const onKeyDown = (event: KeyboardEvent) => {
      if (!enabled) return

      const isMatch = matchers.some((matcher) => matcher(event))
      if (!isMatch) return

      const currentOptions = optionsRef.current
      if (currentOptions?.preventDefault !== false) event.preventDefault()
      currentOptions?.onChange?.(event)
    }

    eventTarget.addEventListener('keydown', onKeyDown as EventListener)

    return () => {
      eventTarget.removeEventListener('keydown', onKeyDown as EventListener)
    }
  }, [target && isTarget.getRawElement(target), internalRef.state, enabled, hotkeys])

  if (target) return
  return internalRef
}) as UseHotkeys
