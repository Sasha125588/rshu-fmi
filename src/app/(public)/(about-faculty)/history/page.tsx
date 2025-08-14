import { Award, BookOpen, Building, Clock, Globe, Trophy } from 'lucide-react'
import type { Metadata } from 'next'

import { Badge } from '@/components/ui/badge'

import { FacultyStructure } from './components/FacultyStructure/FacultyStructure'
import { Timeline } from './components/Timeline/Timeline'

export const metadata: Metadata = {
	title: 'Історія факультету математики та інформатики',
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

const HistoryPage = () => (
	<div className='bg-background min-h-screen'>
		{/* Hero Section */}
		<div className='pb-12'>
			<div className='mb-6 flex items-center gap-3'>
				<Clock className='text-green-primary h-5 w-5' />
				<Badge
					className='border-green-primary/20 text-green-primary text-sm font-normal'
					variant='outline'
				>
					Історія факультету
				</Badge>
			</div>
			<h1 className='mb-6 text-5xl leading-tight font-semibold'>
				Історія факультету
				<br />
				<span className='text-green-primary'>математики та інформатики</span>
			</h1>
			<p className='text-muted-foreground max-w-3xl text-xl leading-relaxed'>
				Понад 80 років досвіду у підготовці висококваліфікованих математиків, програмістів та
				педагогів. Від першого Учительського інституту до сучасного факультету інноваційних
				технологій.
			</p>
		</div>

		{/* Timeline Section */}
		<div className='space-y-16'>
			<Timeline />

			<FacultyStructure />

			{/* Scientific activity */}
			<div className='border-border rounded-2xl border p-8'>
				<div className='mb-6 flex items-center gap-3'>
					<BookOpen className='text-green-primary h-6 w-6' />
					<h2 className='text-2xl font-semibold'>Наукова діяльність</h2>
				</div>

				<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
					<div className='space-y-4'>
						<div className='flex items-start gap-3'>
							<Award className='text-green-primary mt-1 h-5 w-5' />
							<div>
								<p className='font-medium'>Аспірантура (з 2000 року)</p>
								<p className='text-muted-foreground text-sm'>
									«Математичне моделювання та обчислювальні методи» - підготовка
									науково-педагогічних працівників вищої кваліфікації
								</p>
							</div>
						</div>
						<div className='flex items-start gap-3'>
							<BookOpen className='text-green-primary mt-1 h-5 w-5' />
							<div>
								<p className='font-medium'>Наукові публікації</p>
								<p className='text-muted-foreground text-sm'>
									Збірник «Волинський математичний вісник. Серія: Прикладна математика», монографії,
									книги та навчальні посібники
								</p>
							</div>
						</div>
						<div className='rounded-lg bg-blue-50 p-4 dark:bg-green-950'>
							<p className='text-primary/90 text-sm'>
								<strong>Досягнення:</strong> Захищено та представлено до захисту більше 20
								кандидатських та докторських дисертацій
							</p>
						</div>
					</div>

					<div className='space-y-4'>
						<h3 className='text-lg font-semibold'>Конференції та заходи:</h3>
						<ul className='text-muted-foreground space-y-2'>
							<li className='flex items-start gap-2'>
								<div className='bg-green-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full'></div>
								<span>
									Міжнародна конференція «Наука, освіта, суспільство очима молодих» (щорічно)
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<div className='bg-green-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full'></div>
								<span>
									Всеукраїнська конференція «Інформаційні технології в професійній діяльності»
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<div className='bg-green-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full'></div>
								<span>
									«Сучасні проблеми математичного моделювання і обчислювальних методів» (2013, 2015)
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<div className='bg-green-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full'></div>
								<span>«Third Conference Mathematics for Life Sciences» (2015)</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* International cooperation */}
			<div className='rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-8 dark:from-zinc-950 dark:to-emerald-950'>
				<div className='mb-6 flex items-center gap-3'>
					<Globe className='text-green-primary h-6 w-6' />
					<h2 className='text-2xl font-semibold'>Міжнародні зв&apos;язки</h2>
				</div>

				<p className='text-muted-foreground mb-6 text-lg leading-relaxed'>
					Кафедри факультету підтримують тісні зв&apos;язки з науковими установами України і
					зарубіжжя:
				</p>

				<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
					<div className='space-y-2'>
						<h3 className='text-green-primary font-semibold'>Україна</h3>
						<ul className='text-muted-foreground space-y-1 text-sm'>
							<li>• Інститут кібернетики НАН України ім. В. Глушкова</li>
							<li>• Інститут математики НАН України</li>
							<li>• КНУ ім. Т. Шевченка</li>
							<li>• НТУ &quot;КПІ&quot;</li>
							<li>• ЛНУ ім. І. Франка</li>
							<li>• НПУ ім. М.П. Драгоманова</li>
						</ul>
					</div>
					<div className='space-y-2'>
						<h3 className='text-green-primary font-semibold'>Європа</h3>
						<ul className='text-muted-foreground space-y-1 text-sm'>
							<li>• Університет Казимира Великого (Бидгощ, Польща)</li>
							<li>• Університет інформатики (Лодзь, Польща)</li>
							<li>• Інститут математики (Любек, Німеччина)</li>
							<li>• Політехніка Мілану (Італія)</li>
							<li>• Другий університет Неаполя (Італія)</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Student achievements */}
			<div className='rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 dark:from-blue-950 dark:to-indigo-950'>
				<div className='mb-6 flex items-center gap-3'>
					<Trophy className='text-green-primary h-6 w-6' />
					<h2 className='text-2xl font-semibold'>Студентські досягнення</h2>
				</div>

				<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
					<div className='space-y-4'>
						<h3 className='text-lg font-semibold'>Наукова діяльність</h3>
						<ul className='text-muted-foreground space-y-2'>
							<li className='flex items-start gap-2'>
								<div className='bg-green-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full'></div>
								<span>
									Призові місця у Всеукраїнських олімпіадах з математики, прикладної математики,
									інформатики
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<div className='bg-green-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full'></div>
								<span>Співавторство у понад 100 наукових публікаціях</span>
							</li>
							<li className='flex items-start gap-2'>
								<div className='bg-green-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full'></div>
								<span>
									Переможці Всеукраїнських конкурсів студентських науково-дослідних проектів
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<div className='bg-green-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full'></div>
								<span>Участь у міжнародних та всеукраїнських конференціях</span>
							</li>
						</ul>
						<div className='dark:bg-primary/10 rounded-lg bg-white p-4'>
							<p className='text-primary/90 text-sm'>
								<strong>Приклад успіху (2015-2016):</strong> Студенти А.В. Вознюк та В.А. Єремейчук
								отримали диплом 3-го ступеня на Всеукраїнському конкурсі за проект «Автоматизована
								програмна система проведення інтернет-олімпіад»
							</p>
						</div>
					</div>

					<div className='space-y-4'>
						<h3 className='text-lg font-semibold'>Творча та спортивна діяльність</h3>
						<ul className='text-muted-foreground space-y-2'>
							<li className='flex items-start gap-2'>
								<div className='bg-green-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full'></div>
								<span>
									Команди КВН «Аварія» та «П&apos;ятниця-13» – фіналісти української ліги КВН
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<div className='bg-green-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full'></div>
								<span>Переможці та призери спартакіад РДГУ</span>
							</li>
							<li className='flex items-start gap-2'>
								<div className='bg-green-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full'></div>
								<span>Переможці фестивалів «Студентська весна»</span>
							</li>
							<li className='flex items-start gap-2'>
								<div className='bg-green-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full'></div>
								<span>Активна участь у ACM чемпіонатах з програмування</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Modern facilities and specializations */}
			<div className='border-border rounded-2xl border p-8'>
				<div className='mb-6 flex items-center gap-3'>
					<Building className='text-green-primary h-6 w-6' />
					<h2 className='text-2xl font-semibold'>Сучасне обладнання та спеціальності</h2>
				</div>

				<div className='mb-6'>
					<p className='text-muted-foreground mb-4 text-lg leading-relaxed'>
						Навчальні лабораторії оснащені сучасною обчислювальною технікою, проекторами та
						мультимедійними дошками, що дозволяє ефективно використовувати новітні освітні
						технології.
					</p>
					<div className='rounded-lg bg-green-50 p-4 dark:bg-violet-950/70'>
						<p className='text-primary/90'>
							<strong>Особливість:</strong> Лабораторії є базою для проведення 3 і 4 етапів
							Всеукраїнських олімпіад з інформатики та регіонального етапу ACM чемпіонату з
							програмування (з 2010 року)
						</p>
					</div>
				</div>
			</div>
			<div className='rounded-lg bg-orange-50 p-4 dark:bg-amber-950'>
				<p className='text-primary/90 text-sm'>
					<strong>Ліцензія:</strong> Факультет здійснює освітню діяльність на підставі ліцензії
					серії АВ №636414 за освітньо-кваліфікаційними рівнями «бакалавр», «спеціаліст» та
					«магістр»
				</p>
			</div>

			{/* Call to action */}
			<div className='from-green-primary to-green-secondary rounded-2xl bg-gradient-to-r p-8 text-white dark:from-green-950 dark:to-sky-950'>
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

export default HistoryPage
