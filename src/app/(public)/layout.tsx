import { Footer } from './(components)/Footer/Footer'
import { Header } from './(components)/Header/Header'

interface Props {
	children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
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

export default DashboardLayout
