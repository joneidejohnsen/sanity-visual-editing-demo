import { defineField, defineType } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

export const newsletterSectionType = defineType({
  name: "newsletterSection",
  title: "Newsletter Section",
  type: "object",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "badgeLabel",
      type: "string",
      description: "Label for the badge chip",
    }),
    defineField({
      name: "title",
      type: "string",
      description: "Section heading",
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 2,
      description: "Text describing what subscribers will receive",
    }),
    defineField({
      name: "emailPlaceholder",
      type: "string",
      description: "Placeholder text for email input field",
    }),
    defineField({
      name: "submitButtonText",
      type: "string",
      description: "Submit button label",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Newsletter Section",
        subtitle: "Newsletter",
      };
    },
  },
});

