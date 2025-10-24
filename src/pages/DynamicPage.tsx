import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import HumanoidSection from '@/components/HumanoidSection'
import SpecsSection from '@/components/SpecsSection'
import DetailsSection from '@/components/DetailsSection'
import ImageShowcaseSection from '@/components/ImageShowcaseSection'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import Newsletter from '@/components/Newsletter'
import MadeByHumans from '@/components/MadeByHumans'
import Footer from '@/components/Footer'
import { PAGE_QUERY } from '@/sanity/lib/queries'
import { VisualEditing } from '@/components/VisualEditing'
import { SanityLive, useLiveQuery } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'

const DynamicPage = () => {
  const { slug } = useParams<{ slug: string }>()
  
  const {
    data: pageData,
    isLoading,
    error,
  } = useLiveQuery(PAGE_QUERY, { slug })

  // Update SEO meta tags when page data loads
  useEffect(() => {
    if (!pageData?.seo) return

    const seo = pageData.seo

    // Update page title
    if (seo.metaTitle) {
      document.title = seo.metaTitle
    }

    // Update or create meta description
    const updateMetaTag = (
      name: string,
      content: string,
      property?: string
    ) => {
      if (!content) return

      const selector = property
        ? `meta[property="${property}"]`
        : `meta[name="${name}"]`
      let meta = document.querySelector(selector)

      if (!meta) {
        meta = document.createElement('meta')
        if (property) {
          meta.setAttribute('property', property)
        } else {
          meta.setAttribute('name', name)
        }
        document.head.appendChild(meta)
      }

      meta.setAttribute('content', content)
    }

    updateMetaTag('description', seo.metaDescription)
    updateMetaTag('og:title', seo.ogTitle || seo.metaTitle, 'og:title')
    updateMetaTag(
      'og:description',
      seo.ogDescription || seo.metaDescription,
      'og:description'
    )

    if (seo.ogImage?.asset) {
      const imageUrl = urlFor(seo.ogImage).url()
      if (imageUrl) {
        updateMetaTag('og:image', imageUrl, 'og:image')
      }
    }

    if (seo.canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', seo.canonicalUrl)
    }

    if (seo.noIndex === 'noindex') {
      updateMetaTag('robots', 'noindex, nofollow')
    }
  }, [pageData])

  // Initialize intersection observer to detect when elements enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [pageData])

  useEffect(() => {
    // This helps ensure smooth scrolling for the anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()

        const targetId = this.getAttribute('href')?.substring(1)
        if (!targetId) return

        const targetElement = document.getElementById(targetId)
        if (!targetElement) return

        // Increased offset to account for mobile nav
        const offset = window.innerWidth < 768 ? 100 : 80

        window.scrollTo({
          top: targetElement.offsetTop - offset,
          behavior: 'smooth',
        })
      })
    })
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pulse-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h1>
          <p className="text-gray-600">Failed to load page content</p>
        </div>
      </div>
    )
  }

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Page not found
          </h1>
          <p className="text-gray-600">The page "/{slug}" does not exist</p>
        </div>
      </div>
    )
  }

  // Render sections dynamically based on data
  const renderSection = (section: any, index: number) => {
    const sectionNumber = (index + 1).toString().padStart(2, '0')

    switch (section._type) {
      case 'heroSection':
        return (
          <Hero
            key={section._key}
            data={section}
            sectionNumber={sectionNumber}
          />
        )
      case 'humanoidSection':
        return (
          <HumanoidSection
            key={section._key}
            data={section}
            sectionNumber={sectionNumber}
          />
        )
      case 'specsSection':
        return (
          <SpecsSection
            key={section._key}
            data={section}
            sectionNumber={sectionNumber}
          />
        )
      case 'detailsSection':
        return <DetailsSection key={section._key} data={section} />
      case 'imageShowcaseSection':
        return <ImageShowcaseSection key={section._key} data={section} />
      case 'featuresSection':
        return (
          <Features
            key={section._key}
            data={section}
            sectionNumber={sectionNumber}
          />
        )
      case 'testimonialsSection':
        return (
          <Testimonials
            key={section._key}
            data={section}
            sectionNumber={sectionNumber}
          />
        )
      case 'newsletterSection':
        return (
          <Newsletter
            key={section._key}
            data={section}
            sectionNumber={sectionNumber}
          />
        )
      case 'madeByHumansSection':
        return <MadeByHumans key={section._key} data={section} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="space-y-4 sm:space-y-8">
        {pageData.sections?.map((section: any, index: number) =>
          renderSection(section, index)
        )}
      </main>
      <Footer />
      <SanityLive />
      <VisualEditing />
    </div>
  )
}

export default DynamicPage

