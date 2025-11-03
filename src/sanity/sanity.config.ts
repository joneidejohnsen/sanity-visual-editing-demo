/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {dataset, projectId} from './env.ts'
import {schema} from './schemaTypes'
import {structure} from './structure.ts'
import {lovableTheme} from "@/sanity/lovableTheme.ts";

export default defineConfig({
  basePath: '/admin',
  title: 'Content',
  projectId,
  dataset,
  theme: lovableTheme,
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
  studio: {
    components: {
      navbar: () => null
    }
  },
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
