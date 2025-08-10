import { Building, Clock, Mail, MapPin, Phone, Share2 } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'

import { FacebookIcon } from '@/public/images/components/FacebookIcon'
import { InstagramIcon } from '@/public/images/components/InstagramIcon'
import { TiktokIcon } from '@/public/images/components/TiktokIcon'

export const metadata: Metadata = {
	title: 'Контакти факультету математики та інформатики',
	description:
		'Контактна інформація факультету математики та інформатики РДГУ: адреса, телефони, електронна пошта',
	openGraph: {
		title: 'Контакти факультету математики та інформатики',
		description:
			'Контактна інформація факультету математики та інформатики РДГУ: адреса, телефони, електронна пошта',
		images: ['/images/logo.webp'],
		url: process.env.NEXT_PUBLIC_BASE_URL + '/contacts',
		type: 'website',
		locale: 'uk_UA'
	}
}

const ContactsPage = () => {
	return (
		<div className='bg-background min-h-screen'>
			{/* Hero Section */}
			<div className='pb-12'>
				<div className='mb-6 flex items-center gap-3'>
					<Phone className='h-5 w-5 text-[#017369]' />
					<Badge
						className='border border-[#017369]/20 text-sm font-normal text-[#017369]'
						variant='outline'
					>
						Зв&apos;язок з нами
					</Badge>
				</div>
				<h1 className='mb-6 text-5xl leading-tight font-semibold text-gray-900'>
					Контакти
					<br />
					<span className='text-[#017369]'>факультету</span>
				</h1>
				<p className='max-w-3xl text-xl leading-relaxed text-gray-600'>
					Ми завжди готові відповісти на ваші питання та надати необхідну інформацію про навчання,
					вступ та діяльність факультету математики та інформатики.
				</p>
			</div>

			{/* Contact Information */}
			<div className='space-y-8'>
				{/* Address Section */}
				<div className='rounded-2xl bg-gradient-to-r from-[#017369]/5 to-transparent p-8'>
					<div className='mb-6 flex items-center gap-3'>
						<MapPin className='h-6 w-6 text-[#017369]' />
						<h2 className='text-2xl font-semibold text-gray-900'>Адреса</h2>
					</div>

					<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
						<div className='flex h-full flex-col space-y-4'>
							<div className='flex-1 rounded-lg border border-[#017369]/20 bg-white p-6'>
								<div className='mb-4 flex items-center gap-3'>
									<Building className='h-5 w-5 text-[#017369]' />
									<h3 className='text-lg font-semibold text-gray-900'>
										Факультет математики та інформатики
									</h3>
								</div>
								<div className='space-y-2'>
									<p className='text-gray-700'>
										<strong>Рівненський державний гуманітарний університет</strong>
									</p>
									<p className='text-gray-600'>33028, Україна</p>
									<p className='text-gray-600'>м. Рівне, вул. Пластова, 31</p>
									<p className='text-gray-600'>каб. 108</p>
								</div>
							</div>
						</div>

						<div className='flex h-full flex-col space-y-4'>
							<div className='flex-1 rounded-lg bg-blue-50 p-6'>
								<h3 className='mb-3 text-lg font-semibold text-gray-800'>Як нас знайти</h3>
								<ul className='space-y-2 text-gray-600'>
									<li className='flex items-start gap-2'>
										<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
										<span>Центральний корпус університету</span>
									</li>
									<li className='flex items-start gap-2'>
										<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
										<span>1-й поверх, кабінет 108</span>
									</li>
									<li className='flex items-start gap-2'>
										<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
										<span>Зручне транспортне сполучення</span>
									</li>
									<li className='flex items-start gap-2'>
										<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
										<span>Паркування поблизу університету</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				{/* Contact Methods */}
				<div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
					{/* Phone */}
					<div className='flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-8'>
						<div className='mb-6 flex items-center gap-3'>
							<Phone className='h-6 w-6 text-[#017369]' />
							<h2 className='text-2xl font-semibold text-gray-900'>Телефони</h2>
						</div>

						<div className='flex h-full flex-col space-y-4'>
							<div className='flex-1 rounded-lg bg-green-50 p-4'>
								<h3 className='mb-2 font-semibold text-gray-800'>Деканат факультету</h3>
								<p className='text-2xl font-bold text-[#017369]'>(0362) 26-65-94</p>
								<p className='mt-2 text-sm text-gray-600'>
									Понеділок - П&apos;ятниця: 8:00 - 17:00
								</p>
							</div>

							<div className='flex-1 rounded-lg bg-gray-50 p-4'>
								<h3 className='mb-2 font-medium text-gray-800'>Коли телефонувати:</h3>
								<ul className='space-y-1 text-sm text-gray-600'>
									<li>• Питання щодо вступу та навчання</li>
									<li>• Інформація про спеціальності</li>
									<li>• Консультації для абітурієнтів</li>
									<li>• Загальні питання про факультет</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Email */}
					<div className='flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-8'>
						<div className='mb-6 flex items-center gap-3'>
							<Mail className='h-6 w-6 text-[#017369]' />
							<h2 className='text-2xl font-semibold text-gray-900'>Електронна пошта</h2>
						</div>

						<div className='flex h-full flex-col space-y-4'>
							<div className='flex-1 rounded-lg bg-blue-50 p-4'>
								<h3 className='mb-2 font-semibold text-gray-800'>Деканат факультету</h3>
								<a
									href='mailto:dekanat.fmi@rshu.edu.ua'
									className='block text-xl font-bold text-[#017369] hover:underline'
								>
									dekanat.fmi@rshu.edu.ua
								</a>
								<p className='mt-2 text-sm text-gray-600'>Відповідаємо протягом 1-2 робочих днів</p>
							</div>

							<div className='flex-1 rounded-lg bg-gray-50 p-4'>
								<h3 className='mb-2 font-medium text-gray-800'>Що можна запитати:</h3>
								<ul className='space-y-1 text-sm text-gray-600'>
									<li>• Детальна інформація про програми</li>
									<li>• Документи для вступу</li>
									<li>• Співпраця та партнерство</li>
									<li>• Академічні питання</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Приймальна комісія */}
					<div className='flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-8'>
						<div className='mb-6 flex items-center gap-3'>
							<Building className='h-6 w-6 text-[#017369]' />
							<h2 className='text-2xl font-semibold text-gray-900'>Приймальна комісія</h2>
						</div>

						<div className='flex h-full flex-col space-y-4'>
							<div className='flex-1 rounded-lg bg-orange-50 p-4'>
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

							<div className='flex-1 rounded-lg bg-gray-50 p-4'>
								<h3 className='mb-2 font-medium text-gray-800'>Коли звертатися:</h3>
								<ul className='space-y-1 text-sm text-gray-600'>
									<li>• Питання про вступ</li>
									<li>• Консультації для абітурієнтів</li>
									<li>• Подача документів</li>
									<li>• Вступні екзамени</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				{/* Working Hours */}
				<div className='rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8'>
					<div className='mb-6 flex items-center gap-3'>
						<Clock className='h-6 w-6 text-[#017369]' />
						<h2 className='text-2xl font-semibold text-gray-900'>Графік роботи</h2>
					</div>

					<div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
						<div className='rounded-lg bg-white p-4'>
							<h3 className='mb-3 font-semibold text-gray-800'>Деканат</h3>
							<div className='space-y-2 text-sm text-gray-600'>
								<div className='flex justify-between'>
									<span>Понеділок - П&apos;ятниця:</span>
									<span className='font-medium'>8:00 - 17:00</span>
								</div>
								<div className='flex justify-between'>
									<span>Обідня перерва:</span>
									<span className='font-medium'>12:00 - 13:00</span>
								</div>
								<div className='flex justify-between'>
									<span>Вихідні:</span>
									<span className='font-medium'>Субота, Неділя</span>
								</div>
							</div>
						</div>

						<div className='rounded-lg bg-white p-4'>
							<h3 className='mb-3 font-semibold text-gray-800'>Приймальна комісія</h3>
							<div className='space-y-3 text-sm text-gray-600'>
								<div className='flex justify-between'>
									<span>Понеділок-п&apos;ятниця:</span>
									<span className='font-medium'>9:00-17:00 год.</span>
								</div>

								<div className='space-y-2'>
									<div className='text-xs font-medium text-gray-500'>
										В окремі дні робота подовжується до 18:00 год:
									</div>
									<div className='space-y-1 pl-3 text-xs'>
										<div>
											<span className='font-medium'>10.07, 25.07, 01.08, 09.08</span> – для
											працівників відбіркової комісії № 1;
										</div>
										<div>
											<span className='font-medium'>06.08, 25.08, 28.08, 01.09</span> – для
											працівників відбіркової комісії № 2;
										</div>
										<div>
											<span className='font-medium'>15.09, 19.09, 29.09, 06.10</span> – для
											працівників відбіркової комісії № 4.
										</div>
									</div>
								</div>

								<div className='flex justify-between'>
									<span>Субота:</span>
									<span className='font-medium'>01.07-31.08.2025 з 9:00 до 13:00 год.</span>
								</div>

								<div className='flex justify-between'>
									<span>Обідня перерва:</span>
									<span className='font-medium'>13:00-14:00 год.</span>
								</div>

								<div className='flex justify-between'>
									<span>Вихідні:</span>
									<span className='font-medium'>Неділя</span>
								</div>

								<div className='mt-3 rounded border border-yellow-200 bg-yellow-50 p-2 text-xs text-gray-600'>
									<strong>Примітка:</strong> Порядок роботи Приймальної комісії може бути змінений
									відповідно до прийнятого нею рішення.
								</div>
							</div>
						</div>

						<div className='rounded-lg bg-white p-4'>
							<h3 className='mb-3 font-semibold text-gray-800'>Консультації</h3>
							<div className='space-y-2 text-sm text-gray-600'>
								<div className='flex justify-between'>
									<span>Вівторок, Четвер:</span>
									<span className='font-medium'>14:00 - 16:00</span>
								</div>
								<div className='flex justify-between'>
									<span>За домовленістю:</span>
									<span className='font-medium'>Інший час</span>
								</div>
								<p className='mt-2 text-xs text-gray-500'>Попередньо телефонуйте або пишіть</p>
							</div>
						</div>
					</div>
				</div>

				{/* Social Media */}
				<div className='rounded-2xl border border-gray-100 bg-white p-8'>
					<div className='mb-6 flex items-center gap-3'>
						<Share2 className='h-6 w-6 text-[#017369]' />
						<h2 className='text-2xl font-semibold text-gray-900'>Соціальні мережі</h2>
					</div>

					<div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
						{/* Instagram */}
						<div className='rounded-lg bg-gradient-to-br from-pink-50 to-purple-50 p-6'>
							<div className='mb-4 flex items-center gap-3'>
								<div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600'>
									<InstagramIcon className='h-5 w-5 text-white' />
								</div>
								<div>
									<h3 className='font-semibold text-gray-900'>Instagram</h3>
									<p className='text-sm text-gray-600'>@fmi_rshu</p>
								</div>
							</div>
							<p className='mb-4 text-sm text-gray-600'>
								Фото з життя університету, події та досягнення студентів
							</p>
							<Link
								href='https://www.instagram.com/fmi_rshu/'
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:scale-105'
							>
								Підписатися
							</Link>
						</div>

						{/* TikTok */}
						<div className='rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 p-6'>
							<div className='mb-4 flex items-center gap-3'>
								<div className='flex h-10 w-10 items-center justify-center rounded-full bg-black'>
									<TiktokIcon className='h-5 w-5 text-white' />
								</div>
								<div>
									<h3 className='font-semibold text-gray-900'>TikTok</h3>
									<p className='text-sm text-gray-600'>@fmi_rshu</p>
								</div>
							</div>
							<p className='mb-4 text-sm text-gray-600'>
								Короткі відео про студентське життя та навчальний процес
							</p>
							<Link
								href='https://www.tiktok.com/@fmi_rshu'
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:scale-105'
							>
								Стежити
							</Link>
						</div>

						{/* Facebook */}
						<div className='rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-6'>
							<div className='mb-4 flex items-center gap-3'>
								<div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-600'>
									<FacebookIcon className='h-5 w-5 text-white' />
								</div>
								<div>
									<h3 className='font-semibold text-gray-900'>Facebook</h3>
									<p className='text-sm text-gray-600'>Факультет математики та інформатики РДГУ</p>
								</div>
							</div>
							<p className='mb-4 text-sm text-gray-600'>
								Офіційні новини, оголошення та анонси подій університету
							</p>
							<Link
								href='https://www.facebook.com/groups/1748613002125956/'
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:scale-105'
							>
								Слідкувати
							</Link>
						</div>
					</div>

					<div className='mt-8 rounded-lg bg-violet-50 p-6'>
						<h3 className='mb-3 text-lg font-semibold text-gray-800'>
							Чому варто слідкувати за нами?
						</h3>
						<div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
							<ul className='space-y-2 text-sm text-gray-600'>
								<li className='flex items-start gap-2'>
									<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
									<span>Перші дізнаватися про важливі події</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
									<span>Бачити досягнення наших студентів</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
									<span>Отримувати корисні поради про навчання</span>
								</li>
							</ul>
							<ul className='space-y-2 text-sm text-gray-600'>
								<li className='flex items-start gap-2'>
									<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
									<span>Дивитися фото з університетського життя</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
									<span>Дізнаватися про нові спеціальності</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
									<span>Бути в курсі всіх новин факультету</span>
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Call to action */}
				<div className='rounded-2xl bg-gradient-to-r from-[#017369] to-[#01635b] p-8 text-white'>
					<div className='text-center'>
						<h2 className='mb-4 text-3xl font-semibold'>Маєте питання?</h2>
						<p className='mx-auto mb-6 max-w-2xl text-xl leading-relaxed opacity-90'>
							Наша команда завжди готова допомогти. Зв&apos;яжіться з нами зручним для вас способом,
							і ми надамо всю необхідну інформацію про навчання на факультеті.
						</p>
						<div className='flex flex-col gap-4 md:flex-row md:justify-center'>
							<a
								href='tel:+380362266594'
								className='rounded-full bg-white/20 px-6 py-3 font-medium transition-all duration-200 hover:bg-white/30'
							>
								📞 Зателефонувати
							</a>
							<a
								href='mailto:dekanat.fmi@rshu.edu.ua'
								className='rounded-full bg-white/20 px-6 py-3 font-medium transition-all duration-200 hover:bg-white/30'
							>
								✉️ Написати email
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ContactsPage
