import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/animate-ui/radix/sheet'
import { Button } from '@/components/ui/button'

import { Navbar } from './Navbar/Navbar'
import { MobileNav } from './Navbar/components/MobileNav/MobileNav'

export const Header = () => {
	return (
		<div className='flex w-full items-center justify-between pb-10 md:pb-16'>
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
				<div className='hidden w-full md:block'>
					<Navbar />
				</div>
			</div>

			<div className='md:hidden'>
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant='ghost'
							size='icon'
							className='mr-6'
						>
							<Menu className='size-8' />
							<span className='sr-only'>Toggle menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent
						side='left'
						className='h-full w-[300px] overflow-auto pr-0 sm:w-[400px]'
					>
						<SheetHeader>
							<SheetTitle>
								<Image
									src='/images/logo.webp'
									alt='FMI Logo'
									width={120}
									height={120}
								/>
							</SheetTitle>
						</SheetHeader>
						<MobileNav />
					</SheetContent>
				</Sheet>
			</div>
		</div>
	)
}
