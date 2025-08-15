import { Building, Mail, Phone } from 'lucide-react'

import {
	ContactCard,
	ContactCardContent,
	ContactCardContentFooter,
	ContactCardContentHeader,
	ContactCardHeader,
	ContactCardTitle
} from './components/ContactCard/ContactCard'

export const ContactMethods = () => (
	<div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
		<ContactCard>
			<ContactCardHeader>
				<ContactCardTitle>
					<Phone className='text-green-primary h-6 w-6' />
					<p>Телефон</p>
				</ContactCardTitle>
			</ContactCardHeader>
			<ContactCardContent>
				<ContactCardContentHeader>
					<h3 className='mb-2 font-semibold'>Деканат факультету</h3>
					<p className='text-green-primary text-2xl font-bold'>(0362) 26-65-94</p>
					<p className='mt-2 text-sm'>Понеділок - П&apos;ятниця: 8:00 - 17:00</p>
				</ContactCardContentHeader>
				<ContactCardContentFooter>
					<h3 className='mb-2 font-medium'>Коли звертатися:</h3>
					<ul className='text-primary/90 space-y-1 text-sm'>
						<li>• Питання щодо вступу та навчання</li>
						<li>• Інформація про спеціальності</li>
						<li>• Консультації для абітурієнтів</li>
						<li>• Загальні питання про факультет</li>
					</ul>
				</ContactCardContentFooter>
			</ContactCardContent>
		</ContactCard>

		<ContactCard>
			<ContactCardHeader>
				<ContactCardTitle>
					<Mail className='text-green-primary h-6 w-6' />
					<p>Електронна пошта</p>
				</ContactCardTitle>
			</ContactCardHeader>
			<ContactCardContent>
				<ContactCardContentHeader>
					<h3 className='mb-2 font-semibold'>Деканат факультету</h3>
					<a
						href='mailto:dekanat.fmi@rshu.edu.ua'
						className='text-green-primary block text-xl font-bold hover:underline'
					>
						dekanat.fmi@rshu.edu.ua
					</a>
					<p className='mt-2 text-sm'>Відповідаємо протягом 1-2 робочих днів</p>
				</ContactCardContentHeader>
				<ContactCardContentFooter>
					<h3 className='mb-2 font-medium'>Коли звертатися:</h3>
					<ul className='text-primary/90 space-y-1 text-sm'>
						<li>• Детальна інформація про програми</li>
						<li>• Документи для вступу</li>
						<li>• Співпраця та партнерство</li>
						<li>• Академічні питання</li>
					</ul>
				</ContactCardContentFooter>
			</ContactCardContent>
		</ContactCard>

		<ContactCard>
			<ContactCardHeader>
				<ContactCardTitle>
					<Building className='text-green-primary h-6 w-6' />
					<p>Приймальна комісія</p>
				</ContactCardTitle>
			</ContactCardHeader>
			<ContactCardContent>
				<ContactCardContentHeader className='text-sm'>
					<div className='flex-1'>
						<div className='space-y-2 text-sm'>
							<p>
								<strong>Адреса:</strong> вул. С. Бандери, 12, м. Рівне, Україна, 33028
							</p>
							<p>
								<strong>E-mail:</strong>{' '}
								<a
									href='mailto:pk@rshu.edu.ua'
									className='text-green-primary hover:underline'
								>
									pk@rshu.edu.ua
								</a>
							</p>
							<p>
								<strong>Телефон для консультацій:</strong>{' '}
								<a
									href='tel:+38098475672'
									className='text-green-primary hover:underline'
								>
									+38 (098) 475 67 2
								</a>
							</p>
						</div>
					</div>
				</ContactCardContentHeader>
				<ContactCardContentFooter>
					<h3 className='mb-2 font-medium'>Коли звертатися:</h3>
					<ul className='text-primary/90 space-y-1 text-sm'>
						<li>• Питання про вступ</li>
						<li>• Консультації для абітурієнтів</li>
						<li>• Подача документів</li>
						<li>• Вступні екзамени</li>
					</ul>
				</ContactCardContentFooter>
			</ContactCardContent>
		</ContactCard>
	</div>
)
