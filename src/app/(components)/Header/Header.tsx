import Image from 'next/image'
import Link from 'next/link'

import { Navbar } from './Navbar/Navbar'

export const Header = () => {
	return (
		<div className='mr-[-35px] flex justify-between gap-4 pb-22'>
			<div className='flex w-full gap-4'>
				<Link href='/'>
					<Image
						className='py-2'
						src='/images/logo.webp'
						priority
						loading='eager'
						alt='FMI Logo'
						width={120}
						height={120}
					/>
				</Link>
				<Navbar />
			</div>
		</div>
	)
}
