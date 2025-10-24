import { defineQuery } from 'groq'

export const PAGE_QUERY = defineQuery(`*[
  _type == "page"
  && slug.current == $slug
][0]{
  _id,
  title,
  slug,
  seo{
    metaTitle,
    metaDescription,
    ogImage,
    ogTitle,
    ogDescription,
    canonicalUrl,
    noIndex
  },
  sections[]{
    _type,
    _key,
    
    // Hero Section
    _type == "heroSection" => {
      badgeLabel,
      title,
      subtitle,
      ctaButton{
        text,
        link
      },
      featuredImage{
        asset->{
          _id,
          url
        },
        hotspot,
        crop
      }
    },
    
    // Humanoid Section
    _type == "humanoidSection" => {
      badgeLabel,
      title,
      cards[]{
        _key,
        tag,
        title,
        highlightText
      }
    },
    
    // Specs Section
    _type == "specsSection" => {
      badgeLabel,
      content
    },
    
    // Details Section
    _type == "detailsSection" => {
      detailsCard{
        title,
        subtitle,
        specifications[]{
          _key,
          label,
          value
        }
      },
      demoCard{
        badge,
        title,
        formFields{
          fullNamePlaceholder,
          emailPlaceholder,
          companyPlaceholder,
          submitButtonText
        }
      }
    },
    
    // Image Showcase Section
    _type == "imageShowcaseSection" => {
      title,
      description,
      image{
        asset->{
          _id,
          url
        },
        hotspot,
        crop
      },
      imageAlt,
      cardTitle,
      cardDescription
    },
    
    // Features Section
    _type == "featuresSection" => {
      badgeLabel,
      title,
      subtitle,
      features[]{
        _key,
        icon,
        title,
        description
      }
    },
    
    // Testimonials Section
    _type == "testimonialsSection" => {
      badgeLabel,
      title,
      testimonials[]{
        _key,
        content,
        author,
        role
      }
    },
    
    // Newsletter Section
    _type == "newsletterSection" => {
      badgeLabel,
      title,
      description,
      emailPlaceholder,
      submitButtonText
    },
    
    // Made By Humans Section
    _type == "madeByHumansSection" => {
      title,
      logo{
        asset->{
          _id,
          url
        },
        hotspot,
        crop
      }
    }
  }
}`)
