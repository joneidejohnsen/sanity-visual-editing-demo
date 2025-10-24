import { defineArrayMember, defineField, defineType } from "sanity";
import { RobotIcon } from "@sanity/icons";

export const humanoidSectionType = defineType({
  name: "humanoidSection",
  title: "Humanoid Section",
  type: "object",
  icon: RobotIcon,
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
      name: "cards",
      type: "array",
      description: "Stack of cards that appear on scroll",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "tag",
              type: "string",
              description: "Tag label (e.g., 'The vision')",
            }),
            defineField({
              name: "title",
              type: "text",
              rows: 3,
              description: "Card headline text",
            }),
            defineField({
              name: "highlightText",
              type: "string",
              description: "Text to highlight in a different color (optional)",
            }),
          ],
          preview: {
            select: {
              title: "title",
            },
          },
        }),
      ],
      validation: (rule) => rule.max(3).warning("Maximum of 3 cards recommended for optimal display"),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Why Humanoid",
        subtitle: "Humanoid Section",
      };
    },
  },
});

