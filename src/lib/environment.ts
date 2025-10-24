/**
 * Detects if the app is running in Lovable's sandbox/preview environment.
 * Works safely in both browser and Node.js environments.
 */
export function isSandboxEnvironment(): boolean {
  // DEV mode always means sandbox
  if (import.meta.env.DEV) {
    return true
  }

  // Production builds - check hostname for preview environment
  if (typeof window !== 'undefined' && window.location?.hostname) {
    return window.location.hostname.endsWith('.lovableproject.com')
  }

  return false
}
