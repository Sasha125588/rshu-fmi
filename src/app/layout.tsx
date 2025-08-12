import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import { ThemeSwitcher } from '@/components/common/ThemeSwitcher'

import './globals.css'
import { Providers } from './providers'

const nunito = Nunito({
	variable: '--font-nunito',
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
	metadataBase: process.env.NEXT_PUBLIC_BASE_URL
		? new URL(process.env.NEXT_PUBLIC_BASE_URL)
		: new URL('http://localhost:3000'),
	applicationName: 'Факультет математики та інформатики - РДГУ',
	title: 'РДГУ - Факультет математики та інформатики',
	description:
		'Офіційна сторінка факультету математики та інформатики Рівненського державного гуманітарного університету. Поєднуємо багаторічні традиції математичної школи з інноваційними підходами до викладання ІТ-дисциплін.',
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
	openGraph: {
		title: 'РДГУ - Факультет математики та інформатики',
		description:
			'Офіційна сторінка факультету математики та інформатики Рівненського державного гуманітарного університету.',
		siteName: 'РДГУ - ФМІ',
		type: 'website'
	},
	twitter: {
		title: 'РДГУ - Факультет математики та інформатики',
		description:
			'Офіційна сторінка факультету математики та інформатики Рівненського державного гуманітарного університету.'
	},
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
				<Providers>
					{children}
					<ThemeSwitcher />
				</Providers>
			</body>
		</html>
	)
}

export default RootLayout
