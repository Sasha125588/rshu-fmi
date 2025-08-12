'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useId } from 'react'

import { Switch } from '@/components/ui/switch'

export const ThemeSwitcher = () => {
	const id = useId()
	const { setTheme, theme } = useTheme()

	const handleChangeTheme = () => {
		if (document.startViewTransition) {
			document.startViewTransition(() => {
				setTheme(theme === 'dark' ? 'light' : 'dark')
			})
		} else {
			setTheme(theme === 'dark' ? 'light' : 'dark')
		}
	}

	return (
		<div className='fixed right-4 bottom-4 z-50'>
			<div className='relative inline-grid h-[26px] grid-cols-[1fr_1fr] items-center text-sm font-medium'>
				<Switch
					id={id}
					checked={theme === 'dark'}
					onClick={handleChangeTheme}
					className='peer data-[state=unchecked]:bg-input absolute inset-0 h-[inherit] w-auto cursor-pointer [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full'
				/>
				<span className='pointer-events-none relative ms-0.5 flex min-w-6 items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full peer-data-[state=unchecked]:rtl:-translate-x-full'>
					<MoonIcon
						size={14}
						aria-hidden='true'
					/>
				</span>
				<span className='peer-data-[state=checked]:text-background pointer-events-none relative me-0.5 flex min-w-6 items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full'>
					<SunIcon
						size={14}
						aria-hidden='true'
					/>
				</span>
			</div>
		</div>
	)
}
