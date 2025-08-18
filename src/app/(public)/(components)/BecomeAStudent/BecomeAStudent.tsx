import { ArrowRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { HoverBorderGradient } from '@/components/aceternity-ui/components/hover-border-gradient'
import { Button } from '@/components/ui/button'

export const BecomeAStudent = () => (
	<div className='flex w-full justify-between'>
		<div className='flex w-full flex-col justify-between gap-8 md:gap-0'>
			<div>
				<h1 className='scroll-m-20 text-start text-[40px]/[56px] font-semibold tracking-tight text-balance sm:text-[48px]/[64px] md:text-[68px]/[90px]'>
					Факультет математики
					<span className='flex gap-2'>
						<span className='text-green-primary pr-1'>&&</span> інформатики
						<Image
							className='-mt-2 hidden pl-2 md:block'
							loading='eager'
							src='/images/coding.webp'
							alt='coding'
							width={128}
							height={128}
						/>
					</span>
				</h1>
			</div>
			<div className='flex w-full flex-col gap-6 pb-2 md:flex-row md:items-end md:justify-between md:pr-2'>
				<div className='flex flex-col gap-4 sm:flex-row'>
					<Link
						className='w-full sm:w-auto'
						href='https://www.rshu.edu.ua/pryimalna-komisiia'
						target='_blank'
						rel='noopener noreferrer'
						aria-label='Перейти на сторінку приймальної комісії'
					>
						<Button className='group bg-button-primary hover:bg-green-secondary dark:bg-green-primary/50 dark:hover:bg-green-primary/40 flex h-12 w-full cursor-pointer items-center justify-between rounded-full sm:w-auto sm:justify-start'>
							<p className='text-base font-semibold text-white'>Стати студентом</p>
							<div className='mr-[-10px] rounded-full bg-white p-2'>
								<ArrowRightIcon className='size-5 text-black/80 transition-all duration-200 group-hover:translate-x-0.5' />
							</div>
						</Button>
					</Link>
					<Link
						href='#specializations'
						aria-label='Перейти до спеціальностей факультету'
						className='w-full sm:w-auto'
					>
						<HoverBorderGradient
							containerClassName='rounded-full w-full sm:w-auto'
							className='text-accent-foreground bg-background flex h-12 w-full cursor-pointer items-center justify-center space-x-2 sm:w-auto'
						>
							<p className='text-base font-normal'>Спеціальності</p>
						</HoverBorderGradient>
					</Link>
				</div>
				<p className='text-start text-base/6 md:w-1/3 md:text-lg/5'>
					Більше 90 років досвіду в підготовці математиків, програмістів та вчителів. Ваш шлях до
					успіху в цифровому світі починається тут.
				</p>
			</div>
		</div>
		<div className='mt-[-117px] mr-[-50px] hidden lg:block'>
			<Image
				loading='eager'
				priority
				src='/images/main-screen.webp'
				alt='Main Screen'
				width={550}
				height={550}
			/>
		</div>
	</div>
)
