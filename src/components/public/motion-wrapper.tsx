'use client'

import { type ReactNode } from 'react'
import { CustomCursor, CursorGlow } from '@/components/motion'

export function MotionWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <CustomCursor />
      <CursorGlow />
      {children}
    </>
  )
}
