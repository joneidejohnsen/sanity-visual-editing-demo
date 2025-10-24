import { defineField, defineType } from "sanity";
import { HeartIcon } from "@sanity/icons";

export const madeByHumansSectionType = defineType({
  name: "madeByHumansSection",
  title: "Made By Humans Section",
  type: "object",
  icon: HeartIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "Main decorative title",
    }),
    defineField({
      name: "logo",
      type: "image",
      description: "Logo image displayed in this section",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Made By Humans",
        subtitle: "Closing Section",
      };
    },
  },
});

