import { Shield } from 'lucide-react'
import type { Metadata } from 'next'

import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger
} from '@/components/animate-ui/radix/tabs'
import { Badge } from '@/components/ui/badge'

import { DocumentList } from './components/DocumentList/DocumentList'
import { FACULTY_DOCUMENTS, UNIVERSITY_DOCUMENTS } from './constants/data'

export const metadata: Metadata = {
	title: 'Нормативні документи',
	description: 'Нормативні документи факультету математики та інформатики',
	openGraph: {
		title: 'Нормативні документи факультету математики та інформатики',
		description: 'Нормативні документи факультету математики та інформатики',
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
		url: new URL(
			'/normatyvni-dokumenty',
			process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
		).href,
		type: 'website',
		locale: 'uk_UA'
	}
}

const NormatyvniDokumentyPage = () => {
	return (
		<div className='bg-background min-h-screen w-full'>
			<div className='pb-12'>
				<div className='mb-6 flex items-center gap-3'>
					<Shield className='text-green-primary h-5 w-5' />
					<Badge
						className='border-green-primary/20 text-green-primary border text-sm font-normal'
						variant='outline'
					>
						Нормативна база
					</Badge>
				</div>
				<h1 className='mb-6 text-5xl leading-tight font-semibold'>
					Нормативні документи
					<br />
					<span className='text-green-primary'>факультету && університету</span>
				</h1>
				<p className='text-muted-foreground max-w-3xl text-xl leading-relaxed'>
					Добірка ключових положень, що регламентують організацію освітнього процесу, академічну
					мобільність, інклюзивну освіту, визнання результатів навчання та академічну доброчесність.
				</p>
			</div>

			<Tabs
				defaultValue='faculty'
				className='w-full space-y-6'
			>
				<TabsList className='w-full'>
					<TabsTrigger value='faculty'>Документи факультету</TabsTrigger>
					<TabsTrigger value='university'>Документи університету</TabsTrigger>
				</TabsList>
				<TabsContents>
					<TabsContent value='faculty'>{DocumentList(FACULTY_DOCUMENTS)}</TabsContent>
					<TabsContent value='university'>{DocumentList(UNIVERSITY_DOCUMENTS)}</TabsContent>
				</TabsContents>
			</Tabs>
		</div>
	)
}

export default NormatyvniDokumentyPage
