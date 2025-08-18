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
					<Link
						href='#'
						className='bg-green-primary hover:bg-green-primary/90 dark:bg-green-primary/30 dark:hover:bg-green-primary/40 cursor-pointer rounded-md p-3 text-white transition-colors duration-200'
					>
						Денна форма навчання
					</Link>
					<Link
						href='#'
						className='bg-green-primary hover:bg-green-primary/90 dark:bg-green-primary/30 dark:hover:bg-green-primary/40 cursor-pointer rounded-md p-3 text-white transition-colors duration-200'
					>
						Заочна форма навчання
					</Link>
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
				<div className='flex flex-col gap-4 p-2 md:grid md:w-[800px] md:grid-cols-3 md:gap-8 md:p-6'>
					<div>
						<p className='text-accent-foreground mb-2 text-lg font-bold md:mb-3 md:text-xl'>
							Навчання
						</p>
						<div className='text-green-primary flex flex-col gap-2 text-sm font-medium md:text-base'>
							<Link
								href='#'
								className='hover:text-green-secondary cursor-pointer transition-colors duration-200 md:w-fit'
							>
								{'Ще немає :('}
							</Link>
						</div>
					</div>
					<div>
						<p className='text-accent-foreground mb-2 text-lg font-bold md:mb-3 md:text-xl'>
							Студентське життя
						</p>
						<div className='text-green-primary flex flex-col gap-2 text-sm font-medium md:text-base'>
							<Link
								href='#'
								className='hover:text-green-secondary cursor-pointer transition-colors duration-200 md:w-fit'
							>
								{'Ще немає :('}
							</Link>
						</div>
					</div>
					<div>
						<p className='text-accent-foreground mb-2 text-lg font-bold md:mb-3 md:text-xl'>
							Корисне
						</p>
						<div className='text-green-primary flex flex-col gap-2 text-sm font-medium md:text-base'>
							<Link
								href='/vartist-navchannia'
								className='hover:text-green-secondary cursor-pointer transition-colors duration-200 md:w-fit'
							>
								Вартість навчання
							</Link>
						</div>
					</div>
				</div>
			)
		},
		{
			name: 'ПРО НАС',
			href: '#',
			hasDropdown: true,
			component: (
				<div className='flex flex-col gap-4 p-2 md:grid md:w-[800px] md:grid-cols-3 md:gap-8 md:p-6'>
					<div>
						<p className='text-accent-foreground mb-2 text-lg font-bold md:mb-3 md:text-xl'>
							Адміністрація
						</p>
						<div className='text-green-primary flex flex-col gap-2 text-sm font-medium md:text-base'>
							<Link
								href='/vchena-rada'
								className='hover:text-green-secondary cursor-pointer transition-colors duration-200 md:w-fit'
							>
								Вчена рада
							</Link>
							<Link
								href='/contacts'
								className='hover:text-green-secondary cursor-pointer transition-colors duration-200 md:w-fit'
							>
								Контакти
							</Link>
						</div>
					</div>
					<div>
						<p className='text-accent-foreground mb-2 text-lg font-bold md:mb-3 md:text-xl'>
							Історія та сьогодення
						</p>
						<div className='text-green-primary flex flex-col gap-2 text-sm font-medium md:text-base'>
							<Link
								href='/history'
								className='hover:text-green-secondary cursor-pointer transition-colors duration-200 md:w-fit'
							>
								Історія
							</Link>
						</div>
					</div>
					<div>
						<p className='text-accent-foreground mb-2 text-lg font-bold md:mb-3 md:text-xl'>
							Міжнародне
						</p>
						<div className='text-green-primary flex flex-col gap-2 text-sm font-medium md:text-base'>
							<Link
								href='/mizhnarodna-spivpratsya'
								className='hover:text-green-secondary cursor-pointer transition-colors duration-200 md:w-fit'
							>
								Міжнародна співпраця
							</Link>
						</div>
					</div>
					<div>
						<p className='text-accent-foreground mb-2 text-lg font-bold md:mb-3 md:text-xl'>
							Наука
						</p>
						<div className='text-green-primary flex flex-col gap-2 text-sm font-medium md:text-base'>
							<Link
								href='#'
								className='hover:text-green-secondary cursor-pointer transition-colors duration-200 md:w-fit'
							>
								{'Ще немає :('}
							</Link>
						</div>
					</div>
					<div>
						<p className='text-accent-foreground mb-2 text-lg font-bold md:mb-3 md:text-xl'>
							Освіта
						</p>
						<div className='text-green-primary flex flex-col gap-2 text-sm font-medium md:text-base'>
							<Link
								href='#'
								className='hover:text-green-secondary cursor-pointer transition-colors duration-200 md:w-fit'
							>
								{'Ще немає :('}
							</Link>
						</div>
					</div>
					<div>
						<p className='text-accent-foreground mb-2 text-lg font-bold md:mb-3 md:text-xl'>
							Публічна інформація
						</p>
						<div className='text-green-primary flex flex-col gap-2 text-sm font-medium md:text-base'>
							<Link
								href='/normatyvni-dokumenty'
								className='hover:text-green-secondary cursor-pointer transition-colors duration-200 md:w-fit'
							>
								Нормативні документи
							</Link>
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
						className='bg-green-primary hover:bg-green-primary/90 dark:bg-green-primary/30 dark:hover:bg-green-primary/40 cursor-pointer rounded-md p-3 text-center text-white transition-colors duration-200'
						target='_blank'
					>
						1 курс
					</Link>
					<Link
						href='https://docs.google.com/spreadsheets/d/1vC741Yi_tDEFF22hfdOQ29HJ5zNqZNf7/edit'
						className='bg-green-primary hover:bg-green-primary/90 dark:bg-green-primary/30 dark:hover:bg-green-primary/40 cursor-pointer rounded-md p-3 text-center text-white transition-colors duration-200'
						target='_blank'
					>
						2 курс
					</Link>
					<Link
						href='https://docs.google.com/spreadsheets/d/1S2HYtfgnUc2ZTfxo7qqMcNgIPA3A2gkg/edit'
						className='bg-green-primary hover:bg-green-primary/90 dark:bg-green-primary/30 dark:hover:bg-green-primary/40 cursor-pointer rounded-md p-3 text-center text-white transition-colors duration-200'
						target='_blank'
					>
						3 курс
					</Link>
					<Link
						href='https://docs.google.com/spreadsheets/d/1911GrINIqew_nuPVGDOgY8P_3Mcokods/edit'
						className='bg-green-primary hover:bg-green-primary/90 dark:bg-green-primary/30 dark:hover:bg-green-primary/40 cursor-pointer rounded-md p-3 text-center text-white transition-colors duration-200'
						target='_blank'
					>
						4 курс
					</Link>
					<Link
						href='https://docs.google.com/spreadsheets/d/18XvUSeAot7r8XnWQ02NFmVr9H-UJ-u2w/edit'
						className='bg-green-primary hover:bg-green-primary/90 dark:bg-green-primary/30 dark:hover:bg-green-primary/40 cursor-pointer rounded-md p-3 text-center text-white transition-colors duration-200'
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
						className='bg-green-primary hover:bg-green-primary/90 dark:bg-green-primary/30 dark:hover:bg-green-primary/40 cursor-pointer rounded-md p-2 text-white transition-colors duration-200'
					>
						Кафедра інформаційних технологій та моделювання
					</Link>
					<Link
						target='_blank'
						href='https://iktmvi.rshu.edu.ua/'
						className='bg-green-primary hover:bg-green-primary/90 dark:bg-green-primary/30 dark:hover:bg-green-primary/40 cursor-pointer rounded-md p-2 text-white transition-colors duration-200'
					>
						Кафедра ЦТ та МНІ
					</Link>
					<Link
						target='_blank'
						href='http://vmivm.gavrysha.com/'
						className='bg-green-primary hover:bg-green-primary/90 dark:bg-green-primary/30 dark:hover:bg-green-primary/40 cursor-pointer rounded-md p-2 text-white transition-colors duration-200'
					>
						Кафедра вищої математики
					</Link>
					<Link
						target='_blank'
						href='http://vmivm.gavrysha.com/'
						className='bg-green-primary hover:bg-green-primary/90 dark:bg-green-primary/30 dark:hover:bg-green-primary/40 cursor-pointer rounded-md p-2 text-white transition-colors duration-200'
					>
						Кафедра математики з методикою викладання
					</Link>
				</div>
			)
		}
	]
}
