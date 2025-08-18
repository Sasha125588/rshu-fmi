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

const PublicLayout = ({ children }: Props) => (
	<>
		<div className='absolute -z-10 hidden h-full border-l md:block'></div>
		<main className='h-full w-full px-4'>
			<Header />
			{children}
			<Footer />
		</main>
	</>
)

export default PublicLayout
