import { Announcement } from './Announcement'
import { LOCAL_STORAGE } from '@/shared/constants/localstorage'
import { DEFAULT_SCHEDULE_PATH } from '@/shared/schedule/config'

const expiresAt = new Date('2026-10-05T00:00:00+03:00').getTime()

export const ScheduleAnnouncement = () => (
  <Announcement
    href={DEFAULT_SCHEDULE_PATH}
    sectionPath="/rozklad"
    title="Розклад занять"
    description="Уже доступний на сайті"
    dismissLabel="Закрити повідомлення про розклад"
    storageKey={LOCAL_STORAGE.ANNOUNCEMENT.SCHEDULE}
    version="1"
    expiresAt={expiresAt}
  />
)
