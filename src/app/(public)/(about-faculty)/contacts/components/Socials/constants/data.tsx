import { FacebookIcon } from '@/public/images/components/FacebookIcon'
import { InstagramIcon } from '@/public/images/components/InstagramIcon'
import { TiktokIcon } from '@/public/images/components/TiktokIcon'

export interface Social {
	title: string
	username: string
	description: string
	image: React.ComponentType<{ className?: string }>
	actionTitle: string
	link: string
	bgColor: string
	iconColor: string
}

export const SocialData: Social[] = [
	{
		title: 'Instagram',
		username: '@fmi_rshu',
		description: 'Фото з життя університету, події та досягнення студентів',
		image: InstagramIcon,
		actionTitle: 'Підписатися',
		link: 'https://www.instagram.com/fmi_rshu/',
		bgColor: 'bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950 dark:to-purple-950',
		iconColor: 'bg-gradient-to-br from-pink-500 to-purple-600'
	},
	{
		title: 'TikTok',
		username: '@fmi_rshu',
		description: 'Короткі відео про студентське життя та навчальний процес',
		image: TiktokIcon,
		actionTitle: 'Стежити',
		link: 'https://www.tiktok.com/@fmi_rshu',
		bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950/50 dark:to-gray-800',
		iconColor: 'bg-black'
	},
	{
		title: 'Facebook',
		username: 'Факультет математики та інформатики РДГУ',
		description: 'Офіційні новини, оголошення та анонси подій університету',
		image: FacebookIcon,
		actionTitle: 'Слідкувати',
		link: 'https://www.facebook.com/groups/1748613002125956/',
		bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950',
		iconColor: 'bg-blue-600'
	}
]
