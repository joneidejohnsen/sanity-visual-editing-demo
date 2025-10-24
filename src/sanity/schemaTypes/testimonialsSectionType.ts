import { defineArrayMember, defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const testimonialsSectionType = defineType({
  name: "testimonialsSection",
  title: "Testimonials Section",
  type: "object",
  icon: UserIcon,
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
      name: "testimonials",
      type: "array",
      description: "Customer testimonials and reviews",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "content",
              type: "text",
              rows: 4,
              description: "Testimonial quote text",
              validation: (rule) => rule.required().error("Testimonial content is required"),
            }),
            defineField({
              name: "author",
              type: "string",
              description: "Person's name",
              validation: (rule) => rule.required().error("Author name is required"),
            }),
            defineField({
              name: "role",
              type: "string",
              description: "Author's role and company",
            }),
          ],
          preview: {
            select: {
              author: "author",
              role: "role",
            },
            prepare({ author, role }) {
              return {
                title: author,
                subtitle: role,
              };
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
        title: title || "Testimonials Section",
        subtitle: "Testimonials",
      };
    },
  },
});

