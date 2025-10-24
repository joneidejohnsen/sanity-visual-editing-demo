import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export const pageType = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: "content",
      description: "Internal page name for identification",
      validation: (rule) => rule.required().error("Page title is required for identification"),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      description: "URL-friendly identifier (e.g., 'home', 'about')",
      options: {
        source: "title",
      },
      validation: (rule) => rule.required().error("Slug is required for page routing"),
    }),
    defineField({
      name: "seo",
      type: "object",
      title: "SEO",
      group: "seo",
      description: "Search engine optimization settings",
      options: {
        collapsed: false,
      },
      fields: [
        defineField({
          name: "metaTitle",
          type: "string",
          description: "Title for search engines and browser tabs",
          validation: (rule) => 
            rule.max(60).warning("Meta titles should be 60 characters or less for optimal display"),
        }),
        defineField({
          name: "metaDescription",
          type: "text",
          rows: 3,
          description: "Description for search engine results",
          validation: (rule) => 
            rule.max(160).warning("Meta descriptions should be 160 characters or less for optimal display"),
        }),
        defineField({
          name: "ogImage",
          title: "Open Graph Image",
          type: "image",
          description: "Image for social media sharing (recommended: 1200x630px)",
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: "ogTitle",
          title: "Open Graph Title",
          type: "string",
          description: "Title for social media sharing (defaults to meta title if not set)",
        }),
        defineField({
          name: "ogDescription",
          title: "Open Graph Description",
          type: "text",
          rows: 2,
          description: "Description for social media sharing (defaults to meta description if not set)",
        }),
        defineField({
          name: "canonicalUrl",
          type: "url",
          description: "Canonical URL to prevent duplicate content issues",
        }),
        defineField({
          name: "noIndex",
          type: "string",
          description: "Prevent search engines from indexing this page",
          options: {
            list: [
              { title: "Index (default)", value: "index" },
              { title: "No Index", value: "noindex" },
            ],
            layout: "radio",
          },
        }),
      ],
    }),
    defineField({
      name: "sections",
      type: "array",
      group: "content",
      description: "Add and reorder sections to build your page",
      of: [
        { type: "heroSection" },
        { type: "humanoidSection" },
        { type: "specsSection" },
        { type: "detailsSection" },
        { type: "imageShowcaseSection" },
        { type: "featuresSection" },
        { type: "testimonialsSection" },
        { type: "newsletterSection" },
        { type: "madeByHumansSection" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      media: "seo.ogImage",
    },
    prepare({ title, slug, media }) {
      return {
        title: title || "Untitled",
        subtitle: slug ? `/${slug}` : "/",
        media,
      };
    },
  },
});

