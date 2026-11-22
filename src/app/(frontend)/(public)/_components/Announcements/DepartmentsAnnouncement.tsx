import { Announcement } from './Announcement'
import { LOCAL_STORAGE } from '@/shared/constants/localstorage'

const expiresAt = new Date('2026-11-20T00:00:00+03:00').getTime()

export const DepartmentsAnnouncement = () => (
  <Announcement
    href="/departments/kitm"
    sectionPath="/departments"
    title="Сторінки кафедр"
    description="Склад, наукові напрями й освітні програми"
    dismissLabel="Закрити повідомлення про кафедри"
    storageKey={LOCAL_STORAGE.ANNOUNCEMENT.DEPARTMENTS}
    version="1"
    expiresAt={expiresAt}
  />
)
