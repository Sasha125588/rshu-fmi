export interface NavbarDataItem {
	name: string
	href: string
	hasDropdown: boolean
}

export interface NavbarData {
	items: NavbarDataItem[]
}
