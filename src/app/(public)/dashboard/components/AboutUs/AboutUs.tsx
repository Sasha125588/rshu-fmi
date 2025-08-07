import { Briefcase, GraduationCap, LayoutGrid, School, Users2, UsersIcon } from 'lucide-react'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/animate-ui/radix/accordion'
import { Badge } from '@/components/ui/badge'

export const AboutUs = () => {
	return (
		<div className='pt-24'>
			<div className='mb-6 flex items-center gap-3'>
				<UsersIcon className='h-5 w-5 text-[#017369]' />
				<Badge
					className='border border-[#017369]/20 text-sm font-normal text-[#017369]'
					variant='outline'
				>
					Про нас
				</Badge>
			</div>
			<h2 className='mb-4 text-3xl font-semibold text-gray-900'>
				Факультет майбутнього для сучасного світу
			</h2>
			<p className='max-w-2xl text-lg text-gray-600'>
				Більше 90 років досвіду в підготовці математиків, програмістів та вчителів. Ваш шлях до
				успіху в цифровому світі починається тут.
			</p>
			<div className='flex w-full items-baseline justify-between pt-10'>
				<Accordion
					type='single'
					collapsible
					className='h-0 w-full max-w-[500px]'
				>
					<AccordionItem value='item-1'>
						<AccordionTrigger className='flex items-center gap-2'>
							<div className='flex items-center gap-4'>
								<GraduationCap className='h-5 w-5 text-[#017369]' />
								Чому варто обрати наш факультет?
							</div>
						</AccordionTrigger>
						<AccordionContent>
							Ми поєднуємо класичну математичну освіту з сучасними IT-технологіями. Наші випускники
							працюють в провідних компаніях світу та успішно викладають у навчальних закладах.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-2'>
						<AccordionTrigger className='flex items-center gap-2'>
							<div className='flex items-center gap-4'>
								<Briefcase className='h-5 w-5 text-[#017369]' />
								Які можливості для практики?
							</div>
						</AccordionTrigger>
						<AccordionContent>
							Студенти проходять стажування в IT-компаніях, беруть участь у хакатонах, олімпіадах з
							програмування та мають доступ до сучасних лабораторій з новітнім обладнанням.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-3'>
						<AccordionTrigger className='flex items-center gap-2'>
							<div className='flex items-center gap-4'>
								<Users2 className='h-5 w-5 text-[#017369]' />
								Яка підтримка після випуску?
							</div>
						</AccordionTrigger>
						<AccordionContent>
							Факультет підтримує зв&apos;язок з випускниками, надає допомогу в працевлаштуванні та
							створює можливості для професійного розвитку через Alumni-спільноту.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-4'>
						<AccordionTrigger className='flex items-center gap-2'>
							<div className='flex items-center gap-4'>
								<School className='h-5 w-5 text-[#017369]' />
								Хто наші викладачі?
							</div>
						</AccordionTrigger>
						<AccordionContent>
							Наш професорсько-викладацький склад складається з досвідчених науковців, кандидатів та
							докторів наук, а також практикуючих IT-спеціалістів з провідних компаній галузі.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-6'>
						<AccordionTrigger className='flex items-center gap-2'>
							<div className='flex items-center gap-4'>
								<LayoutGrid className='h-5 w-5 text-[#017369]' />
								Які умови навчання та обладнання?
							</div>
						</AccordionTrigger>
						<AccordionContent>
							Факультет оснащений сучасними комп&apos;ютерними лабораторіями, має доступ до
							ліцензійного програмного забезпечення та онлайн-платформ для дистанційного навчання.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
				<div className='flex flex-col gap-4 text-[17px]/[26px] font-medium'>
					<p className='w-[400px]'>
						Факультет математики та інформатики РДГУ поєднує багаторічні традиції математичної школи
						з інноваційними підходами до викладання IT-дисциплін. Ми готуємо висококваліфікованих
						фахівців, здатних вирішувати складні завдання сучасного цифрового світу.
					</p>
					<p className='w-[420px]'>
						Наші програми охоплюють від фундаментальних математичних досліджень до практичного
						програмування та штучного інтелекту. Ми віримо, що майбутнє належить тим, хто поєднує
						аналітичне мислення з технологічними навичками.
					</p>
				</div>
			</div>
		</div>
	)
}
