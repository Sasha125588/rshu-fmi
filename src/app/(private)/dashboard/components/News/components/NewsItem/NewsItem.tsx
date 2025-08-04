import { ArrowUpRightIcon, EyeIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { NewsItem as NewsItemProps } from '../../constants/types'

import { ParsedNewsDetails, getNewsDetails } from '@/shared/api/requests/getNewsDetails'

interface Props {
	item: NewsItemProps
	index: number
	isLast: boolean
}

export const NewsItem = ({ item, index, isLast }: Props) => {
	const [details, setDetails] = useState<ParsedNewsDetails | null>(null)
	const [loading, setLoading] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	const fetchDetails = async () => {
		if (loading || details) return

		setLoading(true)
		try {
			const newsDetails = await getNewsDetails(item.link)
			setDetails(newsDetails)
		} catch (error) {
			console.error(`Помилка завантаження опису новини ${index}:`, error)
			setDetails({ description: '' })
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting && !details && !loading) {
					fetchDetails()
				}
			},
			{ threshold: 0.1 }
		)

		if (ref.current) {
			observer.observe(ref.current)
		}

		return () => observer.disconnect()
	}, [details, loading])

	const truncateText = (text: string, maxLength: number) => {
		if (text.length <= maxLength) return text
		return text.slice(0, maxLength).trim() + '...'
	}

	return (
		<div
			ref={ref}
			className='group relative flex min-h-48 items-start gap-6 px-4 py-6 transition-colors duration-200 hover:bg-gray-100/50'
		>
			<div className='flex-shrink-0 text-lg font-medium text-gray-900'>
				{String(index + 1).padStart(2, '0')}
			</div>

			<div className='min-w-0 flex-1 transition-transform duration-200 group-hover:translate-x-1'>
				<div className='mb-2 text-sm font-normal text-gray-500'>{item.tags?.join(' • ')}</div>

				<Link
					href={item.link}
					target='_blank'
					rel='noopener noreferrer'
					className='block'
				>
					<h3 className='mb-3 text-lg leading-tight font-semibold text-gray-900 transition-colors duration-200 group-hover:text-[#017369]'>
						{item.title}
					</h3>
				</Link>

				{!details ? (
					<div className='animate-pulse space-y-2'>
						<div className='h-3 rounded bg-gray-200'></div>
						<div className='h-3 w-4/5 rounded bg-gray-200'></div>
						<div className='h-3 w-3/5 rounded bg-gray-200'></div>
					</div>
				) : (
					<div className='animate-fade-in'>
						{details?.description && details.description !== 'Ошибка загрузки описания' ? (
							<p className='mb-3 text-sm leading-relaxed text-gray-600'>
								{truncateText(details.description, 200)}
							</p>
						) : details.description === 'Ошибка загрузки описания' ? (
							<p className='mb-3 text-sm leading-relaxed text-red-500 italic'>
								Не удалось загрузить описание
							</p>
						) : (
							<p className='mb-3 text-sm leading-relaxed text-gray-500 italic'>
								Описание недоступно
							</p>
						)}
					</div>
				)}

				<div className='flex items-center gap-1 text-sm text-gray-500'>
					<EyeIcon className='h-4 w-4' />
					<span>{item.views.toLocaleString('uk-UA')} переглядів</span>
				</div>
			</div>

			<Link
				href={item.link}
				target='_blank'
				rel='noopener noreferrer'
				className='flex-shrink-0'
			>
				<ArrowUpRightIcon className='h-5 w-5 text-gray-900 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1' />
			</Link>

			{!isLast && <div className='absolute right-0 bottom-0 left-0 h-px bg-gray-200' />}
		</div>
	)
}
