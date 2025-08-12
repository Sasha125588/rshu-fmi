import { Crown, GraduationCap, Users } from 'lucide-react'
import type { Metadata } from 'next'

import { Badge } from '@/components/ui/badge'

import { academicCouncilData, roleConfig } from './constants/data'

export const metadata: Metadata = {
	title: 'Вчена рада факультету математики та інформатики',
	description: 'Склад та керівництво Вченої ради факультету математики та інформатики РДГУ',
	openGraph: {
		title: 'Вчена рада факультету математики та інформатики',
		description: 'Склад та керівництво Вченої ради факультету математики та інформатики РДГУ',
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
		url: new URL('/vchena-rada', process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000').href,
		type: 'website',
		locale: 'uk_UA'
	}
}

const VchenaRadaPage = () => (
	<div className='min-h-screen'>
		{/* Hero Section */}
		<div className='pb-12'>
			<div className='mb-6 flex items-center gap-3'>
				<Users
					size={20}
					className='text-green-primary'
				/>
				<Badge
					className='border-green-primary/20 text-green-primary border text-sm font-normal'
					variant='outline'
				>
					Управління
				</Badge>
			</div>
			<h1 className='mb-6 text-5xl leading-tight font-semibold'>
				Вчена рада
				<br />
				<span className='text-green-primary'>факультету</span>
			</h1>
			<p className='text-muted-foreground max-w-3xl text-xl leading-relaxed'>
				Вчена рада факультету математики та інформатики – це колегіальний орган управління, що
				визначає стратегічні напрямки розвитку факультету та приймає важливі рішення щодо
				навчально-виховної та наукової діяльності.
			</p>
		</div>

		{/* Leadership Section */}
		<div className='space-y-8'>
			{/* Main Leadership */}
			<div className='from-green-primary/5 rounded-2xl bg-gradient-to-r to-transparent p-8'>
				<div className='mb-6 flex items-center gap-3'>
					<Crown
						size={24}
						className='text-green-primary'
					/>
					<p className='text-accent-foreground text-2xl font-semibold'>Керівництво Вченої ради</p>
				</div>

				<div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
					{academicCouncilData.leadership.map(leader => {
						const config = roleConfig[leader.role]
						const IconComponent = config.icon

						return (
							<div
								key={leader.role}
								className={`rounded-lg border ${config.containerClass} p-6`}
							>
								<div className='mb-3 flex items-center gap-2'>
									<IconComponent
										size={20}
										className={config.iconClass}
									/>
									<span className={`text-sm font-medium ${config.iconClass}`}>{config.label}</span>
								</div>
								<h3 className='text-accent-foreground mb-2 text-lg font-semibold'>{leader.name}</h3>
								<p className='text-muted-foreground mb-2 text-sm font-medium'>{leader.position}</p>
								<p className='text-muted-foreground text-sm'>{leader.description}</p>
							</div>
						)
					})}
				</div>
			</div>

			{/* Council Members */}
			<div className='bg-background rounded-2xl border border-zinc-200 p-8 dark:border-zinc-800'>
				<div className='mb-6 flex items-center gap-3'>
					<GraduationCap
						size={24}
						className='text-[#017369]'
					/>
					<p className='text-2xl font-semibold'>Члени Вченої ради</p>
				</div>

				<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
					{academicCouncilData.members.map((member, index) => (
						<div
							key={index}
							className='rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-zinc-700 dark:bg-zinc-800'
						>
							<h3 className='text-accent-foreground mb-2 font-semibold'>{member.name}</h3>
							<p className='text-muted-foreground mb-1 text-sm font-medium'>{member.position}</p>
							<p className='text-sm text-zinc-500'>{member.description}</p>
						</div>
					))}
				</div>
			</div>

			{/* Information section */}
			<div className='rounded-2xl bg-gradient-to-br from-green-100 to-indigo-100 p-8 dark:from-green-900 dark:to-indigo-900'>
				<div className='text-center'>
					<h2 className='mb-4 text-2xl font-semibold'>Діяльність Вченої ради</h2>
					<p className='text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed'>
						Вчена рада факультету збирається регулярно для обговорення та прийняття рішень з питань
						навчально-методичної роботи, наукової діяльності, кадрової політики та стратегічного
						розвитку факультету. Рада забезпечує демократичне управління та участь усіх учасників
						освітнього процесу у житті факультету.
					</p>
				</div>
			</div>
		</div>
	</div>
)

export default VchenaRadaPage
