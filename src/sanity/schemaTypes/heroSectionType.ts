import { defineField, defineType } from "sanity";
import { RocketIcon } from "@sanity/icons";

export const heroSectionType = defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  icon: RocketIcon,
  fields: [
    defineField({
      name: "badgeLabel",
      type: "string",
      description: "Label for the badge chip",
    }),
    defineField({
      name: "title",
      type: "string",
      description: "Main headline for the hero section",
      validation: (rule) => rule.required().error("Hero title is required"),
    }),
    defineField({
      name: "subtitle",
      type: "text",
      rows: 3,
      description: "Supporting text below the main title",
    }),
    defineField({
      name: "ctaButton",
      type: "object",
      description: "Call-to-action button configuration",
      fields: [
        defineField({
          name: "text",
          type: "string",
          description: "Button text",
        }),
        defineField({
          name: "link",
          type: "string",
          description: "URL or anchor link (e.g., #get-access)",
        }),
      ],
    }),
    defineField({
      name: "featuredImage",
      type: "image",
      description: "Main hero image or robot image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "featuredImage",
    },
    prepare({ title, media }) {
      return {
        title: title || "Hero Section",
        subtitle: "Hero",
        media,
      };
    },
  },
});

