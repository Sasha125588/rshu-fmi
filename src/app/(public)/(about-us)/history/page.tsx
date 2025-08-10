import {
	Award,
	BookOpen,
	Building,
	Calendar,
	Clock,
	Globe,
	GraduationCap,
	Star,
	Trophy,
	Users
} from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger
} from '@/components/animate-ui/radix/tabs'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
	title: 'Історія',
	description:
		'Історія факультету математики та інформатики РДГУ: від заснування Учительського інституту до сучасного факультету інноваційних технологій',
	openGraph: {
		title: 'Історія факультету математики та інформатики',
		description:
			'Історія факультету математики та інформатики РДГУ: від заснування Учительського інституту до сучасного факультету інноваційних технологій',
		images: [
			{
				url: new URL(
					'/images/logo.webp',
					process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
				).href,

				width: 120,
				height: 120,
				type: 'image/webp',
				alt: 'ФМІ логотип'
			}
		],
		url: new URL('/history', process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000').href,
		type: 'website',
		locale: 'uk_UA'
	}
}

const HistoryPage = () => {
	return (
		<div className='bg-background min-h-screen'>
			{/* Hero Section */}
			<div className='pb-12'>
				<div className='mb-6 flex items-center gap-3'>
					<Clock className='h-5 w-5 text-[#017369]' />
					<Badge
						className='border border-[#017369]/20 text-sm font-normal text-[#017369]'
						variant='outline'
					>
						Історія факультету
					</Badge>
				</div>
				<h1 className='mb-6 text-5xl leading-tight font-semibold text-gray-900'>
					Історія факультету
					<br />
					<span className='text-[#017369]'>математики та інформатики</span>
				</h1>
				<p className='max-w-3xl text-xl leading-relaxed text-gray-600'>
					Понад 80 років досвіду у підготовці висококваліфікованих математиків, програмістів та
					педагогів. Від першого Учительського інституту до сучасного факультету інноваційних
					технологій.
				</p>
			</div>

			{/* Timeline Section */}
			<div className='space-y-16'>
				{/* 1940s - Beginning */}
				<div className='relative'>
					<div className='flex items-start gap-6'>
						<div className='flex-shrink-0'>
							<div className='flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#017369] bg-[#017369]/10'>
								<Calendar className='h-6 w-6 text-[#017369]' />
							</div>
						</div>
						<div className='flex-1'>
							<div className='mb-3 flex items-center gap-3'>
								<Badge
									className='border-[#017369]/20 text-[#017369]'
									variant='outline'
								>
									1940 рік
								</Badge>
							</div>
							<h2 className='mb-4 text-2xl font-semibold text-gray-900'>
								Заснування Учительського інституту
							</h2>
							<p className='mb-4 text-lg leading-relaxed text-gray-600'>
								Факультет математики та інформатики є правонаступником фізико-математичного
								факультету, який нерозривно пов&apos;язаний з початком функціонування на Ровенщині
								першого найстарішого вищого навчального закладу – Учительського інституту,
								відкритого у березні 1940 року.
							</p>
							<div className='rounded-lg bg-gray-50 p-4'>
								<p className='text-gray-700'>
									<strong>3 факультети:</strong> історичний, фізико-математичний і
									мовно-літературний. Навчальні плани були розраховані на підготовку протягом двох
									років учителів для нової радянської школи. У зв&apos;язку з Другою світовою війною
									навчання в інституті було перервано.
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Post-war period */}
				<div className='relative'>
					<div className='flex items-start gap-6'>
						<div className='flex-shrink-0'>
							<div className='flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#017369] bg-[#017369]/10'>
								<Building className='h-6 w-6 text-[#017369]' />
							</div>
						</div>
						<div className='flex-1'>
							<div className='mb-3 flex items-center gap-3'>
								<Badge
									className='border-[#017369]/20 text-[#017369]'
									variant='outline'
								>
									Післявоєнні роки
								</Badge>
							</div>
							<h2 className='mb-4 text-2xl font-semibold text-gray-900'>Відновлення та розвиток</h2>
							<p className='mb-4 text-lg leading-relaxed text-gray-600'>
								Відразу після визволення міста з-під фашистської окупації інститут відновив роботу.
								На двох факультетах стаціонарного відділення – фізико-математичному та
								мовно-літературному – розпочали навчання 179 студентів. Працювало тоді в інституті
								17 штатних викладачів.
							</p>
							<div className='mb-4 rounded-lg bg-blue-50 p-4'>
								<p className='text-gray-700'>
									<strong>1945 рік:</strong> Учительський інститут закінчило 16 студентів – це був
									перший випуск. Через чотири роки контингент студентів зріс до 316 чоловік.
								</p>
							</div>
							<div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
								<div className='rounded-lg bg-[#017369]/5 p-4 text-center'>
									<div className='mb-2 text-2xl font-bold text-[#017369]'>1367</div>
									<div className='text-sm text-gray-600'>стаціонарне відділення (1944-1953)</div>
								</div>
								<div className='rounded-lg bg-[#017369]/5 p-4 text-center'>
									<div className='mb-2 text-2xl font-bold text-[#017369]'>1167</div>
									<div className='text-sm text-gray-600'>заочне відділення (1944-1953)</div>
								</div>
								<div className='rounded-lg bg-[#017369]/5 p-4 text-center'>
									<div className='mb-2 text-2xl font-bold text-[#017369]'>16</div>
									<div className='text-sm text-gray-600'>перших випускників (1945)</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 1953 - Reorganization */}
				<div className='relative'>
					<div className='flex items-start gap-6'>
						<div className='flex-shrink-0'>
							<div className='flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#017369] bg-[#017369]/10'>
								<GraduationCap className='h-6 w-6 text-[#017369]' />
							</div>
						</div>
						<div className='flex-1'>
							<div className='mb-3 flex items-center gap-3'>
								<Badge
									className='border-[#017369]/20 text-[#017369]'
									variant='outline'
								>
									1953 рік
								</Badge>
							</div>
							<h2 className='mb-4 text-2xl font-semibold text-gray-900'>
								Реорганізація в педагогічний інститут
							</h2>
							<p className='text-lg leading-relaxed text-gray-600'>
								Ровенський державний учительський інститут був реорганізований у педагогічний з
								двома факультетами – фізико-математичним і філологічним.
							</p>
						</div>
					</div>
				</div>

				{/* 1992 - Modern era */}
				<div className='relative'>
					<div className='flex items-start gap-6'>
						<div className='flex-shrink-0'>
							<div className='flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#017369] bg-[#017369]/10'>
								<Star className='h-6 w-6 text-[#017369]' />
							</div>
						</div>
						<div className='flex-1'>
							<div className='mb-3 flex items-center gap-3'>
								<Badge
									className='border-[#017369]/20 text-[#017369]'
									variant='outline'
								>
									1992 рік
								</Badge>
							</div>
							<h2 className='mb-4 text-2xl font-semibold text-gray-900'>
								Народження факультету математики та інформатики
							</h2>
							<p className='mb-4 text-lg leading-relaxed text-gray-600'>
								Враховуючи світові тенденції щодо втілення інформаційних технологій у життя
								суспільства, було прийнято рішення про виділення з фізико-математичного факультету
								окремого факультету математики та інформатики.
							</p>
							<div className='mb-4 rounded-lg bg-green-50 p-4'>
								<p className='text-gray-700'>
									<strong>Створені кафедри:</strong> математики з методикою викладання, вищої
									математики та інформатики і прикладної математики.
								</p>
							</div>
							<div className='rounded-lg bg-indigo-50 p-4'>
								<p className='text-gray-700'>
									<strong>2006 рік:</strong> На базі кафедри інформатики та прикладної математики
									створено дві окремі кафедри: інформатики та прикладної математики і
									інформаційно-комунікаційних технологій та методики викладання інформатики.
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Current achievements */}
				<div className='relative'>
					<div className='flex items-start gap-6'>
						<div className='flex-shrink-0'>
							<div className='flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#017369] bg-[#017369]/10'>
								<Trophy className='h-6 w-6 text-[#017369]' />
							</div>
						</div>
						<div className='flex-1'>
							<div className='mb-3 flex items-center gap-3'>
								<Badge
									className='border-[#017369]/20 text-[#017369]'
									variant='outline'
								>
									Сучасність
								</Badge>
							</div>
							<h2 className='mb-4 text-2xl font-semibold text-gray-900'>
								Досягнення та значення факультету
							</h2>
							<p className='mb-6 text-lg leading-relaxed text-gray-600'>
								Враховуючи славну історію фізико-математичного факультету, ми є першим факультетом,
								який розпочав підготовку фахівців у галузі математики, а згодом прикладної
								математики та інформатики на Рівненщині. Всі ВНЗ Рівненщини брали кадри із
								випускників нашого факультету.
							</p>

							{/* Stats grid */}
							<div className='mb-6 grid grid-cols-2 gap-4 md:grid-cols-4'>
								<div className='text-center'>
									<div className='mb-2 text-3xl font-bold text-[#017369]'>6000+</div>
									<div className='text-sm text-gray-600'>випускників за 25 років</div>
								</div>
								<div className='text-center'>
									<div className='mb-2 text-3xl font-bold text-[#017369]'>4</div>
									<div className='text-sm text-gray-600'>випускові кафедри</div>
								</div>
								<div className='text-center'>
									<div className='mb-2 text-3xl font-bold text-[#017369]'>53</div>
									<div className='text-sm text-gray-600'>викладачі</div>
								</div>
								<div className='text-center'>
									<div className='mb-2 text-3xl font-bold text-[#017369]'>39</div>
									<div className='text-sm text-gray-600'>кандидатів наук</div>
								</div>
							</div>

							<div className='rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6'>
								<h3 className='mb-3 text-lg font-semibold text-gray-800'>
									Де працюють наші випускники:
								</h3>
								<div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
									<ul className='space-y-2 text-gray-600'>
										<li className='flex items-start gap-2'>
											<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
											<span>Учителями математики, інформатики, фізики, економіки у школах</span>
										</li>
										<li className='flex items-start gap-2'>
											<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
											<span>Викладачами ліцеїв, гімназій, коледжів, технікумів</span>
										</li>
										<li className='flex items-start gap-2'>
											<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
											<span>Спеціалістами станцій юних техніків та палаців дітей і молоді</span>
										</li>
									</ul>
									<ul className='space-y-2 text-gray-600'>
										<li className='flex items-start gap-2'>
											<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
											<span>Викладачами ВНЗ I-III рівнів акредитації</span>
										</li>
										<li className='flex items-start gap-2'>
											<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
											<span>На адміністративних посадах у системі освіти</span>
										</li>
										<li className='flex items-start gap-2'>
											<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
											<span>В організаціях різних галузей господарства та науки</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Faculty structure */}
				<div className='rounded-2xl border border-gray-100 p-8'>
					<div className='mb-6 flex items-center gap-3'>
						<Users className='h-6 w-6 text-[#017369]' />
						<h2 className='text-2xl font-semibold text-gray-900'>Структура факультету</h2>
					</div>

					{/* 4 випускові кафедри в табах */}
					<div className='mb-8'>
						<h3 className='mb-4 text-lg font-semibold text-gray-800'>4 випускові кафедри:</h3>
						<Tabs
							defaultValue='kiktmvi'
							className='w-full'
						>
							<TabsList className='grid w-full grid-cols-4'>
								<TabsTrigger
									value='kiktmvi'
									className='text-xs'
								>
									Цифрові технології
								</TabsTrigger>
								<TabsTrigger
									value='kitm'
									className='text-xs'
								>
									ІТ та моделювання
								</TabsTrigger>
								<TabsTrigger
									value='kvm'
									className='text-xs'
								>
									Вища математика
								</TabsTrigger>
								<TabsTrigger
									value='kmmv'
									className='text-xs'
								>
									Математика з методикою
								</TabsTrigger>
							</TabsList>
							<TabsContents className='mt-6'>
								{/* Кафедра цифрових технологій та методики навчання інформатики */}
								<TabsContent
									value='kiktmvi'
									className='space-y-4'
								>
									<div className='rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6'>
										<h4 className='mb-4 text-xl font-semibold text-gray-800'>
											Кафедра цифрових технологій та методики навчання інформатики
										</h4>
										<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
											<div className='space-y-3'>
												<h5 className='font-medium text-gray-800'>Керівництво кафедри:</h5>
												<div className='space-y-2 text-sm text-gray-600'>
													<p>
														<strong>Завідувач кафедри:</strong> Павлова Наталія Степанівна, кандидат
														педагогічних наук, доцент
													</p>
													<p>
														<strong>e-mail:</strong> nataliia.pavlova@rshu.edu.ua
													</p>
													<p>
														<strong>Старший лаборант:</strong> Литвак Людмила Петрівна
													</p>
													<p>
														<strong>e-mail:</strong> kiktmvi@rshu.edu.ua
													</p>
												</div>
											</div>
											<div className='space-y-3'>
												<h5 className='font-medium text-gray-800'>Контактна інформація:</h5>
												<div className='space-y-2 text-sm text-gray-600'>
													<p>
														<strong>Адреса:</strong> 33000, м. Рівне, вул Пластова, 31, каб. 205
													</p>
													<p>
														<strong>Веб-сайт:</strong>{' '}
														<a
															href='http://iktmvi.rshu.edu.ua/'
															className='text-[#017369] hover:underline'
															target='_blank'
															rel='noopener noreferrer'
														>
															iktmvi.rshu.edu.ua
														</a>
													</p>
												</div>
											</div>
										</div>
										<div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
											<div className='rounded-lg bg-white p-4 shadow-sm'>
												<h5 className='mb-3 font-medium text-gray-800'>
													Спеціальність 014.09 Середня освіта (Інформатика)
												</h5>
												<div className='space-y-2 text-sm text-gray-600'>
													<p>
														<strong>Бакалавр:</strong> Вчитель інформатики
													</p>
													<p>
														<strong>Магістр:</strong> Вчитель інформатики
													</p>
												</div>
											</div>
											<div className='rounded-lg bg-white p-4 shadow-sm'>
												<h5 className='mb-3 font-medium text-gray-800'>
													Спеціальність 015.39 Професійна освіта (Цифрові технології)
												</h5>
												<div className='space-y-2 text-sm text-gray-600'>
													<p>
														<strong>Бакалавр:</strong> Викладач + Фахівець з ІТ
													</p>
													<p>
														<strong>Магістр:</strong> Викладач + Розробник обчислювальних систем
													</p>
												</div>
											</div>
										</div>
									</div>
								</TabsContent>

								{/* Кафедра інформаційних технологій та моделювання */}
								<TabsContent
									value='kitm'
									className='space-y-4'
								>
									<div className='rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-6'>
										<h4 className='mb-4 text-xl font-semibold text-gray-800'>
											Кафедра інформаційних технологій та моделювання
										</h4>
										<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
											<div className='space-y-3'>
												<h5 className='font-medium text-gray-800'>Керівництво кафедри:</h5>
												<div className='space-y-2 text-sm text-gray-600'>
													<p>
														<strong>Завідувач кафедри:</strong> Мороз Ігор Петрович, кандидат
														фізико-математичних наук, доцент
													</p>
													<p>
														<strong>e-mail:</strong> kipm@rshu.edu.ua
													</p>
												</div>
											</div>
											<div className='space-y-3'>
												<h5 className='font-medium text-gray-800'>Контактна інформація:</h5>
												<div className='space-y-2 text-sm text-gray-600'>
													<p>
														<strong>Адреса:</strong> 33000, м. Рівне, вул Пластова, 31, каб. 110
													</p>
													<p>
														<strong>Веб-сайт:</strong>{' '}
														<Link
															href='https://kitm.rshu.edu.ua/'
															className='text-[#017369] hover:underline'
															target='_blank'
															rel='noopener noreferrer'
														>
															kitm.rshu.edu.ua
														</Link>
													</p>
												</div>
											</div>
										</div>
										<div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
											<div className='rounded-lg bg-white p-4 shadow-sm'>
												<h5 className='mb-3 font-medium text-gray-800'>
													Спеціальність 122 Компʼютерні науки
												</h5>
												<div className='space-y-2 text-sm text-gray-600'>
													<p>
														<strong>Бакалавр:</strong> Фахівець з розробки ПЗ
													</p>
													<p>
														<strong>Магістр:</strong> Розробник обчислювальних систем
													</p>
												</div>
											</div>
											<div className='rounded-lg bg-white p-4 shadow-sm'>
												<h5 className='mb-3 font-medium text-gray-800'>
													Спеціальність 121 Інженерія програмного забезпечення
												</h5>
												<div className='space-y-2 text-sm text-gray-600'>
													<p>
														<strong>Бакалавр:</strong> Фахівець з ІТ та розробки ПЗ
													</p>
												</div>
											</div>
										</div>
									</div>
								</TabsContent>

								{/* Кафедра вищої математики */}
								<TabsContent
									value='kvm'
									className='space-y-4'
								>
									<div className='rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-6'>
										<h4 className='mb-4 text-xl font-semibold text-gray-800'>
											Кафедра вищої математики
										</h4>
										<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
											<div className='space-y-3'>
												<h5 className='font-medium text-gray-800'>Керівництво кафедри:</h5>
												<div className='space-y-2 text-sm text-gray-600'>
													<p>
														<strong>Завідувач кафедри:</strong> Петрівський Ярослав Борисович,
														доктор технічних наук, професор
													</p>
													<p>
														<strong>e-mail:</strong> yaroslav.petrivskyi@rshu.edu.ua
													</p>
												</div>
											</div>
											<div className='space-y-3'>
												<h5 className='font-medium text-gray-800'>Контактна інформація:</h5>
												<div className='space-y-2 text-sm text-gray-600'>
													<p>
														<strong>Старший лаборант:</strong> Хмель Тетяна Олександрівна
													</p>
													<p>
														<strong>e-mail:</strong> kvm@rshu.edu.ua
													</p>
													<p>
														<strong>Адреса:</strong> 33000, м. Рівне, вул Пластова, 31, каб. 310
													</p>
													<p>
														<strong>Веб-сайт:</strong>{' '}
														<Link
															href='http://vmivm.gavrysha.com/'
															className='text-[#017369] hover:underline'
															target='_blank'
															rel='noopener noreferrer'
														>
															vmivm.gavrysha.com
														</Link>
													</p>
												</div>
											</div>
										</div>
									</div>
								</TabsContent>

								{/* Кафедра математики з методикою викладання */}
								<TabsContent
									value='kmmv'
									className='space-y-4'
								>
									<div className='rounded-lg bg-gradient-to-r from-orange-50 to-yellow-50 p-6'>
										<h4 className='mb-4 text-xl font-semibold text-gray-800'>
											Кафедра математики з методикою викладання
										</h4>
										<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
											<div className='space-y-3'>
												<h5 className='font-medium text-gray-800'>Керівництво кафедри:</h5>
												<div className='space-y-2 text-sm text-gray-600'>
													<p>
														<strong>Завідувач кафедри:</strong> Крайчук Олександр Васильович,
														кандидат фізико-математичних наук, доцент
													</p>
													<p>
														<strong>e-mail:</strong> kmmv@rshu.edu.ua
													</p>
												</div>
											</div>
											<div className='space-y-3'>
												<h5 className='font-medium text-gray-800'>Контактна інформація:</h5>
												<div className='space-y-2 text-sm text-gray-600'>
													<p>
														<strong>Старший лаборант:</strong> Цимбалюк Ольга Олександрівна
													</p>
													<p>
														<strong>e-mail:</strong> kmmv@rshu.edu.ua
													</p>
													<p>
														<strong>Адреса:</strong> 33000, м. Рівне, вул. Пластова 31, к.311
													</p>
													<p>
														<strong>Веб-сайт:</strong>{' '}
														<Link
															href='http://vmivm.gavrysha.com/'
															className='text-[#017369] hover:underline'
															target='_blank'
															rel='noopener noreferrer'
														>
															vmivm.gavrysha.com
														</Link>
													</p>
												</div>
											</div>
										</div>
										<div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
											<div className='rounded-lg bg-white p-4 shadow-sm'>
												<h5 className='mb-3 font-medium text-gray-800'>
													Спеціальність 014 Середня освіта (Математика. Інформатика)
												</h5>
												<div className='space-y-2 text-sm text-gray-600'>
													<p>
														<strong>Бакалавр:</strong> Вчитель математики та інформатики
													</p>
												</div>
											</div>
											<div className='rounded-lg bg-white p-4 shadow-sm'>
												<h5 className='mb-3 font-medium text-gray-800'>
													Спеціальність 014 Середня освіта (Математика)
												</h5>
												<div className='space-y-2 text-sm text-gray-600'>
													<p>
														<strong>Магістр:</strong> Вчитель математики
													</p>
												</div>
											</div>
										</div>
									</div>
								</TabsContent>
							</TabsContents>
						</Tabs>
					</div>

					{/* 53 викладачі */}
					<div className='space-y-4'>
						<h3 className='mb-3 text-lg font-semibold text-gray-800'>53 викладачі:</h3>
						<div className='space-y-3'>
							<div className='rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4'>
								<h4 className='mb-2 font-medium text-gray-800'>Відомі вчені та організатори:</h4>
								<ul className='space-y-1 text-sm text-gray-600'>
									<li>• проф. А.О. Сяський</li>
									<li>• проф. А.Я. Бомба</li>
									<li>• проф. Я.Б. Петрівський</li>
									<li>• проф. І.С. Войтович</li>
									<li>• проф. Я.А. Пасічник</li>
								</ul>
							</div>
							<div className='rounded-lg bg-green-50 p-4'>
								<h4 className='mb-2 font-medium text-gray-800'>39 кандидатів наук</h4>
								<p className='text-sm text-gray-600'>
									Ведуть науково-дослідну роботу в галузі комп&apos;ютерного моделювання процесів і
									систем, чисельних методів, інформаційних систем та методики викладання
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Scientific activity */}
				<div className='rounded-2xl border border-gray-100 bg-white p-8'>
					<div className='mb-6 flex items-center gap-3'>
						<BookOpen className='h-6 w-6 text-[#017369]' />
						<h2 className='text-2xl font-semibold text-gray-900'>Наукова діяльність</h2>
					</div>

					<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
						<div className='space-y-4'>
							<div className='flex items-start gap-3'>
								<Award className='mt-1 h-5 w-5 text-[#017369]' />
								<div>
									<p className='font-medium text-gray-800'>Аспірантура (з 2000 року)</p>
									<p className='text-sm text-gray-600'>
										«Математичне моделювання та обчислювальні методи» - підготовка
										науково-педагогічних працівників вищої кваліфікації
									</p>
								</div>
							</div>
							<div className='flex items-start gap-3'>
								<BookOpen className='mt-1 h-5 w-5 text-[#017369]' />
								<div>
									<p className='font-medium text-gray-800'>Наукові публікації</p>
									<p className='text-sm text-gray-600'>
										Збірник «Волинський математичний вісник. Серія: Прикладна математика»,
										монографії, книги та навчальні посібники
									</p>
								</div>
							</div>
							<div className='rounded-lg bg-blue-50 p-4'>
								<p className='text-sm text-gray-700'>
									<strong>Досягнення:</strong> Захищено та представлено до захисту більше 20
									кандидатських та докторських дисертацій
								</p>
							</div>
						</div>

						<div className='space-y-4'>
							<h3 className='text-lg font-semibold text-gray-800'>Конференції та заходи:</h3>
							<ul className='space-y-2 text-gray-600'>
								<li className='flex items-start gap-2'>
									<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
									<span>
										Міжнародна конференція «Наука, освіта, суспільство очима молодих» (щорічно)
									</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
									<span>
										Всеукраїнська конференція «Інформаційні технології в професійній діяльності»
									</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
									<span>
										«Сучасні проблеми математичного моделювання і обчислювальних методів» (2013,
										2015)
									</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
									<span>«Third Conference Mathematics for Life Sciences» (2015)</span>
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* International cooperation */}
				<div className='rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-8'>
					<div className='mb-6 flex items-center gap-3'>
						<Globe className='h-6 w-6 text-[#017369]' />
						<h2 className='text-2xl font-semibold text-gray-900'>Міжнародні зв&apos;язки</h2>
					</div>

					<p className='mb-6 text-lg leading-relaxed text-gray-600'>
						Кафедри факультету підтримують тісні зв&apos;язки з науковими установами України і
						зарубіжжя:
					</p>

					<div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
						<div className='space-y-2'>
							<h3 className='font-semibold text-[#017369]'>Україна</h3>
							<ul className='space-y-1 text-sm text-gray-600'>
								<li>• Інститут кібернетики НАН України ім. В. Глушкова</li>
								<li>• Інститут математики НАН України</li>
								<li>• КНУ ім. Т. Шевченка</li>
								<li>• НТУ &quot;КПІ&quot;</li>
								<li>• ЛНУ ім. І. Франка</li>
								<li>• НПУ ім. М.П. Драгоманова</li>
							</ul>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-[#017369]'>Європа</h3>
							<ul className='space-y-1 text-sm text-gray-600'>
								<li>• Університет Казимира Великого (Бидгощ, Польща)</li>
								<li>• Університет інформатики (Лодзь, Польща)</li>
								<li>• Інститут математики (Любек, Німеччина)</li>
								<li>• Політехніка Мілану (Італія)</li>
								<li>• Другий університет Неаполя (Італія)</li>
							</ul>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-[#017369]'>Росія та СНД</h3>
							<ul className='space-y-1 text-sm text-gray-600'>
								<li>• Московський університет ім. М. Ломоносова</li>
								<li>• Казанський університет</li>
								<li>• Новосибірське відділення РАН</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Student achievements */}
				<div className='rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8'>
					<div className='mb-6 flex items-center gap-3'>
						<Trophy className='h-6 w-6 text-[#017369]' />
						<h2 className='text-2xl font-semibold text-gray-900'>Студентські досягнення</h2>
					</div>

					<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
						<div className='space-y-4'>
							<h3 className='text-lg font-semibold text-gray-800'>Наукова діяльність</h3>
							<ul className='space-y-2 text-gray-600'>
								<li className='flex items-start gap-2'>
									<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
									<span>
										Призові місця у Всеукраїнських олімпіадах з математики, прикладної математики,
										інформатики
									</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
									<span>Співавторство у понад 100 наукових публікаціях</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
									<span>
										Переможці Всеукраїнських конкурсів студентських науково-дослідних проектів
									</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
									<span>Участь у міжнародних та всеукраїнських конференціях</span>
								</li>
							</ul>
							<div className='rounded-lg bg-white p-4'>
								<p className='text-sm text-gray-700'>
									<strong>Приклад успіху (2015-2016):</strong> Студенти А.В. Вознюк та В.А.
									Єремейчук отримали диплом 3-го ступеня на Всеукраїнському конкурсі за проект
									«Автоматизована програмна система проведення інтернет-олімпіад»
								</p>
							</div>
						</div>

						<div className='space-y-4'>
							<h3 className='text-lg font-semibold text-gray-800'>
								Творча та спортивна діяльність
							</h3>
							<ul className='space-y-2 text-gray-600'>
								<li className='flex items-start gap-2'>
									<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
									<span>
										Команди КВН «Аварія» та «П&apos;ятниця-13» – фіналісти української ліги КВН
									</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
									<span>Переможці та призери спартакіад РДГУ</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
									<span>Переможці фестивалів «Студентська весна»</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#017369]'></div>
									<span>Активна участь у ACM чемпіонатах з програмування</span>
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Modern facilities and specializations */}
				<div className='rounded-2xl border border-gray-100 bg-white p-8'>
					<div className='mb-6 flex items-center gap-3'>
						<Building className='h-6 w-6 text-[#017369]' />
						<h2 className='text-2xl font-semibold text-gray-900'>
							Сучасне обладнання та спеціальності
						</h2>
					</div>

					<div className='mb-6'>
						<p className='mb-4 text-lg leading-relaxed text-gray-600'>
							Навчальні лабораторії оснащені сучасною обчислювальною технікою, проекторами та
							мультимедійними дошками, що дозволяє ефективно використовувати новітні освітні
							технології.
						</p>
						<div className='rounded-lg bg-green-50 p-4'>
							<p className='text-gray-700'>
								<strong>Особливість:</strong> Лабораторії є базою для проведення 3 і 4 етапів
								Всеукраїнських олімпіад з інформатики та регіонального етапу ACM чемпіонату з
								програмування (з 2010 року)
							</p>
						</div>
					</div>

					<div className='mt-12 rounded-lg bg-orange-50 p-4'>
						<p className='text-sm text-gray-700'>
							<strong>Ліцензія:</strong> Факультет здійснює освітню діяльність на підставі ліцензії
							серії АВ №636414 за освітньо-кваліфікаційними рівнями «бакалавр», «спеціаліст» та
							«магістр»
						</p>
					</div>
				</div>

				{/* Call to action */}
				<div className='mt-16 rounded-2xl bg-gradient-to-r from-[#017369] to-[#01635b] p-8 text-white'>
					<div className='text-center'>
						<h2 className='mb-4 text-3xl font-semibold'>Станьте частиною нашої історії</h2>
						<p className='mx-auto max-w-2xl text-xl leading-relaxed opacity-90'>
							Приєднуйтесь до понад 6000 випускників, які розпочали свій успішний шлях у світі
							математики та інформаційних технологій саме тут. Разом ми пишемо майбутнє освіти та
							науки!
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HistoryPage
