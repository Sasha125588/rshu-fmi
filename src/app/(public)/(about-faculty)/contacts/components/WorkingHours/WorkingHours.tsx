import { Clock } from 'lucide-react'

export const WorkingHours = () => {
	return (
		<div className='rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8'>
			<div className='mb-6 flex items-center gap-3'>
				<Clock className='h-6 w-6 text-[#017369]' />
				<h2 className='text-2xl font-semibold text-gray-900'>Графік роботи</h2>
			</div>

			<div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
				<div className='rounded-lg bg-white p-4'>
					<h3 className='mb-3 font-semibold text-gray-800'>Деканат</h3>
					<div className='space-y-2 text-sm text-gray-600'>
						<div className='flex justify-between'>
							<span>Понеділок - П&apos;ятниця:</span>
							<span className='font-medium'>8:00 - 17:00</span>
						</div>
						<div className='flex justify-between'>
							<span>Обідня перерва:</span>
							<span className='font-medium'>12:00 - 13:00</span>
						</div>
						<div className='flex justify-between'>
							<span>Вихідні:</span>
							<span className='font-medium'>Субота, Неділя</span>
						</div>
					</div>
				</div>

				<div className='rounded-lg bg-white p-4'>
					<h3 className='mb-3 font-semibold text-gray-800'>Приймальна комісія</h3>
					<div className='space-y-3 text-sm text-gray-600'>
						<div className='flex justify-between'>
							<span>Понеділок-п&apos;ятниця:</span>
							<span className='font-medium'>9:00-17:00 год.</span>
						</div>

						<div className='space-y-2'>
							<div className='text-xs font-medium text-gray-500'>
								В окремі дні робота подовжується до 18:00 год:
							</div>
							<div className='space-y-1 pl-3 text-xs'>
								<div>
									<span className='font-medium'>10.07, 25.07, 01.08, 09.08</span> – для працівників
									відбіркової комісії № 1;
								</div>
								<div>
									<span className='font-medium'>06.08, 25.08, 28.08, 01.09</span> – для працівників
									відбіркової комісії № 2;
								</div>
								<div>
									<span className='font-medium'>15.09, 19.09, 29.09, 06.10</span> – для працівників
									відбіркової комісії № 4.
								</div>
							</div>
						</div>

						<div className='flex justify-between'>
							<span>Субота:</span>
							<span className='font-medium'>01.07-31.08.2025 з 9:00 до 13:00 год.</span>
						</div>

						<div className='flex justify-between'>
							<span>Обідня перерва:</span>
							<span className='font-medium'>13:00-14:00 год.</span>
						</div>

						<div className='flex justify-between'>
							<span>Вихідні:</span>
							<span className='font-medium'>Неділя</span>
						</div>

						<div className='mt-3 rounded border border-yellow-200 bg-yellow-50 p-2 text-xs text-gray-600'>
							<strong>Примітка:</strong> Порядок роботи Приймальної комісії може бути змінений
							відповідно до прийнятого нею рішення.
						</div>
					</div>
				</div>

				<div className='rounded-lg bg-white p-4'>
					<h3 className='mb-3 font-semibold text-gray-800'>Консультації</h3>
					<div className='space-y-2 text-sm text-gray-600'>
						<div className='flex justify-between'>
							<span>Вівторок, Четвер:</span>
							<span className='font-medium'>14:00 - 16:00</span>
						</div>
						<div className='flex justify-between'>
							<span>За домовленістю:</span>
							<span className='font-medium'>Інший час</span>
						</div>
						<p className='mt-2 text-xs text-gray-500'>Попередньо телефонуйте або пишіть</p>
					</div>
				</div>
			</div>
		</div>
	)
}
