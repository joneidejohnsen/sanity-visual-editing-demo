import { isSandbox } from '@/sanity/env'
import { VisualEditing as SanityVisualEditing } from '@sanity/visual-editing/react'

export function VisualEditing() {
  // Only enable in sandbox/preview mode
  if (!isSandbox()) return null

  return <SanityVisualEditing portal={true} />
}
