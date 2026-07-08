import * as migration_20260705_181021_users_and_departments from './20260705_181021_users_and_departments'
import * as migration_20260708_212828_media_r2 from './20260708_212828_media_r2'

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
]
