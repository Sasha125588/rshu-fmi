import { Badge } from '@/components/ui/badge'

import { SpecializationItem } from './components/SpecializationItem'
import { SPECIALIZATIONS_DATA } from './constants/data'

export const Specializations = () => {
	return (
		<div
			id='specializations'
			className='pt-28'
		>
			<div className='mb-12'>
				<Badge
					className='text-sm font-normal'
					variant='outline'
				>
					Спеціальності
				</Badge>
			</div>

			<div className='w-full'>
				{SPECIALIZATIONS_DATA.map((item, index) => (
					<SpecializationItem
						key={item.title}
						item={item}
						isLast={index === SPECIALIZATIONS_DATA.length - 1}
					/>
				))}
			</div>
		</div>
	)
}
