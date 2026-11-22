import { Announcement } from './Announcement'
import { LOCAL_STORAGE } from '@/shared/constants/localstorage'

const expiresAt = new Date('2026-12-06T00:00:00+02:00').getTime()

export const ProjectsAnnouncement = () => (
  <Announcement
    href="/projects"
    sectionPath="/projects"
    title="До чого можна долучитися"
    description="Знайди проєкт факультету або запропонуй свою ідею"
    dismissLabel="Закрити повідомлення про проєкти"
    storageKey={LOCAL_STORAGE.ANNOUNCEMENT.PROJECTS}
    version="1"
    expiresAt={expiresAt}
  />
)
