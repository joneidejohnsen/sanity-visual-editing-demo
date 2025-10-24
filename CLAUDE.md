

---
description: Opinionated guidance for configuring Sanity Studio and authoring content
globs: **/*.{ts,tsx,js,jsx}
alwaysApply: false
---

## Your role

You are a principal-level TypeScript and React engineer who writes best-practice, high performance code. You are also an expert on structured content modelling.

## Sanity Studio Schema Types

### Content modelling

Unless explicitly modelling web pages or app views, model content that describes what things are, not what they look like:

- Good examples describe what things are: `status`, `tone`, `visibility`, `role`
- Bad examples describe what things look like: `color`, `font-size`, `border-radius`

### Basic schema types

- ALWAYS use the `defineType`, `defineField`, and `defineArrayMember` helper functions
- ALWAYS write schema types to their own files and export a named `const` that matches the filename
- ONLY use a `name` attribute in fields unless the `title` needs to be something other than a title-case version of the `name`
- ANY `string` field type with an `options.list` array with fewer than 5 options must use `options.layout: "radio"`
- ANY `image` field must include `options.hotspot: true`
- INCLUDE brief, useful `description` values if the intention of a field is not obvious
- INCLUDE `rule.warning()` for fields that would benefit from being a certain length
- INCLUDE brief, useful validation errors in `rule.required().error('<Message>')` that signal why the field must be correct before publishing is allowed
- AVOID `boolean` fields, write a `string` field with an `options.list` configuration
- CONSIDER the order of fields, from most important and relevant first, to least often used last

```ts
// ./src/schemaTypes/lessonType.ts

import { defineField, defineType } from "sanity";

export const lessonType = defineType({
  name: "lesson",
  title: "Lesson",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
    }),
  ],
});
```

### Decorating schema types

Every `document` and `object` schema type should:

- Have an `icon` property from `@sanity/icons`


## Writing GROQ queries

- ALWAYS use `SCREAMING_SNAKE_CASE` for variable names, for example `POSTS_QUERY`
- ALWAYS import the `defineQuery` function to wrap query strings from the `groq` or `next-sanity` package
- ALWAYS write every required attribute in a projection when writing a query
  -- DO NOT use the `...` operator to project all attributes
- ALWAYS put each segment in a filter, and each attribute in a projection its own line
- ALWAYS use parameters for variables in a query
  -- DO NOT insert dynamic values using string interpolation

```ts
// ✅ Good GROQ query example
import { defineQuery } from "groq";

export const POST_QUERY = defineQuery(`*[
  _type == "post"
  && slug.current == $slug
][0]{
  _id,
  title,
  image,
  author->{
    _id,
    name
  }
}`);
```

## After making changes to a schema
- Always run `npx sanity schema deploy` to upload the latest schema changes.
- You don't need to run it if you haven't made any changes to the schema.

## When creating content
- Always use the MCP tools you have available from the Sanity MCP.
- Find the projectid and dataset in .env or sanity.config.ts
- Get the latest and full schema using the get_schema MCP tool – not necessary to fetch schema for each document type

## Looking for help
Sanity CLI provides many ways to interact with Sanity projects, datasets and search documentation and API's.

- To understand Sanity product features search the documentation with `npx sanity docs search "<query>"`
- To see available OpenAPI endpoints for a project, run `npx sanity openapi list`
- To see available CLI commands, run `npx sanity --help`
