import { defineField, defineType } from "sanity";
import { CodeBlockIcon } from "@sanity/icons";

export const specsSectionType = defineType({
  name: "specsSection",
  title: "Specs Section",
  type: "object",
  icon: CodeBlockIcon,
  fields: [
    defineField({
      name: "badgeLabel",
      type: "string",
      description: "Label for the badge chip",
    }),
    defineField({
      name: "content",
      type: "text",
      rows: 5,
      description: "Main text content with image mask",
    }),
  ],
  preview: {
    select: {
      content: "content",
    },
    prepare({ content }) {
      return {
        title: "Specs Section",
        subtitle: content ? content.substring(0, 60) + "..." : "Specs",
      };
    },
  },
});

