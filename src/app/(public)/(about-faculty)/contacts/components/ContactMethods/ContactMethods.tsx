import { Building, Phone } from 'lucide-react'

import {
	ContactCard,
	ContactCardContent,
	ContactCardContentFooter,
	ContactCardContentHeader,
	ContactCardHeader,
	ContactCardTitle
} from './components/ContactCard/ContactCard'

export const ContactMethods = () => {
	return (
		<div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
			<ContactCard>
				<ContactCardHeader>
					<ContactCardTitle>
						<Phone className='h-6 w-6 text-[#017369]' />
						<p>Телефон</p>
					</ContactCardTitle>
				</ContactCardHeader>
				<ContactCardContent>
					<ContactCardContentHeader>
						<h3 className='mb-2 font-semibold text-gray-800'>Деканат факультету</h3>
						<p className='text-2xl font-bold text-[#017369]'>(0362) 26-65-94</p>
						<p className='mt-2 text-sm text-gray-600'>Понеділок - П&apos;ятниця: 8:00 - 17:00</p>
					</ContactCardContentHeader>
					<ContactCardContentFooter>
						<h3 className='mb-2 font-medium text-gray-800'>Коли телефонувати:</h3>
						<ul className='space-y-1 text-sm text-gray-600'>
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
						<Phone className='h-6 w-6 text-[#017369]' />
						<p>Електронна пошта</p>
					</ContactCardTitle>
				</ContactCardHeader>
				<ContactCardContent>
					<ContactCardContentHeader>
						<h3 className='mb-2 font-semibold text-gray-800'>Деканат факультету</h3>
						<a
							href='mailto:dekanat.fmi@rshu.edu.ua'
							className='block text-xl font-bold text-[#017369] hover:underline'
						>
							dekanat.fmi@rshu.edu.ua
						</a>
						<p className='mt-2 text-sm text-gray-600'>Відповідаємо протягом 1-2 робочих днів</p>
					</ContactCardContentHeader>
					<ContactCardContentFooter>
						<h3 className='mb-2 font-medium text-gray-800'>Коли телефонувати:</h3>
						<ul className='space-y-1 text-sm text-gray-600'>
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
						<Building className='h-6 w-6 text-[#017369]' />
						<p>Приймальна комісія</p>
					</ContactCardTitle>
				</ContactCardHeader>
				<ContactCardContent>
					<ContactCardContentHeader className='bg-orange-50 text-sm'>
						<div className='flex-1'>
							<div className='space-y-2 text-sm text-gray-600'>
								<p>
									<strong>Адреса:</strong> вул. С. Бандери, 12, м. Рівне, Україна, 33028
								</p>
								<p>
									<strong>E-mail:</strong>{' '}
									<a
										href='mailto:pk@rshu.edu.ua'
										className='text-[#017369] hover:underline'
									>
										pk@rshu.edu.ua
									</a>
								</p>
								<p>
									<strong>Телефон для консультацій:</strong>{' '}
									<a
										href='tel:+38098475672'
										className='text-[#017369] hover:underline'
									>
										+38 (098) 475 67 2
									</a>
								</p>
							</div>
						</div>
					</ContactCardContentHeader>
					<ContactCardContentFooter>
						<h3 className='mb-2 font-medium text-gray-800'>Коли звертатися:</h3>
						<ul className='space-y-1 text-sm text-gray-600'>
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
}
