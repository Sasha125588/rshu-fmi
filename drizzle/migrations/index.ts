import * as migration_20260705_181021_users_and_departments from './20260705_181021_users_and_departments'
import * as migration_20260708_212828_media_r2 from './20260708_212828_media_r2'
import * as migration_20260710_122922_documents_library from './20260710_122922_documents_library'
import * as migration_20260710_141248_document_title_generation from './20260710_141248_document_title_generation'
import * as migration_20260713_162359_academic_council_members from './20260713_162359_academic_council_members'
import * as migration_20260713_165142_academic_council_photo_url from './20260713_165142_academic_council_photo_url'
import * as migration_20260713_193323_media_blur_data_url from './20260713_193323_media_blur_data_url'

export const migrations = [
  {
    up: migration_20260705_181021_users_and_departments.up,
    down: migration_20260705_181021_users_and_departments.down,
    name: '20260705_181021_users_and_departments',
  },
  {
    up: migration_20260708_212828_media_r2.up,
    down: migration_20260708_212828_media_r2.down,
    name: '20260708_212828_media_r2',
  },
  {
    up: migration_20260710_122922_documents_library.up,
    down: migration_20260710_122922_documents_library.down,
    name: '20260710_122922_documents_library',
  },
  {
    up: migration_20260710_141248_document_title_generation.up,
    down: migration_20260710_141248_document_title_generation.down,
    name: '20260710_141248_document_title_generation',
  },
  {
    up: migration_20260713_162359_academic_council_members.up,
    down: migration_20260713_162359_academic_council_members.down,
    name: '20260713_162359_academic_council_members',
  },
  {
    up: migration_20260713_165142_academic_council_photo_url.up,
    down: migration_20260713_165142_academic_council_photo_url.down,
    name: '20260713_165142_academic_council_photo_url',
  },
  {
    up: migration_20260713_193323_media_blur_data_url.up,
    down: migration_20260713_193323_media_blur_data_url.down,
    name: '20260713_193323_media_blur_data_url',
  },
]
