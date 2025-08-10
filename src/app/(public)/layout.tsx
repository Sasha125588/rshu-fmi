import type { Metadata } from 'next'

import { Footer } from '../(components)/Footer/Footer'
import { Header } from '../(components)/Header/Header'

interface Props {
	children: React.ReactNode
}

export const metadata: Metadata = {
	title: {
		default: 'РДГУ - Факультет математики та інформатики',
		template: 'ФМІ - %s'
	}
}

const PublicLayout = ({ children }: Props) => {
	return (
		<>
			<div className='absolute -z-10 h-full border-l'></div>
			<main className='pl-[15px]'>
				<Header />
				{children}
				<Footer />
			</main>
		</>
	)
}

export default PublicLayout
