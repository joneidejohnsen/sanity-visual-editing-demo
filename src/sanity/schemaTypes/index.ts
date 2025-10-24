import { type SchemaTypeDefinition } from 'sanity'
import { pageType } from "./pageType";
import { heroSectionType } from "./heroSectionType";
import { humanoidSectionType } from "./humanoidSectionType";
import { specsSectionType } from "./specsSectionType";
import { detailsSectionType } from "./detailsSectionType";
import { imageShowcaseSectionType } from "./imageShowcaseSectionType";
import { featuresSectionType } from "./featuresSectionType";
import { testimonialsSectionType } from "./testimonialsSectionType";
import { newsletterSectionType } from "./newsletterSectionType";
import { madeByHumansSectionType } from "./madeByHumansSectionType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    pageType,
    heroSectionType,
    humanoidSectionType,
    specsSectionType,
    detailsSectionType,
    imageShowcaseSectionType,
    featuresSectionType,
    testimonialsSectionType,
    newsletterSectionType,
    madeByHumansSectionType,
  ],
}
