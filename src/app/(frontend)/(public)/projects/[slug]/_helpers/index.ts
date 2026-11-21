import { io } from 'next/cache'
import { cache } from 'react'

import { isRecruitmentOpen } from '../../_helpers/recruitment'

import type { ProjectDetail } from '../_types'

export const getRenderTime = cache(async () => {
  await io()
  return new Date()
})

export const getRecruitmentOpen = async (project: ProjectDetail) =>
  isRecruitmentOpen(project, await getRenderTime())
