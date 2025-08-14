import { Users } from 'lucide-react'
import Link from 'next/link'

import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger
} from '@/components/animate-ui/radix/tabs'

import { departmentsData } from './constants/data'

export const FacultyStructure = () => (
	<div className='border-border rounded-2xl border p-8'>
		<div className='mb-6 flex items-center gap-3'>
			<Users className='text-green-primary h-6 w-6' />
			<h2 className='text-2xl font-semibold'>Структура факультету</h2>
		</div>

		<div className='mb-8'>
			<h3 className='mb-4 text-lg font-semibold'>4 випускові кафедри:</h3>
			<Tabs
				defaultValue={departmentsData[0].name}
				className='w-full'
			>
				<TabsList className='grid w-full grid-cols-4'>
					{departmentsData.map(department => (
						<TabsTrigger
							key={department.name}
							value={department.name}
							className='text-xs'
						>
							{department.tabName}
						</TabsTrigger>
					))}
				</TabsList>
				<TabsContents className='mt-6'>
					{departmentsData.map(department => (
						<TabsContent
							key={department.name}
							value={department.name}
							className='space-y-4'
						>
							<div className={`rounded-lg bg-gradient-to-r ${department.gradient} p-6`}>
								<h3 className='mb-4 text-xl font-semibold'>{department.name}</h3>
								<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
									<div className='space-y-3'>
										<h5 className='font-medium'>Керівництво кафедри:</h5>
										<div className='text-muted-foreground space-y-2 text-sm'>
											{department.leadership.map((leader, index) => (
												<div key={index}>
													<p>
														<strong>{leader.title}:</strong> {leader.name}
														{leader.position && `, ${leader.position}`}
													</p>
													{leader.email && (
														<p>
															<strong>e-mail:</strong> {leader.email}
														</p>
													)}
												</div>
											))}
										</div>
									</div>
									<div className='space-y-3'>
										<h5 className='font-medium'>Контактна інформація:</h5>
										<div className='text-muted-foreground space-y-2 text-sm'>
											<p>
												<strong>Адреса:</strong> {department.contact.address}
											</p>
											{department.contact.website && (
												<p>
													<strong>Веб-сайт:</strong>{' '}
													{department.contact.websiteUrl ? (
														<Link
															href={department.contact.websiteUrl}
															className='text-green-primary hover:underline'
															target='_blank'
															rel='noopener noreferrer'
														>
															{department.contact.website}
														</Link>
													) : (
														department.contact.website
													)}
												</p>
											)}
										</div>
									</div>
								</div>
								{department.specializations && (
									<div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
										{department.specializations.map((spec, index) => (
											<div
												key={index}
												className='dark:bg-primary/10 rounded-lg bg-white p-4 shadow-sm'
											>
												<h5 className='mb-3 font-medium'>
													Спеціальність {spec.code} {spec.name}
												</h5>
												<div className='text-primary/90 space-y-2 text-sm'>
													{spec.bachelor && (
														<p>
															<strong>Бакалавр:</strong> {spec.bachelor}
														</p>
													)}
													{spec.master && (
														<p>
															<strong>Магістр:</strong> {spec.master}
														</p>
													)}
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						</TabsContent>
					))}
				</TabsContents>
			</Tabs>
		</div>

		<div className='space-y-4'>
			<h3 className='mb-3 text-lg font-semibold'>53 викладачі:</h3>
			<div className='space-y-3'>
				<div className='rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 dark:from-indigo-950 dark:to-fuchsia-950'>
					<h4 className='mb-2 font-medium'>Відомі вчені та організатори:</h4>
					<ul className='text-primary/90 space-y-1 text-sm'>
						<li>• проф. А.О. Сяський</li>
						<li>• проф. А.Я. Бомба</li>
						<li>• проф. Я.Б. Петрівський</li>
						<li>• проф. І.С. Войтович</li>
						<li>• проф. Я.А. Пасічник</li>
					</ul>
				</div>
				<div className='rounded-lg bg-green-50 p-4 dark:bg-amber-950'>
					<h4 className='mb-2 font-medium'>39 кандидатів наук</h4>
					<p className='text-muted-foreground text-sm'>
						Ведуть науково-дослідну роботу в галузі комп&apos;ютерного моделювання процесів і
						систем, чисельних методів, інформаційних систем та методики викладання
					</p>
				</div>
			</div>
		</div>
	</div>
)
