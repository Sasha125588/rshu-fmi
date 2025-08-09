import Link from 'next/link'

import type { NavbarData } from './types'

export const NAVBAR_UP_DATA: NavbarData = {
	items: [
		{
			name: 'ОСВІТНЯ ДІЯЛЬНІСТЬ',
			href: '/faculties',
			hasDropdown: true,
			component: (
				<div className='flex flex-col gap-2 p-1'>
					<p className='cursor-pointer rounded-md bg-[#017369] p-2 text-white hover:bg-[#017369]/90'>
						Денна форма навчання
					</p>
					<p className='cursor-pointer rounded-md bg-[#017369] p-2 text-white hover:bg-[#017369]/90'>
						Заочна форма навчання
					</p>
				</div>
			)
		},
		{
			name: 'АБІТУРІЄНТУ',
			href: '/departments',
			hasDropdown: true,
			component: <div>АБІТУРІЄНТУ</div>
		},
		{
			name: 'НОВИНИ',
			href: '#news',
			hasDropdown: false,
			component: <div>НОВИНИ</div>
		},
		{
			name: 'ПРО НАС',
			href: '/about-us',
			hasDropdown: true,
			component: (
				<div className='flex w-[800px] flex-col gap-24 p-8'>
					<div className='flex items-baseline justify-between'>
						<div>
							<p className='text-xl font-bold'>Адміністрація</p>
							<div className='flex flex-col gap-1 pt-2 text-base font-medium text-[#017369]'>
								<p className='w-fit cursor-pointer hover:text-[#02574f]'>Деканат</p>
								<p className='w-fit cursor-pointer hover:text-[#02574f]'>Вчена рада</p>
								<p className='w-fit cursor-pointer hover:text-[#02574f]'>Студентська рада</p>
								<p className='w-fit cursor-pointer hover:text-[#02574f]'>Контакти</p>
							</div>
						</div>
						<div>
							<p className='text-xl font-bold'>Історія та сьогодення</p>
							<div className='flex flex-col gap-1 pt-2 text-base font-medium text-[#017369]'>
								<p className='w-fit cursor-pointer hover:text-[#02574f]'>Історія</p>
							</div>
						</div>
						<div>
							<p className='text-xl font-bold'>Інфраструктура</p>
							<div className='flex flex-col gap-1 pt-2 text-base font-medium text-[#017369]'>
								<p className='w-fit cursor-pointer hover:text-[#02574f]'>Кабінети</p>
							</div>
						</div>
					</div>
					<div className='flex'>
						<p>Адміністрація</p>
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
						className='cursor-pointer rounded-md bg-[#017369] p-2 text-white hover:bg-[#017369]/90'
						target='_blank'
					>
						1 курс
					</Link>
					<Link
						href='https://docs.google.com/spreadsheets/d/1vC741Yi_tDEFF22hfdOQ29HJ5zNqZNf7/edit'
						className='cursor-pointer rounded-md bg-[#017369] p-2 text-white hover:bg-[#017369]/90'
						target='_blank'
					>
						2 курс
					</Link>
					<Link
						href='https://docs.google.com/spreadsheets/d/1S2HYtfgnUc2ZTfxo7qqMcNgIPA3A2gkg/edit'
						className='cursor-pointer rounded-md bg-[#017369] p-2 text-white hover:bg-[#017369]/90'
						target='_blank'
					>
						3 курс
					</Link>
					<Link
						href='https://docs.google.com/spreadsheets/d/1911GrINIqew_nuPVGDOgY8P_3Mcokods/edit'
						className='cursor-pointer rounded-md bg-[#017369] p-2 text-white hover:bg-[#017369]/90'
						target='_blank'
					>
						4 курс
					</Link>
					<Link
						href='https://docs.google.com/spreadsheets/d/18XvUSeAot7r8XnWQ02NFmVr9H-UJ-u2w/edit'
						className='cursor-pointer rounded-md bg-[#017369] p-2 text-white hover:bg-[#017369]/90'
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
			href: '/departments',
			hasDropdown: true,
			component: (
				<div className='flex flex-col gap-2 p-1'>
					<Link
						target='_blank'
						href='https://kitm.rshu.edu.ua/'
						className='cursor-pointer rounded-md bg-[#017369] p-2 text-white hover:bg-[#017369]/90'
					>
						Кафедра інформаційних технологій та моделювання
					</Link>
					<Link
						target='_blank'
						href='https://iktmvi.rshu.edu.ua/'
						className='cursor-pointer rounded-md bg-[#017369] p-2 text-white hover:bg-[#017369]/90'
					>
						Кафедра ЦТ та МНІ
					</Link>
					<Link
						target='_blank'
						href='http://vmivm.gavrysha.com/'
						className='cursor-pointer rounded-md bg-[#017369] p-2 text-white hover:bg-[#017369]/90'
					>
						Кафедра вищої математики
					</Link>
					<Link
						target='_blank'
						href='http://vmivm.gavrysha.com/'
						className='cursor-pointer rounded-md bg-[#017369] p-2 text-white hover:bg-[#017369]/90'
					>
						Кафедра математики з методикою викладання
					</Link>
				</div>
			)
		},
		{
			name: 'ПРАЦІВНИКИ',
			href: '/staff',
			hasDropdown: true,
			component: <div>ПРАЦІВНИКИ</div>
		},
		{
			name: 'ГАЛЕРЕЯ',
			href: '/gallery',
			hasDropdown: true,
			component: <div>ГАЛЕРЕЯ</div>
		}
	]
}
