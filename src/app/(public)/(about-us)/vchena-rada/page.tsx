import { Crown, FileText, GraduationCap, UserCheck, Users } from 'lucide-react'
import type { Metadata } from 'next'

import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
	title: 'Вчена рада факультету математики та інформатики',
	description: 'Склад та керівництво Вченої ради факультету математики та інформатики РДГУ'
}

const VchenaRadaPage = () => {
	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			<div className='pb-12'>
				<div className='mb-6 flex items-center gap-3'>
					<Users
						size={20}
						className='text-[#017369]'
					/>
					<Badge
						className='border border-[#017369]/20 text-sm font-normal text-[#017369]'
						variant='outline'
					>
						Управління
					</Badge>
				</div>
				<h1 className='mb-6 text-5xl leading-tight font-semibold text-gray-900'>
					Вчена рада
					<br />
					<span className='text-[#017369]'>факультету</span>
				</h1>
				<p className='max-w-3xl text-xl leading-relaxed text-gray-600'>
					Вчена рада факультету математики та інформатики – це колегіальний орган управління, що
					визначає стратегічні напрямки розвитку факультету та приймає важливі рішення щодо
					навчально-виховної та наукової діяльності.
				</p>
			</div>

			{/* Leadership Section */}
			<div className='space-y-8'>
				{/* Main Leadership */}
				<div className='rounded-2xl bg-gradient-to-r from-[#017369]/5 to-transparent p-8'>
					<div className='mb-6 flex items-center gap-3'>
						<Crown
							size={24}
							className='text-[#017369]'
						/>
						<h2 className='text-2xl font-semibold text-gray-900'>Керівництво Вченої ради</h2>
					</div>

					<div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
						{/* Chairman */}
						<div className='rounded-lg border border-[#017369]/20 bg-white p-6'>
							<div className='mb-3 flex items-center gap-2'>
								<Crown
									size={20}
									className='text-[#017369]'
								/>
								<span className='text-sm font-medium text-[#017369]'>Голова Вченої ради</span>
							</div>
							<h3 className='mb-2 text-lg font-semibold text-gray-900'>Юрій МАКСИМЦЕВ</h3>
							<p className='mb-2 text-sm font-medium text-gray-700'>Декан факультету</p>
							<p className='text-sm text-gray-600'>
								Кандидат фізико-математичних наук, доцент, кафедра фізики, астрономії та методики
								викладання
							</p>
						</div>

						{/* Deputy Chairman */}
						<div className='rounded-lg border border-blue-200 bg-blue-50 p-6'>
							<div className='mb-3 flex items-center gap-2'>
								<UserCheck
									size={20}
									className='text-blue-600'
								/>
								<span className='text-sm font-medium text-blue-600'>Заступник голови</span>
							</div>
							<h3 className='mb-2 text-lg font-semibold text-gray-900'>Микола АНТОНЮК</h3>
							<p className='mb-2 text-sm font-medium text-gray-700'>
								Заступник декана з навчальної роботи
							</p>
							<p className='text-sm text-gray-600'>
								Кандидат педагогічних наук, доцент, кафедра цифрових технологій та методики навчання
								інформатики
							</p>
						</div>

						{/* Secretary */}
						<div className='rounded-lg border border-green-200 bg-green-50 p-6'>
							<div className='mb-3 flex items-center gap-2'>
								<FileText
									size={20}
									className='text-green-600'
								/>
								<span className='text-sm font-medium text-green-600'>Секретар</span>
							</div>
							<h3 className='mb-2 text-lg font-semibold text-gray-900'>Наталія СИНІЦЬКА</h3>
							<p className='mb-2 text-sm font-medium text-gray-700'>Секретар Вченої ради</p>
							<p className='text-sm text-gray-600'>
								Кандидат педагогічних наук, доцент, кафедра математики з методикою викладання
							</p>
						</div>
					</div>
				</div>

				{/* Council Members */}
				<div className='rounded-2xl border border-gray-100 bg-white p-8'>
					<div className='mb-6 flex items-center gap-3'>
						<GraduationCap
							size={24}
							className='text-[#017369]'
						/>
						<h2 className='text-2xl font-semibold text-gray-900'>Члени Вченої ради</h2>
					</div>

					<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
						{/* Member cards */}
						<div className='rounded-lg border border-gray-100 bg-gray-50 p-4'>
							<h3 className='mb-2 font-semibold text-gray-900'>БІЛЕЦЬКИЙ В&apos;ячеслав</h3>
							<p className='mb-1 text-sm font-medium text-gray-700'>
								Заступник декана з виховної роботи
							</p>
							<p className='text-sm text-gray-600'>
								Кандидат педагогічних наук, доцент, кафедра вищої математики, голова НМК факультету
							</p>
						</div>

						<div className='rounded-lg border border-gray-100 bg-gray-50 p-4'>
							<h3 className='mb-2 font-semibold text-gray-900'>ВОЙТОВИЧ Ігор</h3>
							<p className='mb-1 text-sm font-medium text-gray-700'>
								Проректор з навчально-виховної роботи
							</p>
							<p className='text-sm text-gray-600'>Доктор педагогічних наук, професор</p>
						</div>

						<div className='rounded-lg border border-gray-100 bg-gray-50 p-4'>
							<h3 className='mb-2 font-semibold text-gray-900'>ГЕНСІЦЬКА-АНТОНЮК Наталія</h3>
							<p className='mb-1 text-sm font-medium text-gray-700'>Доцент</p>
							<p className='text-sm text-gray-600'>
								Кандидат педагогічних наук, доцент, кафедра математики з методикою викладання
							</p>
						</div>

						<div className='rounded-lg border border-gray-100 bg-gray-50 p-4'>
							<h3 className='mb-2 font-semibold text-gray-900'>ЖАРЧИНСЬКА Анастасія</h3>
							<p className='mb-1 text-sm font-medium text-gray-700'>В.о. профорга факультету</p>
							<p className='text-sm text-gray-600'>Факультет математики та інформатики</p>
						</div>

						<div className='rounded-lg border border-gray-100 bg-gray-50 p-4'>
							<h3 className='mb-2 font-semibold text-gray-900'>КРАЙЧУК Олександр</h3>
							<p className='mb-1 text-sm font-medium text-gray-700'>Завідувач кафедри</p>
							<p className='text-sm text-gray-600'>
								Кандидат фізико-математичних наук, професор, кафедра математики з методикою
								викладання
							</p>
						</div>

						<div className='rounded-lg border border-gray-100 bg-gray-50 p-4'>
							<h3 className='mb-2 font-semibold text-gray-900'>ЛИТВАК Андрій</h3>
							<p className='mb-1 text-sm font-medium text-gray-700'>Завідувач лабораторіями</p>
							<p className='text-sm text-gray-600'>
								Кафедра інформаційних технологій та моделювання
							</p>
						</div>

						<div className='rounded-lg border border-gray-100 bg-gray-50 p-4'>
							<h3 className='mb-2 font-semibold text-gray-900'>МОРОЗ Ігор</h3>
							<p className='mb-1 text-sm font-medium text-gray-700'>Завідувач кафедри</p>
							<p className='text-sm text-gray-600'>
								Кандидат фізико-математичних наук, доцент, кафедра інформаційних технологій та
								моделювання
							</p>
						</div>

						<div className='rounded-lg border border-gray-100 bg-gray-50 p-4'>
							<h3 className='mb-2 font-semibold text-gray-900'>ПАВЕЛКО Ілля</h3>
							<p className='mb-1 text-sm font-medium text-gray-700'>Студдекан факультету</p>
							<p className='text-sm text-gray-600'>Факультет математики та інформатики</p>
						</div>

						<div className='rounded-lg border border-gray-100 bg-gray-50 p-4'>
							<h3 className='mb-2 font-semibold text-gray-900'>ПАВЛОВА Наталія</h3>
							<p className='mb-1 text-sm font-medium text-gray-700'>Завідувач кафедри</p>
							<p className='text-sm text-gray-600'>
								Кандидат педагогічних наук, професор, кафедра цифрових технологій та методики
								навчання інформатики
							</p>
						</div>

						<div className='rounded-lg border border-gray-100 bg-gray-50 p-4'>
							<h3 className='mb-2 font-semibold text-gray-900'>ПЕТРІВСЬКИЙ Борис</h3>
							<p className='mb-1 text-sm font-medium text-gray-700'>Професор</p>
							<p className='text-sm text-gray-600'>
								Кандидат фізико-математичних наук, професор, кафедра вищої математики
							</p>
						</div>

						<div className='rounded-lg border border-gray-100 bg-gray-50 p-4'>
							<h3 className='mb-2 font-semibold text-gray-900'>ПЕТРІВСЬКИЙ Ярослав</h3>
							<p className='mb-1 text-sm font-medium text-gray-700'>Завідувач кафедри</p>
							<p className='text-sm text-gray-600'>
								Доктор технічних наук, професор, кафедра вищої математики
							</p>
						</div>

						<div className='rounded-lg border border-gray-100 bg-gray-50 p-4'>
							<h3 className='mb-2 font-semibold text-gray-900'>ПОЛЮХОВИЧ Наталія</h3>
							<p className='mb-1 text-sm font-medium text-gray-700'>Доцент</p>
							<p className='text-sm text-gray-600'>
								Кандидат педагогічних наук, доцент, кафедра цифрових технологій та методики навчання
								інформатики
							</p>
						</div>

						<div className='rounded-lg border border-gray-100 bg-gray-50 p-4'>
							<h3 className='mb-2 font-semibold text-gray-900'>ПРИСЯЖНЮК Ігор</h3>
							<p className='mb-1 text-sm font-medium text-gray-700'>Доцент</p>
							<p className='text-sm text-gray-600'>
								Кандидат технічних наук, доцент, кафедра вищої математики
							</p>
						</div>

						<div className='rounded-lg border border-gray-100 bg-gray-50 p-4'>
							<h3 className='mb-2 font-semibold text-gray-900'>СЯСЬКИЙ Володимир</h3>
							<p className='mb-1 text-sm font-medium text-gray-700'>Доцент</p>
							<p className='text-sm text-gray-600'>
								Кандидат технічних наук, доцент, кафедра інформаційних технологій та моделювання
							</p>
						</div>

						<div className='rounded-lg border border-gray-100 bg-gray-50 p-4'>
							<h3 className='mb-2 font-semibold text-gray-900'>ШРОЛЬ Тетяна</h3>
							<p className='mb-1 text-sm font-medium text-gray-700'>Голова профбюро факультету</p>
							<p className='text-sm text-gray-600'>
								Кандидат педагогічних наук, доцент, кафедра цифрових технологій та методики навчання
								інформатики
							</p>
						</div>
					</div>
				</div>

				{/* Information section */}
				<div className='rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8'>
					<div className='text-center'>
						<h2 className='mb-4 text-2xl font-semibold text-gray-900'>Діяльність Вченої ради</h2>
						<p className='mx-auto max-w-3xl text-lg leading-relaxed text-gray-600'>
							Вчена рада факультету збирається регулярно для обговорення та прийняття рішень з
							питань навчально-методичної роботи, наукової діяльності, кадрової політики та
							стратегічного розвитку факультету. Рада забезпечує демократичне управління та участь
							усіх учасників освітнього процесу у житті факультету.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default VchenaRadaPage
