import { SearchIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'

import { NavbarItem } from './components/NavbarItem/NavbarItem'
import { NAVBAR_DOWN_DATA } from './constants/data'
import { NAVBAR_UP_DATA } from './constants/data'

export const Navbar = () => (
	<div className='w-full'>
		<div className='flex w-full items-center justify-between gap-6 border-b-1 pt-6 pb-4 text-sm font-medium'>
			<div className='flex gap-6'>
				{NAVBAR_UP_DATA.items.map(item => (
					<NavbarItem
						variant='link'
						key={item.name}
						item={item}
					/>
				))}
			</div>
			<div className='relative'>
				<Input
					className='peer h-8 rounded-full ps-8 pe-10'
					placeholder='Пошук...'
					autoFocus={false}
					type='search'
				/>
				<div className='text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50'>
					<SearchIcon size={16} />
				</div>
				<div className='text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2'>
					<kbd className='text-muted-foreground/70 inline-flex h-5 max-h-full items-center rounded-lg border px-1 font-[inherit] text-[0.625rem] font-medium'>
						⌘K
					</kbd>
				</div>
			</div>
		</div>
		<div className='flex gap-4 pt-4 text-sm font-medium'>
			{NAVBAR_DOWN_DATA.items.map(item => (
				<NavbarItem
					variant='outline'
					key={item.name}
					item={item}
				/>
			))}
		</div>
	</div>
)
