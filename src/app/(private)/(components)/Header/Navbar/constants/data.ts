import { NavbarData } from './types'

export const NAVBAR_DOWN_DATA: NavbarData = {
	items: [
		{
			name: 'ФАКУЛЬТЕТИ',
			href: '/faculties',
			hasDropdown: true
		},
		{
			name: 'КАФЕДРИ',
			href: '/departments',
			hasDropdown: true
		},
		{
			name: 'ПРАЦІВНИКИ',
			href: '/staff',
			hasDropdown: true
		},
		{
			name: 'ГАЛЕРЕЯ',
			href: '/gallery',
			hasDropdown: true
		}
	]
}

export const NAVBAR_UP_DATA: NavbarData = {
	items: [
		{
			name: 'ОСВІТНЯ ДІЯЛЬНІСТЬ',
			href: '/faculties',
			hasDropdown: true
		},
		{
			name: 'АБІТУРІЄНТУ',
			href: '/departments',
			hasDropdown: true
		},
		{
			name: 'НОВИНИ',
			href: '/news',
			hasDropdown: true
		},
		{
			name: 'ПРО НАС',
			href: '/about-us',
			hasDropdown: true
		},
		{
			name: 'КОНТАКТИ',
			href: '/gallery',
			hasDropdown: true
		}
	]
}
