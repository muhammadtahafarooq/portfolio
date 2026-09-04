'use client'

import { StarField } from '@/components/3d/star-field'

export function SpaceBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <StarField intensity="standard" />
    </div>
  )
}
