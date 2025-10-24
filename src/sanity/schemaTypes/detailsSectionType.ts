import { defineArrayMember, defineField, defineType } from "sanity";
import { DocumentsIcon } from "@sanity/icons";

export const detailsSectionType = defineType({
  name: "detailsSection",
  title: "Details Section",
  type: "object",
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: "detailsCard",
      type: "object",
      description: "Left card with specifications",
      fields: [
        defineField({
          name: "title",
          type: "string",
          description: "Card title",
        }),
        defineField({
          name: "subtitle",
          type: "string",
          description: "Card subtitle",
        }),
        defineField({
          name: "specifications",
          type: "array",
          description: "List of technical specifications",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "label",
                  type: "string",
                  description: "Specification name (e.g., Height, Weight)",
                }),
                defineField({
                  name: "value",
                  type: "string",
                  description: "Specification value (e.g., 5'8\", 140lbs)",
                }),
              ],
              preview: {
                select: {
                  label: "label",
                  value: "value",
                },
                prepare({ label, value }) {
                  return {
                    title: `${label}: ${value}`,
                  };
                },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "demoCard",
      type: "object",
      description: "Right card with demo request form",
      fields: [
        defineField({
          name: "badge",
          type: "string",
          description: "Small badge text above the title",
        }),
        defineField({
          name: "title",
          type: "string",
          description: "Card title",
        }),
        defineField({
          name: "formFields",
          type: "object",
          description: "Form field placeholders and button text",
          fields: [
            defineField({
              name: "fullNamePlaceholder",
              type: "string",
              description: "Placeholder for full name input",
            }),
            defineField({
              name: "emailPlaceholder",
              type: "string",
              description: "Placeholder for email input",
            }),
            defineField({
              name: "companyPlaceholder",
              type: "string",
              description: "Placeholder for company input",
            }),
            defineField({
              name: "submitButtonText",
              type: "string",
              description: "Submit button label",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "detailsCard.title",
    },
    prepare({ title }) {
      return {
        title: title || "Details Section",
        subtitle: "Details & Demo",
      };
    },
  },
});

