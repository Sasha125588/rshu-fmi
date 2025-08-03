import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/animate-ui/radix/accordion'
import { Badge } from '@/components/ui/badge'

export const AboutUs = () => {
	return (
		<div className='pt-28 pb-3'>
			<Badge
				className='border text-sm font-normal'
				variant='outline'
			>
				Про нас
			</Badge>
			<h2 className='scroll-m-20 pt-10 text-3xl font-semibold tracking-tight first:mt-0'>
				Факультет майбутнього <br /> для сучасного світу
			</h2>
			<div className='flex w-full items-baseline justify-between pt-2'>
				<Accordion
					type='single'
					collapsible
					className='w-full max-w-[500px] pt-8'
				>
					<AccordionItem value='item-1'>
						<AccordionTrigger>Чому варто обрати наш факультет?</AccordionTrigger>
						<AccordionContent>
							Ми поєднуємо класичну математичну освіту з сучасними IT-технологіями. Наші випускники
							працюють в провідних компаніях світу та успішно викладають у навчальних закладах.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-2'>
						<AccordionTrigger>Які можливості для практики?</AccordionTrigger>
						<AccordionContent>
							Студенти проходять стажування в IT-компаніях, беруть участь у хакатонах, олімпіадах з
							програмування та мають доступ до сучасних лабораторій з новітнім обладнанням.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-3'>
						<AccordionTrigger>Яка підтримка після випуску?</AccordionTrigger>
						<AccordionContent>
							Факультет підтримує зв&apos;язок з випускниками, надає допомогу в працевлаштуванні та
							створює можливості для професійного розвитку через Alumni-спільноту.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-4'>
						<AccordionTrigger>Хто наші викладачі?</AccordionTrigger>
						<AccordionContent>
							Наш професорсько-викладацький склад складається з досвідчених науковців, кандидатів та
							докторів наук, а також практикуючих IT-спеціалістів з провідних компаній галузі.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-6'>
						<AccordionTrigger>Які умови навчання та обладнання?</AccordionTrigger>
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
