import { ArrowRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { HoverBorderGradient } from '@/components/aceternity-ui/components/hover-border-gradient'
import { Button } from '@/components/ui/button'

export const BecomeAStudent = () => {
	return (
		<div className='w-full'>
			<div className='flex w-full justify-between'>
				<div className='w-full'>
					<div>
						<h1 className='scroll-m-20 text-start text-[68px]/[90px] font-medium tracking-tight text-balance'>
							Факультет математики
							<br />
							<span className='flex gap-2'>
								та інформатики
								<Image
									className='-mt-2 pl-2'
									loading='eager'
									src='/images/coding.svg'
									alt='coding'
									width={128}
									height={128}
								/>
							</span>
						</h1>
					</div>
					<div className='flex w-full items-end justify-between pt-50 pr-2'>
						<div className='flex gap-4'>
							<Link
								href='https://www.rshu.edu.ua/pryimalna-komisiia'
								target='_blank'
								rel='noopener noreferrer'
								aria-label='Перейти на сторінку приймальної комісії'
							>
								<Button className='group flex h-12 w-50 cursor-pointer items-center rounded-full bg-[#017369] transition-all duration-200 hover:w-53 hover:bg-[#01635b]'>
									<p className='pl-2 text-base'>Стати студентом</p>
									<div className='rounded-full bg-white p-2 transition-all duration-200 group-hover:translate-x-2'>
										<ArrowRightIcon className='size-5 text-black/80 transition-all duration-200 group-hover:translate-x-0.5' />
									</div>
								</Button>
							</Link>
							<Link href='#specializations'>
								<HoverBorderGradient
									containerClassName='rounded-full'
									className='flex h-12 cursor-pointer items-center space-x-2 bg-white text-black dark:bg-black dark:text-white'
								>
									<p className='text-base font-normal'>Спеціальності</p>
								</HoverBorderGradient>
							</Link>
						</div>
						<p className='w-1/3 text-start text-lg/5 text-balance'>
							Більше 90 років досвіду в підготовці математиків, програмістів та вчителів. Ваш шлях
							до успіху в цифровому світі починається тут.
						</p>
					</div>
				</div>
				<div className='mt-[-141px] mr-[-35px]'>
					<Image
						loading='eager'
						src='/images/main-screen.webp'
						alt='Main Screen'
						width={600}
						height={600}
					/>
				</div>
			</div>
		</div>
	)
}
