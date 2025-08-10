import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import './globals.css'
import { Providers } from './providers'

const nunito = Nunito({
	variable: '--font-nunito',
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
	applicationName: 'Факультет математики та інформатики - РДГУ',
	metadataBase: process.env.NEXT_PUBLIC_BASE_URL
		? new URL(process.env.NEXT_PUBLIC_BASE_URL)
		: undefined,
	title: {
		default: 'РДГУ - Факультет математики та інформатики',
		template: '%s | ФМІ РДГУ'
	},
	authors: [
		{
			name: 'Факультет математики та інформатики - РДГУ',
			url: process.env.NEXT_PUBLIC_BASE_URL
		}
	],
	keywords: [
		'РДГУ',
		'Факультет',
		'Факультет математики та інформатики',
		'Рівненський державний гуманітарний університет',
		'ФМІ',
		'РДГУ ФМІ'
	],
	robots: {
		index: true,
		follow: true
	}
}

const RootLayout = ({
	children
}: Readonly<{
	children: React.ReactNode
}>) => {
	return (
		<html
			lang='uk'
			className='px-[35px]'
			suppressHydrationWarning
		>
			<head>
				<meta
					name='google-site-verification'
					content='6mUir8KEMMAZUD-dJJzWtE3-0gY1K-OWxeRhjtJSSak'
				/>
			</head>
			<body className={`${nunito.variable} relative overflow-x-hidden antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}

export default RootLayout
