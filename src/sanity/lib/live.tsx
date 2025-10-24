import { CorsOriginError, type QueryParams } from '@sanity/client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { client as sanityClient } from './client'
import { useEffect, useMemo } from 'react'
import { isSandbox } from '../env'

const token = import.meta.env?.VITE_SANITY_VIEWER_TOKEN

export function useLiveQuery<const QueryString extends string>(
  query: QueryString,
  params: QueryParams = {}
) {
  // The perspective decides what data to fetch,
  // a future feature would be to use the same `perspective` as the global perspective used in sanity studio to preview
  // an upcoming content release
  const perspective = isSandbox() ? 'drafts' : 'published'
  // When in sandbox/preview mode we enable stega for live editing
  const stega = isSandbox()
  const { data, ...rest } = useQuery({
    // Scope all sanity queries to `sanity`, then by query, params, perspective and stega to make the most use of the cache even as params may change
    queryKey: ['sanity', query, params, perspective, stega],
    // <SanityLive> handles invalidation, using on-demand invalidation events, thus there is no need to refetch on window focus and such
    staleTime: Infinity,
    queryFn: async () => {
      // Choose which client to use based on the env, in sandbox we want draft content and need to provide a token
      const client = isSandbox()
        ? sanityClient.withConfig({
            token,
          })
        : sanityClient

      // In order for the sanity live revalidation to work we need to fetch the `syncTags`, setting `filterResponse: false` grants access to it
      return await client.fetch(query, params, {
        filterResponse: false,
        perspective,
        stega,
        // The API CDN can only be used with the `published` perspective
        useCdn: perspective === 'published',
      })
    },
  })
  // We don't need syncTags in the general app, it's only used by <SanityLive>, so we pass `result` as `data`, which is what Sanity Client does when `filterResponse: true`
  return { data: data?.result, ...rest }
}

// Handles live revalidation of queries by subscribing to Sanity Live events
export function SanityLive() {
  const queryClient = useQueryClient()
  const observable = useMemo(() => {
    // In production we only listen to live events to published content, in sandbox/preview mode we want to be notified of changes to draft content
    return isSandbox()
      ? sanityClient.withConfig({ token }).live.events({ includeDrafts: true })
      : sanityClient.live.events()
  }, [])

  useEffect(() => {
    const subscription = observable.subscribe({
      next: (event) => {
        switch (event.type) {
          // Log when connected to Sanity Live, so it's clear that changes will show up automatically
          case 'welcome':
            console.info(
              `Sanity is live with automatic revalidation of ${isSandbox() ? 'draft, and published,' : 'published'} content`
            )
            break
          case 'message':
            queryClient.invalidateQueries({
              queryKey: ['sanity'],
              // If the query has a `syncTag` that exists in `event.tags` then the query should refetch as the cache is stale
              predicate: (query) => {
                if (
                  typeof query.state.data == 'object' &&
                  'syncTags' in query.state.data &&
                  Array.isArray(query.state.data?.syncTags)
                ) {
                  return query.state.data?.syncTags.some((syncTag) =>
                    event.tags.includes(syncTag)
                  )
                }
                return false
              },
            })
            break
          // If the connection is lost, or the API tells us to restart, we invalidate all sanity queries (there's likely stale data in the cache)
          case 'reconnect':
          case 'restart':
            queryClient.invalidateQueries({ queryKey: ['sanity'] })
            break
          default:
            console.log('Sanity Live event', event)
            break
        }
      },
      error: (error: unknown) => {
        if (error instanceof CorsOriginError) {
          console.error(
            `Sanity Live is unable to connect to the Sanity API as the current origin - ${window.origin} - is not in the list of allowed CORS origins for this Sanity Project.`,
            error.addOriginUrl && `Add it here:`,
            error.addOriginUrl?.toString()
          )
        } else {
          console.error(error)
        }
      },
    })

    return () => subscription.unsubscribe()
  }, [observable, queryClient])

  return null
}
