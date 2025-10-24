import { defineArrayMember, defineField, defineType } from "sanity";
import { SparklesIcon } from "@sanity/icons";

export const featuresSectionType = defineType({
  name: "featuresSection",
  title: "Features Section",
  type: "object",
  icon: SparklesIcon,
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
      name: "subtitle",
      type: "text",
      rows: 2,
      description: "Section description",
    }),
    defineField({
      name: "features",
      type: "array",
      description: "List of features to display",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "icon",
              type: "string",
              description: "Select the icon for this feature",
              options: {
                list: [
                  { title: "Adaptive Learning", value: "adaptive-learning" },
                  { title: "Natural Interaction", value: "natural-interaction" },
                  { title: "Precise Movement", value: "precise-movement" },
                  { title: "Spatial Awareness", value: "spatial-awareness" },
                  { title: "Enhanced Security", value: "enhanced-security" },
                  { title: "Task Assistance", value: "task-assistance" },
                ],
              },
            }),
            defineField({
              name: "title",
              type: "string",
              description: "Feature name",
            }),
            defineField({
              name: "description",
              type: "text",
              rows: 3,
              description: "Feature description",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Features Section",
        subtitle: "Features",
      };
    },
  },
});

