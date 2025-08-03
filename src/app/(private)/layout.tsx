import { Header } from './(components)/Header/Header'

interface Props {
	children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
	return (
		<>
			<div className='absolute h-full border-l'></div>
			<main className='pl-[15px]'>
				<Header />
				{children}
			</main>
		</>
	)
}

export default DashboardLayout
