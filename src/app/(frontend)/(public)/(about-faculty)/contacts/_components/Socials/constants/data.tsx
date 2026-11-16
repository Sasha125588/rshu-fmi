import { FacebookIcon, InstagramIcon, TiktokIcon } from '@/public/images/components'
import { FACULTY_SOCIAL_URLS } from '@/shared/constants/socials'

export const SocialData = [
  {
    title: 'Instagram',
    username: '@fmi_rshu',
    description: 'Фото з життя університету, події та досягнення студентів',
    image: InstagramIcon,
    actionTitle: 'Підписатися',
    link: FACULTY_SOCIAL_URLS.instagram,
  },
  {
    title: 'TikTok',
    username: '@fmi_rshu',
    description: 'Короткі відео про студентське життя та навчальний процес',
    image: TiktokIcon,
    actionTitle: 'Стежити',
    link: FACULTY_SOCIAL_URLS.tiktok,
  },
  {
    title: 'Facebook',
    username: 'Факультет математики та інформатики РДГУ',
    description: 'Офіційні новини, оголошення та анонси подій університету',
    image: FacebookIcon,
    actionTitle: 'Слідкувати',
    link: FACULTY_SOCIAL_URLS.facebook,
  },
]
