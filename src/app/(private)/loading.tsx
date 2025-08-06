const DashboardLoading = () => {
	return (
		<div className='flex min-h-screen items-center justify-center bg-gradient-to-br'>
			<div className='text-center'>
				<div className='relative mx-auto mb-8 h-16 w-16'>
					<div className='absolute inset-0 rounded-full border-4 border-gray-200'></div>
					<div className='absolute inset-0 animate-spin rounded-full border-4 border-[#017369] border-t-transparent'></div>
				</div>

				<div className='space-y-2'>
					<h2 className='text-xl font-semibold text-gray-800'>Завантажуємо контент</h2>
					<p className='text-sm text-gray-600'>Зачекайте, будь ласка...</p>
				</div>

				<div className='mt-6 flex justify-center space-x-1'>
					<div className='h-2 w-2 animate-bounce rounded-full bg-[#017369] [animation-delay:-0.3s]'></div>
					<div className='h-2 w-2 animate-bounce rounded-full bg-[#017369] [animation-delay:-0.15s]'></div>
					<div className='h-2 w-2 animate-bounce rounded-full bg-[#017369]'></div>
				</div>
			</div>
		</div>
	)
}

export default DashboardLoading
