'use client'

import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { type ReactNode } from 'react'

import { QueryProvider, ThemeProvider } from '@/shared/providers'

interface Props {
	children: ReactNode
}

export const Providers = ({ children }: Props) => {
	return (
		<QueryProvider>
			<ThemeProvider
				attribute='class'
				defaultTheme='light'
				enableSystem
				disableTransitionOnChange
			>
				<NuqsAdapter>{children}</NuqsAdapter>
			</ThemeProvider>
		</QueryProvider>
	)
}
