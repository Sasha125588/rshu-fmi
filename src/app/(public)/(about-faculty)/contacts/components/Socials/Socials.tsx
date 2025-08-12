import { Share2 } from 'lucide-react'
import Link from 'next/link'

import { SocialData } from './constants/data'

export const Socials = () => (
	<div className='rounded-2xl border border-gray-100 bg-white p-8'>
		<div className='mb-6 flex items-center gap-3'>
			<Share2 className='h-6 w-6 text-[#017369]' />
			<h2 className='text-2xl font-semibold text-gray-900'>Соціальні мережі</h2>
		</div>

		<div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
			{SocialData.map(social => {
				const IconComponent = social.image
				return (
					<div
						key={social.title}
						className={`rounded-lg ${social.bgColor} p-6`}
					>
						<div className='mb-4 flex items-center gap-3'>
							<div
								className={`flex h-10 w-10 items-center justify-center rounded-full ${social.iconColor}`}
							>
								<IconComponent className='h-5 w-5 text-white' />
							</div>
							<div>
								<h3 className='font-semibold text-gray-900'>{social.title}</h3>
								<p className='text-sm text-gray-600'>{social.username}</p>
							</div>
						</div>
						<p className='mb-4 text-sm text-gray-600'>{social.description}</p>
						<Link
							href={social.link}
							target='_blank'
							rel='noopener noreferrer'
							className={`inline-flex items-center gap-2 rounded-full ${social.iconColor} px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:scale-105`}
						>
							{social.actionTitle}
						</Link>
					</div>
				)
			})}
		</div>

		<div className='mt-8 rounded-lg bg-violet-50 p-6'>
			<h3 className='mb-3 text-lg font-semibold text-gray-800'>Чому варто слідкувати за нами?</h3>
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
)
