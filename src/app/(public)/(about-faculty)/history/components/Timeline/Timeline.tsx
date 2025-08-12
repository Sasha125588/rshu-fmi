import { Building, Calendar, GraduationCap, Star, Trophy } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

export const Timeline = () => (
	<div className='space-y-16'>
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
					Факультет математики та інформатики є правонаступником фізико-математичного факультету,
					який нерозривно пов&apos;язаний з початком функціонування на Ровенщині першого
					найстарішого вищого навчального закладу – Учительського інституту, відкритого у березні
					1940 року.
				</p>
				<div className='rounded-lg bg-gray-50 p-4'>
					<p className='text-gray-700'>
						<strong>3 факультети:</strong> історичний, фізико-математичний і мовно-літературний.
						Навчальні плани були розраховані на підготовку протягом двох років учителів для нової
						радянської школи. У зв&apos;язку з Другою світовою війною навчання в інституті було
						перервано.
					</p>
				</div>
			</div>
		</div>

		<div className=''>
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
						Відразу після визволення міста з-під фашистської окупації інститут відновив роботу. На
						двох факультетах стаціонарного відділення – фізико-математичному та мовно-літературному
						– розпочали навчання 179 студентів. Працювало тоді в інституті 17 штатних викладачів.
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
						Ровенський державний учительський інститут був реорганізований у педагогічний з двома
						факультетами – фізико-математичним і філологічним.
					</p>
				</div>
			</div>
		</div>

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
						Враховуючи світові тенденції щодо втілення інформаційних технологій у життя суспільства,
						було прийнято рішення про виділення з фізико-математичного факультету окремого
						факультету математики та інформатики.
					</p>
					<div className='mb-4 rounded-lg bg-green-50 p-4'>
						<p className='text-gray-700'>
							<strong>Створені кафедри:</strong> математики з методикою викладання, вищої математики
							та інформатики і прикладної математики.
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
						Враховуючи славну історію фізико-математичного факультету, ми є першим факультетом, який
						розпочав підготовку фахівців у галузі математики, а згодом прикладної математики та
						інформатики на Рівненщині. Всі ВНЗ Рівненщини брали кадри із випускників нашого
						факультету.
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
	</div>
)
