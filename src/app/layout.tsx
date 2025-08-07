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
	metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
	title: {
		absolute: 'РДГУ - Головна',
		template: 'РДГУ - %s'
	},
	description:
		'Офіційна сторінка факультету математики та інформатики Рівненського державного гуманітарного університету.',
	openGraph: {
		siteName: 'Факультет математики та інформатики | РДГУ',
		title: 'Факультет математики та інформатики Рівненського державного гуманітарного університету',
		description: 'Офіційна сторінка ФМІ Рівненського державного гуманітарного університету.',
		images: [
			{
				url: '/images/logo.webp',
				width: 120,
				height: 120,
				type: 'image/webp',
				alt: 'ФМІ логотип'
			}
		],
		url: process.env.NEXT_PUBLIC_BASE_URL,
		type: 'website',
		locale: 'uk_UA'
	},
	keywords: [
		'РДГУ',
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
			lang='en'
			className='px-[35px]'
		>
			<head>
				<meta
					name='google-site-verification'
					content='6mUir8KEMMAZUD-dJJzWtE3-0gY1K-OWxeRhjtJSSak'
				/>
			</head>
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
