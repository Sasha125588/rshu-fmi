import Link from 'next/link'

import type { NavbarData } from './types'

export const NAVBAR_UP_DATA: NavbarData = {
	items: [
		{
			name: 'ОСВІТНЯ ДІЯЛЬНІСТЬ',
			href: '#',
			hasDropdown: true,
			component: (
				<div className='flex flex-col gap-2 p-1'>
					<p className='bg-green-primary hover:bg-green-primary/90 cursor-pointer rounded-md p-2 text-white transition-colors duration-200'>
						Денна форма навчання
					</p>
					<p className='bg-green-primary hover:bg-green-primary/90 cursor-pointer rounded-md p-2 text-white transition-colors duration-200'>
						Заочна форма навчання
					</p>
				</div>
			)
		},

		{
			name: 'НОВИНИ',
			href: '/#news',
			hasDropdown: false,
			component: <div>НОВИНИ</div>
		},
		{
			name: 'СТУДЕНТУ',
			href: '#',
			hasDropdown: true,
			component: (
				<div className='flex w-[800px] flex-col gap-24 p-8'>
					<div className='flex items-baseline justify-between'>
						<div>
							<p className='text-accent-foreground text-xl font-bold'>Text</p>
						</div>
						<div>
							<p className='text-accent-foreground text-xl font-bold'>Text</p>
						</div>
						<div>
							<p className='text-accent-foreground text-xl font-bold'>Корисне</p>
							<div className='text-green-primary flex flex-col gap-1 pt-2 text-base font-medium'>
								<Link
									href='/vartist-navchannia'
									className='hover:text-green-secondary w-fit cursor-pointer transition-colors duration-200'
								>
									Вартість навчання
								</Link>
							</div>
						</div>
					</div>
				</div>
			)
		},
		{
			name: 'ПРО ФАКУЛЬТЕТ',
			href: '#',
			hasDropdown: true,
			component: (
				<div className='flex w-[800px] flex-col gap-24 p-8'>
					<div className='flex items-baseline justify-between'>
						<div>
							<p className='text-accent-foreground text-xl font-bold'>Адміністрація</p>
							<div className='text-green-primary flex flex-col gap-1 pt-2 text-base font-medium'>
								<Link
									href='/vchena-rada'
									className='hover:text-green-secondary w-fit cursor-pointer transition-colors duration-200'
								>
									Вчена рада
								</Link>
								<Link
									href='/contacts'
									className='hover:text-green-secondary w-fit cursor-pointer transition-colors duration-200'
								>
									Контакти
								</Link>
							</div>
						</div>
						<div>
							<p className='text-accent-foreground text-xl font-bold'>Історія та сьогодення</p>
							<div className='text-green-primary flex flex-col gap-1 pt-2 text-base font-medium'>
								<Link
									href='/history'
									className='hover:text-green-secondary w-fit cursor-pointer transition-colors duration-200'
								>
									Історія
								</Link>
							</div>
						</div>
						<div>
							<p className='text-accent-foreground text-xl font-bold'>Міжнародне</p>
							<div className='text-green-primary flex flex-col gap-1 pt-2 text-base font-medium'>
								<Link
									href='/mizhnarodna-spivpratsya'
									className='hover:text-green-secondary w-fit cursor-pointer transition-colors duration-200'
								>
									Міжнародна співпраця
								</Link>
							</div>
						</div>
					</div>
				</div>
			)
		},
		{
			name: 'ОНЛАЙН РОЗКЛАД',
			href: '#',
			hasDropdown: true,
			component: (
				<div className='flex flex-col gap-2 p-1'>
					<Link
						href='https://docs.google.com/spreadsheets/d/1fBkuq2Px_urcfrJzzCwfkMvCmipoP-Kj/edit'
						className='bg-green-primary hover:bg-green-primary/90 cursor-pointer rounded-md p-2 text-white transition-colors duration-200'
						target='_blank'
					>
						1 курс
					</Link>
					<Link
						href='https://docs.google.com/spreadsheets/d/1vC741Yi_tDEFF22hfdOQ29HJ5zNqZNf7/edit'
						className='bg-green-primary hover:bg-green-primary/90 cursor-pointer rounded-md p-2 text-white transition-colors duration-200'
						target='_blank'
					>
						2 курс
					</Link>
					<Link
						href='https://docs.google.com/spreadsheets/d/1S2HYtfgnUc2ZTfxo7qqMcNgIPA3A2gkg/edit'
						className='bg-green-primary hover:bg-green-primary/90 cursor-pointer rounded-md p-2 text-white transition-colors duration-200'
						target='_blank'
					>
						3 курс
					</Link>
					<Link
						href='https://docs.google.com/spreadsheets/d/1911GrINIqew_nuPVGDOgY8P_3Mcokods/edit'
						className='bg-green-primary hover:bg-green-primary/90 cursor-pointer rounded-md p-2 text-white transition-colors duration-200'
						target='_blank'
					>
						4 курс
					</Link>
					<Link
						href='https://docs.google.com/spreadsheets/d/18XvUSeAot7r8XnWQ02NFmVr9H-UJ-u2w/edit'
						className='bg-green-primary hover:bg-green-primary/90 cursor-pointer rounded-md p-2 text-white transition-colors duration-200'
						target='_blank'
					>
						Магістри 1 курс
					</Link>
				</div>
			)
		}
	]
}

export const NAVBAR_DOWN_DATA: NavbarData = {
	items: [
		{
			name: 'КАФЕДРИ',
			href: '#',
			hasDropdown: true,
			component: (
				<div className='flex flex-col gap-2 p-1'>
					<Link
						target='_blank'
						href='https://kitm.rshu.edu.ua/'
						className='bg-green-primary hover:bg-green-primary/90 cursor-pointer rounded-md p-2 text-white transition-colors duration-200'
					>
						Кафедра інформаційних технологій та моделювання
					</Link>
					<Link
						target='_blank'
						href='https://iktmvi.rshu.edu.ua/'
						className='bg-green-primary hover:bg-green-primary/90 cursor-pointer rounded-md p-2 text-white transition-colors duration-200'
					>
						Кафедра ЦТ та МНІ
					</Link>
					<Link
						target='_blank'
						href='http://vmivm.gavrysha.com/'
						className='bg-green-primary hover:bg-green-primary/90 cursor-pointer rounded-md p-2 text-white transition-colors duration-200'
					>
						Кафедра вищої математики
					</Link>
					<Link
						target='_blank'
						href='http://vmivm.gavrysha.com/'
						className='bg-green-primary hover:bg-green-primary/90 cursor-pointer rounded-md p-2 text-white transition-colors duration-200'
					>
						Кафедра математики з методикою викладання
					</Link>
				</div>
			)
		}
	]
}
