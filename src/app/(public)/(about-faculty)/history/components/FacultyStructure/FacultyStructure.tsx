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

export const FacultyStructure = () => {
	return (
		<div className='rounded-2xl border border-gray-100 p-8'>
			<div className='mb-6 flex items-center gap-3'>
				<Users className='h-6 w-6 text-[#017369]' />
				<h2 className='text-2xl font-semibold text-gray-900'>Структура факультету</h2>
			</div>

			<div className='mb-8'>
				<h3 className='mb-4 text-lg font-semibold text-gray-800'>4 випускові кафедри:</h3>
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
									<h3 className='mb-4 text-xl font-semibold text-gray-800'>{department.name}</h3>
									<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
										<div className='space-y-3'>
											<h5 className='font-medium text-gray-800'>Керівництво кафедри:</h5>
											<div className='space-y-2 text-sm text-gray-600'>
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
											<h5 className='font-medium text-gray-800'>Контактна інформація:</h5>
											<div className='space-y-2 text-sm text-gray-600'>
												<p>
													<strong>Адреса:</strong> {department.contact.address}
												</p>
												{department.contact.website && (
													<p>
														<strong>Веб-сайт:</strong>{' '}
														{department.contact.websiteUrl ? (
															<Link
																href={department.contact.websiteUrl}
																className='text-[#017369] hover:underline'
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
													className='rounded-lg bg-white p-4 shadow-sm'
												>
													<h5 className='mb-3 font-medium text-gray-800'>
														Спеціальність {spec.code} {spec.name}
													</h5>
													<div className='space-y-2 text-sm text-gray-600'>
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
	)
}
