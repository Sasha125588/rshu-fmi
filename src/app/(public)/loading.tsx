import { NewsItemSkeleton } from './dashboard/components/News/components/NewsItem/NewsItem'

const BecomeAStudentSkeleton = () => {
	return (
		<div className='w-full'>
			<div className='flex w-full justify-between'>
				<div className='w-full'>
					<div>
						{/* Main title skeleton */}
						<div className='space-y-4'>
							<div className='h-[90px] w-full max-w-[600px] animate-pulse rounded-lg bg-gray-200'></div>
							<div className='flex gap-2'>
								<div className='h-[90px] w-full max-w-[400px] animate-pulse rounded-lg bg-gray-200'></div>
								<div className='h-32 w-32 animate-pulse rounded-lg bg-gray-200'></div>
							</div>
						</div>
					</div>
					<div className='flex w-full items-end justify-between pt-40 pr-2'>
						<div className='flex gap-4'>
							{/* Buttons skeleton */}
							<div className='h-12 w-48 animate-pulse rounded-full bg-gray-200'></div>
							<div className='h-12 w-36 animate-pulse rounded-full bg-gray-200'></div>
						</div>
						{/* Description text skeleton */}
						<div className='w-1/3 space-y-2'>
							<div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>
							<div className='h-4 w-4/5 animate-pulse rounded bg-gray-200'></div>
							<div className='h-4 w-3/4 animate-pulse rounded bg-gray-200'></div>
						</div>
					</div>
				</div>
				{/* Main image skeleton */}
				<div className='mt-[-8.8125rem] mr-[-35px]'>
					<div className='h-[600px] w-[600px] animate-pulse rounded-lg bg-gray-200'></div>
				</div>
			</div>
		</div>
	)
}

const AboutUsSkeleton = () => {
	return (
		<div className='pt-28 pb-3'>
			{/* Header skeleton */}
			<div className='mb-6 flex items-center gap-3'>
				<div className='h-5 w-5 animate-pulse rounded bg-gray-200'></div>
				<div className='h-6 w-16 animate-pulse rounded-full bg-gray-200'></div>
			</div>
			<div className='mb-4 h-8 w-96 animate-pulse rounded-lg bg-gray-200'></div>
			<div className='mb-8 space-y-2'>
				<div className='h-4 w-full max-w-2xl animate-pulse rounded bg-gray-200'></div>
				<div className='h-4 w-4/5 max-w-2xl animate-pulse rounded bg-gray-200'></div>
			</div>

			<div className='flex w-full items-baseline justify-between pt-2'>
				{/* Accordion skeleton */}
				<div className='w-full max-w-[500px] space-y-4 pt-8'>
					{Array.from({ length: 5 }).map((_, index) => (
						<div
							key={index}
							className='border-b border-gray-200 pb-4'
						>
							<div className='mb-2 flex items-center gap-4'>
								<div className='h-5 w-5 animate-pulse rounded bg-gray-200'></div>
								<div className='h-6 w-64 animate-pulse rounded bg-gray-200'></div>
							</div>
						</div>
					))}
				</div>

				{/* Description texts skeleton */}
				<div className='flex flex-col gap-4'>
					<div className='w-[400px] space-y-2'>
						<div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>
						<div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>
						<div className='h-4 w-4/5 animate-pulse rounded bg-gray-200'></div>
						<div className='h-4 w-3/4 animate-pulse rounded bg-gray-200'></div>
					</div>
					<div className='w-[420px] space-y-2'>
						<div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>
						<div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>
						<div className='h-4 w-4/5 animate-pulse rounded bg-gray-200'></div>
					</div>
				</div>
			</div>
		</div>
	)
}

const SpecializationsSkeleton = () => {
	return (
		<div className='pt-28 pb-10'>
			<div className='mb-16'>
				{/* Header skeleton */}
				<div className='mb-6 flex items-center gap-3'>
					<div className='h-5 w-5 animate-pulse rounded bg-gray-200'></div>
					<div className='h-6 w-24 animate-pulse rounded-full bg-gray-200'></div>
				</div>
				<div className='mb-4 h-8 w-80 animate-pulse rounded-lg bg-gray-200'></div>
				<div className='space-y-2'>
					<div className='h-4 w-full max-w-2xl animate-pulse rounded bg-gray-200'></div>
					<div className='h-4 w-4/5 max-w-2xl animate-pulse rounded bg-gray-200'></div>
				</div>
			</div>

			{/* Specialization items skeleton */}
			<div className='grid gap-6 md:grid-cols-2 lg:gap-8'>
				{Array.from({ length: 6 }).map((_, index) => (
					<div
						key={index}
						className='overflow-hidden rounded-xl border border-gray-200 bg-white p-6'
					>
						<div className='space-y-4'>
							<div className='flex items-start justify-between'>
								<div className='flex items-center gap-3'>
									<div className='h-10 w-10 animate-pulse rounded-lg bg-gray-200'></div>
								</div>
								<div className='h-6 w-16 animate-pulse rounded-full bg-gray-200'></div>
							</div>

							<div className='h-6 w-4/5 animate-pulse rounded bg-gray-200'></div>

							<div className='space-y-2'>
								<div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>
								<div className='h-4 w-4/5 animate-pulse rounded bg-gray-200'></div>
								<div className='h-4 w-3/4 animate-pulse rounded bg-gray-200'></div>
							</div>

							<div className='flex flex-wrap gap-1.5'>
								{Array.from({ length: 3 }).map((_, tagIndex) => (
									<div
										key={tagIndex}
										className='h-6 w-20 animate-pulse rounded-md bg-gray-200'
									></div>
								))}
							</div>

							<div className='flex items-center justify-between pt-2'>
								<div className='h-6 w-32 animate-pulse rounded bg-gray-200'></div>
								<div className='h-4 w-16 animate-pulse rounded bg-gray-200'></div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

const NewsSkeleton = () => {
	return (
		<div className='pt-28 pb-10'>
			{/* Header skeleton */}
			<div className='mb-12'>
				<div className='flex items-center gap-3'>
					<div className='h-5 w-5 animate-pulse rounded bg-gray-200'></div>
					<div className='h-6 w-28 animate-pulse rounded-full bg-gray-200'></div>
				</div>
				<div className='mt-6 h-8 w-80 animate-pulse rounded-lg bg-gray-200'></div>
				<div className='mt-2 space-y-2'>
					<div className='h-4 w-96 animate-pulse rounded bg-gray-200'></div>
				</div>
			</div>

			{/* Pagination skeleton */}
			<div className='mb-4 flex justify-center'>
				<div className='h-10 w-64 animate-pulse rounded bg-gray-200'></div>
			</div>

			{/* News items skeleton */}
			<div className='space-y-0'>
				{Array.from({ length: 10 }).map((_, index) => (
					<NewsItemSkeleton
						key={`skeleton-${index}`}
						isLast={index === 9}
					/>
				))}
			</div>

			{/* Show all news button skeleton */}
			<div className='mt-12 flex justify-center'>
				<div className='h-12 w-48 animate-pulse rounded-full bg-gray-200'></div>
			</div>
		</div>
	)
}

const DashboardLoading = () => {
	return (
		<>
			<BecomeAStudentSkeleton />
			<div className='ml-[-55px] border-b border-gray-200' />
			<AboutUsSkeleton />
			<div className='mr-[-35px] ml-[-55px] border-b border-gray-200' />
			<SpecializationsSkeleton />
			<div className='mr-[-35px] ml-[-55px] border-b border-gray-200' />
			<NewsSkeleton />
			<div className='mr-[-35px] ml-[-55px] border-b border-gray-200' />
		</>
	)
}

export default DashboardLoading
