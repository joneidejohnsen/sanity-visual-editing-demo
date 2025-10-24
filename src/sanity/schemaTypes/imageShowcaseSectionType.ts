import { defineField, defineType } from "sanity";
import { ImagesIcon } from "@sanity/icons";

export const imageShowcaseSectionType = defineType({
  name: "imageShowcaseSection",
  title: "Image Showcase Section",
  type: "object",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "Section heading",
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      description: "Section description text",
    }),
    defineField({
      name: "image",
      type: "image",
      description: "Main showcase image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "imageAlt",
      type: "string",
      description: "Alternative text for the image",
    }),
    defineField({
      name: "cardTitle",
      type: "string",
      description: "Title below the image",
    }),
    defineField({
      name: "cardDescription",
      type: "text",
      rows: 3,
      description: "Description below the image",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Image Showcase",
        subtitle: "Image Showcase Section",
        media,
      };
    },
  },
});

