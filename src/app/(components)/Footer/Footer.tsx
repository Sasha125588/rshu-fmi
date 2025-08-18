import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'

import { FacebookIcon } from '@/public/images/components/FacebookIcon'
import { InstagramIcon } from '@/public/images/components/InstagramIcon'
import { TiktokIcon } from '@/public/images/components/TiktokIcon'

export const Footer = () => (
	<footer className='pt-16 pb-8'>
		<div className='mx-auto max-w-7xl px-6'>
			<div className='mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
				<div className='col-span-1 lg:col-span-2'>
					<div className='mb-6 flex items-center gap-3'>
						<Image
							loading='lazy'
							src='/images/logo.webp'
							alt='FMI Logo'
							width={156}
							height={156}
						/>
						<div>
							<h3 className='text-xl font-semibold'>Факультет математики та інформатики</h3>
							<p className='text-sm'>РДГУ</p>
						</div>
					</div>
					<p className='text-muted-foreground mb-6 max-w-md text-sm leading-relaxed'>
						Більше 90 років досвіду в підготовці математиків, програмістів та вчителів. Ваш шлях до
						успіху в цифровому світі починається тут.
					</p>

					<div className='flex items-center gap-4'>
						<Badge
							className='border-green-primary/20 text-green-primary text-sm font-normal'
							variant='outline'
						>
							Слідкуйте за нами
						</Badge>
						<div className='flex gap-3'>
							<Link
								target='_blank'
								href='https://www.instagram.com/fmi_rshu/'
								className='bg-green-primary/10 hover:bg-green-primary/20 flex h-8 w-8 items-center justify-center rounded-full transition-colors'
							>
								<InstagramIcon className='text-green-primary h-4 w-4' />
							</Link>
							<Link
								target='_blank'
								href='https://www.tiktok.com/@fmi_rshu'
								className='bg-green-primary/10 hover:bg-green-primary/20 flex h-8 w-8 items-center justify-center rounded-full transition-colors'
							>
								<TiktokIcon className='text-green-primary h-4 w-4' />
							</Link>
							<Link
								target='_blank'
								href='https://www.facebook.com/groups/1748613002125956/'
								className='bg-green-primary/10 hover:bg-green-primary/20 flex h-8 w-8 items-center justify-center rounded-full transition-colors'
							>
								<FacebookIcon className='text-green-primary h-4 w-4' />
							</Link>
						</div>
					</div>
				</div>

				<div>
					<h4 className='mb-4 font-semibold'>Швидкі посилання</h4>
					<ul className='space-y-3'>
						<li>
							<Link
								href='/#about'
								className='hover:text-green-primary text-sm transition-colors'
							>
								Про нас
							</Link>
						</li>
						<li>
							<Link
								href='/#specializations'
								className='hover:text-green-primary text-sm transition-colors'
							>
								Спеціальності
							</Link>
						</li>
						<li>
							<Link
								href='/#news'
								className='hover:text-green-primary text-sm transition-colors'
							>
								Новини
							</Link>
						</li>
						<li>
							<Link
								href='/staff'
								className='hover:text-green-primary text-sm transition-colors'
							>
								Викладачі
							</Link>
						</li>
						<li>
							<Link
								href='/gallery'
								className='hover:text-green-primary text-sm transition-colors'
							>
								Галерея
							</Link>
						</li>
					</ul>
				</div>

				<div>
					<h4 className='mb-4 font-semibold'>Контакти</h4>
					<div className='space-y-3'>
						<div className='flex items-center gap-3'>
							<MapPinIcon className='text-green-primary mt-0.5 h-4 w-4 flex-shrink-0' />
							<div className='text-sm'>
								<p>м. Рівне, вул. Пластова, 31, 33028</p>
							</div>
						</div>
						<div className='flex items-center gap-3'>
							<PhoneIcon className='text-green-primary h-4 w-4' />
							<div className='flex flex-col'>
								<a
									href='tel:+0362266594'
									className='hover:text-green-primary text-sm transition-colors'
								>
									(0362) 26-65-94
								</a>
							</div>
						</div>
						<div className='flex items-center gap-3'>
							<MailIcon className='text-green-primary h-4 w-4' />
							<a
								href='mailto:info@rshu.edu.ua'
								className='hover:text-green-primary text-sm transition-colors'
							>
								dekanat.fmi@rshu.edu.ua
							</a>
						</div>
					</div>
				</div>
			</div>

			<div className='border-border border-t pt-6'>
				<div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
					<p className='text-muted-foreground text-sm'>
						© {new Date().getFullYear()} Рівненський державний гуманітарний університет. Всі права
						захищені.
					</p>
					<div className='flex flex-col items-center gap-6 lg:flex-row'>
						<Link
							href='/privacy'
							className='hover:text-green-primary text-sm transition-colors'
						>
							Політика конфіденційності
						</Link>
						<Link
							href='/terms'
							className='hover:text-green-primary text-sm transition-colors'
						>
							Умови використання
						</Link>
						<Link
							href='https://github.com/Sasha125588'
							target='_blank'
							className='flex items-center text-sm transition-colors hover:text-violet-400'
						>
							Created by{' '}
							<Image
								src='https://avatars.githubusercontent.com/u/155098366?v=4'
								alt='Sasha'
								width={40}
								height={40}
								className='rounded-full bg-cover bg-center p-1.5 font-semibold'
							/>
						</Link>
					</div>
				</div>
			</div>
		</div>
	</footer>
)
