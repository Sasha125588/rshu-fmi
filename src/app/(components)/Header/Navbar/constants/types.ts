export interface NavbarDataItem {
	name: string
	href: string
	hasDropdown: boolean
	component: React.ReactElement
}

export interface NavbarData {
	items: NavbarDataItem[]
}
