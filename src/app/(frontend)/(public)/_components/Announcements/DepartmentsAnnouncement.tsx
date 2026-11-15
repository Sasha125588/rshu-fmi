import { Announcement } from './Announcement'
import { LOCAL_STORAGE } from '@/shared/constants/localstorage'

export const DepartmentsAnnouncement = () => (
  <Announcement
    href="/departments/kitm"
    sectionPath="/departments"
    title="Сторінки кафедр"
    description="Склад, наукові напрями й освітні програми"
    dismissLabel="Закрити повідомлення про кафедри"
    storageKey={LOCAL_STORAGE.ANNOUNCEMENT.DEPARTMENTS}
    version="1"
  />
)
