import { ArrowRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { HoverBorderGradient } from '@/components/aceternity-ui/components/hover-border-gradient'
import { Button } from '@/components/ui/button'

export const BecomeAStudent = () => (
	<div className='w-full'>
		<div className='flex w-full justify-between'>
			<div className='flex w-full flex-col justify-between'>
				<div>
					<h1 className='scroll-m-20 text-start text-[68px]/[90px] font-semibold tracking-tight text-balance'>
						Факультет математики
						<br />
						<span className='flex gap-2'>
							та інформатики
							<Image
								className='-mt-2 pl-2'
								loading='eager'
								src='/images/coding.webp'
								alt='coding'
								width={128}
								height={128}
							/>
						</span>
					</h1>
				</div>
				<div className='flex w-full items-end justify-between pr-2 pb-2'>
					<div className='flex gap-4'>
						<Link
							className='w-full'
							href='https://www.rshu.edu.ua/pryimalna-komisiia'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Перейти на сторінку приймальної комісії'
						>
							<Button className='group bg-button-primary hover:bg-green-secondary dark:bg-green-primary/50 dark:hover:bg-green-primary/40 flex h-12 w-50 cursor-pointer items-center rounded-full'>
								<p className='pl-3 text-base font-semibold text-white'>Стати студентом</p>
								<div className='ml-1 rounded-full bg-white p-2'>
									<ArrowRightIcon className='size-5 text-black/80 transition-all duration-200 group-hover:translate-x-0.5' />
								</div>
							</Button>
						</Link>
						<Link
							href='#specializations'
							aria-label='Перейти до спеціальностей факультету'
						>
							<HoverBorderGradient
								containerClassName='rounded-full'
								className='text-accent-foreground bg-background flex h-12 cursor-pointer items-center space-x-2'
							>
								<p className='text-base font-normal'>Спеціальності</p>
							</HoverBorderGradient>
						</Link>
					</div>
					<p className='w-1/3 text-start text-lg/5'>
						Більше 90 років досвіду в підготовці математиків, програмістів та вчителів. Ваш шлях до
						успіху в цифровому світі починається тут.
					</p>
				</div>
			</div>
			<div className='mt-[-117px] mr-[-35px]'>
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
	</div>
)
