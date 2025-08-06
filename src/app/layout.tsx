import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import { Providers } from './providers'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: {
		absolute: 'ФМІ - Головна',
		template: 'ФМІ - %s'
	},
	icons: {
		icon: '/images/logo.svg'
	},
	description: 'Офіційний сайт ФМІ'
}

const RootLayout = ({
	children
}: Readonly<{
	children: React.ReactNode
}>) => {
	return (
		<html
			lang='en'
			className='px-[35px]'
		>
			<body
				className={`${geistSans.variable} ${geistMono.variable} relative overflow-x-hidden antialiased`}
				suppressHydrationWarning
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}

export default RootLayout
