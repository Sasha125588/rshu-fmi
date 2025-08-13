import { Calculator, GraduationCap } from 'lucide-react'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/animate-ui/radix/accordion'
import { Badge } from '@/components/ui/badge'

import { STUDY_COSTS_DATA, STUDY_FORMS_DATA } from './constants/data'
import { formatCurrency } from './helpers/formatCurrency'

export default function TuitionCostsPage() {
	return (
		<div>
			<div className='mb-6 flex items-center gap-3'>
				<Calculator className='text-green-primary h-5 w-5' />
				<Badge
					className='border-green-primary/20 text-green-primary border text-sm font-normal'
					variant='outline'
				>
					Вартість навчання
				</Badge>
			</div>

			<h2 className='mb-4 text-3xl font-semibold'>Вартість навчання на 2025 рік</h2>
			<p className='text-muted-foreground mb-8 max-w-2xl text-lg'>
				Актуальна вартість навчання за освітніми програмами на 2025 навчальний рік
			</p>

			<div className='space-y-6'>
				{STUDY_FORMS_DATA.map(item => {
					const [firstCost, secondCost] = item.costIdx

					return (
						<Accordion
							key={item.title}
							type='single'
							collapsible
							className='w-full'
						>
							<AccordionItem
								value={item.title}
								className='border-none!'
							>
								<AccordionTrigger className='bg-green-primary/5 border-green-primary/20 hover:bg-green-primary/10 rounded-lg border p-4 transition-colors'>
									<div className='flex w-full items-center justify-between'>
										<div className='flex items-center gap-3'>
											<GraduationCap className='text-green-primary h-5 w-5' />
											<h3 className='text-lg font-semibold'>{item.title}</h3>
										</div>
									</div>
								</AccordionTrigger>
								<AccordionContent className='pt-4'>
									<div className='overflow-x-auto'>
										<div className='border-border bg-card min-w-full rounded-xl border shadow-sm'>
											<div className='overflow-hidden'>
												<table className='w-full'>
													<thead className='bg-accent/5 border-border border-b'>
														<tr>
															<th className='text-foreground px-6 py-4 text-left text-sm font-semibold'>
																Код
															</th>
															<th className='text-foreground px-6 py-4 text-left text-sm font-semibold'>
																Освітня програма
															</th>
															<th className='text-foreground px-6 py-4 text-center text-sm font-semibold'>
																За навчальний рік
															</th>
															<th className='text-foreground px-6 py-4 text-center text-sm font-semibold'>
																Повний термін навчання
																<br />
																<span className='text-muted-foreground text-xs font-normal'>
																	{item.title.includes('Бакалавр')
																		? '3 роки 10 міс.'
																		: '1 рік 4 міс.'}
																</span>
															</th>
														</tr>
													</thead>
													<tbody className='divide-border divide-y'>
														{STUDY_COSTS_DATA.map((item, index) => (
															<tr
																key={item.id}
																className={`hover:bg-accent/5 transition-colors duration-200 ${
																	index % 2 === 0 ? 'bg-background' : 'bg-violet-50/30'
																}`}
															>
																<td className='px-6 py-4'>
																	<Badge
																		variant='outline'
																		className='bg-green-primary/10 border-green-primary/30 text-green-primary font-mono text-xs'
																	>
																		{item.id}
																	</Badge>
																</td>
																<td className='px-6 py-4'>
																	<div className='max-w-xs'>
																		<p className='text-foreground font-medium'>
																			{item.programName}
																		</p>
																	</div>
																</td>
																<td className='px-6 py-4 text-center'>
																	<span className='text-foreground font-mono text-sm'>
																		{formatCurrency(item.values[firstCost])}
																	</span>
																</td>
																<td className='px-6 py-4 text-center'>
																	<span className='text-foreground font-mono text-sm'>
																		{formatCurrency(item.values[secondCost])}
																	</span>
																</td>
															</tr>
														))}
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					)
				})}
			</div>

			<div className='mt-6 rounded-lg border border-orange-100 bg-orange-50 p-4'>
				<div className='flex items-start gap-3'>
					<GraduationCap className='text-green-primary mt-0.5 h-5 w-5' />
					<div className='text-muted-foreground text-sm'>
						<p className='text-foreground mb-1 font-medium'>Примітка:</p>
						<p>
							Вартість навчання вказана в гривнях. Деякі програми можуть мати різну вартість залежно
							від форми навчання та інших факторів. Для отримання детальної інформації звертайтеся
							до приймальної комісії.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
