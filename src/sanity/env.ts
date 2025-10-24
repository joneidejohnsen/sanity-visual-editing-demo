export const dataset = assertValue(
  (typeof import.meta !== 'undefined' &&
    import.meta.env?.VITE_SANITY_DATASET) ||
    process.env.VITE_SANITY_DATASET,
  'Missing environment variable: VITE_SANITY_DATASET'
)

export const projectId = assertValue(
  (typeof import.meta !== 'undefined' &&
    import.meta.env?.VITE_SANITY_PROJECT_ID) ||
    process.env.VITE_SANITY_PROJECT_ID,
  'Missing environment variable: VITE_SANITY_PROJECT_ID'
)

export const apiVersion = '2025-10-13'

export const viewerToken =
  typeof import.meta !== 'undefined'
    ? import.meta.env?.VITE_SANITY_VIEWER_TOKEN
    : process.env.VITE_SANITY_VIEWER_TOKEN

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}

// Detects if we're in the lovable sandbox
export { isSandboxEnvironment as isSandbox } from '@/lib/environment'
