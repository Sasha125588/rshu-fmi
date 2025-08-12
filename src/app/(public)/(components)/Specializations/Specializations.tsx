import { GraduationCapIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

import { SpecializationItem } from './components/SpecializationItem'
import { SPECIALIZATIONS_DATA } from './constants/data'

export const Specializations = () => (
	<div
		id='specializations'
		className='pt-28'
	>
		<div className=''>
			<div className='mb-6 flex items-center gap-3'>
				<GraduationCapIcon className='h-5 w-5 text-[#017369]' />
				<Badge
					className='border-[#017369]/20 text-sm font-normal text-[#017369]'
					variant='outline'
				>
					Спеціальності
				</Badge>
			</div>
			<h2 className='mb-4 text-3xl font-semibold'>Обирайте напрямок свого майбутнього</h2>
			<p className='text-muted-foreground max-w-2xl text-lg'>
				Наші освітні програми поєднують фундаментальні знання з практичними навичками, необхідними
				для успішної кар&apos;єри в IT та освіті.
			</p>
		</div>

		<div className='grid gap-6 pt-10 md:grid-cols-2 lg:gap-8'>
			{SPECIALIZATIONS_DATA.map(item => (
				<SpecializationItem
					key={item.title}
					item={item}
				/>
			))}
		</div>
	</div>
)
