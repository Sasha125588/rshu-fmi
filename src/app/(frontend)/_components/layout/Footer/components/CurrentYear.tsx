'use client'

import { useEffect, useState } from 'react'

const BUILD_YEAR = 2026

export const CurrentYear = () => {
  const [year, setYear] = useState(BUILD_YEAR)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return year
}
