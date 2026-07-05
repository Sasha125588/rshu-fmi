import * as migration_20260705_181021_users_and_departments from './20260705_181021_users_and_departments'

export const migrations = [
  {
    up: migration_20260705_181021_users_and_departments.up,
    down: migration_20260705_181021_users_and_departments.down,
    name: '20260705_181021_users_and_departments',
  },
]
