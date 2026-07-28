import type { FacultyNewsCardData } from '../../_types'
import type { Department, FacultyNews } from '@/payload-types'

export type FacultyNewsDepartmentData = Pick<Department, 'id' | 'name' | 'shortName' | 'slug'>

export type FacultyNewsArticleData = FacultyNewsCardData &
  Pick<FacultyNews, 'content' | 'updatedAt'> & {
    relatedDepartments: FacultyNewsDepartmentData[]
  }
