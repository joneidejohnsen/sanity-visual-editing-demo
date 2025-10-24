/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

export default defineConfig({
  basePath: '/admin',
  title: 'Content',
  projectId,
  dataset,
  // Add and edit the content schema in the '.src/sanity/schemaTypes' folder
  schema,
  // Authenticate user by adding the following to local storage:
  // localStorage.setItem(
  // "__studio_auth_token_<projectId>>",
  // JSON.stringify({
  //   token: "<token>>",
  //   time: "<current date and time>",
  // })
  //)
  auth: {
    loginMethod: "token"
  },
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: '/',
    }),
  ],
})
