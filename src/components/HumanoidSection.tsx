import React, { useEffect, useRef, useState } from 'react'

interface HumanoidSectionProps {
  data?: {
    badgeLabel?: string
    title?: string
    cards?: Array<{
      _key: string
      tag?: string
      title?: string
      highlightText?: string
    }>
  }
  sectionNumber?: string
}

const HumanoidSection = ({ data, sectionNumber }: HumanoidSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ticking = useRef(false)
  const lastScrollY = useRef(0)

  // More responsive timing function with shorter duration
  const cardStyle = {
    height: '60vh',
    maxHeight: '600px',
    borderRadius: '20px',
    transition:
      'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
    willChange: 'transform, opacity',
  }

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    // Create intersection observer to detect when section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsIntersecting(entry.isIntersecting)
      },
      { threshold: 0.1 } // Start observing when 10% of element is visible
    )

    observer.observe(node)

    // Optimized scroll handler using requestAnimationFrame
    const handleScroll = () => {
      if (!ticking.current) {
        lastScrollY.current = window.scrollY

        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return

          const sectionRect = sectionRef.current.getBoundingClientRect()
          const viewportHeight = window.innerHeight
          const totalScrollDistance = viewportHeight * 2

          // Calculate the scroll progress
          let progress = 0
          if (sectionRect.top <= 0) {
            progress = Math.min(
              1,
              Math.max(0, Math.abs(sectionRect.top) / totalScrollDistance)
            )
          }

          // Determine which card should be visible based on progress
          if (progress >= 0.66) {
            setActiveCardIndex(2)
          } else if (progress >= 0.33) {
            setActiveCardIndex(1)
          } else {
            setActiveCardIndex(0)
          }

          ticking.current = false
        })

        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.unobserve(node)
    }
  }, [])

  if (!data?.cards || data.cards.length === 0) return null

  // Card visibility based on active index instead of direct scroll progress
  const isFirstCardVisible = isIntersecting
  const isSecondCardVisible = activeCardIndex >= 1
  const isThirdCardVisible = activeCardIndex >= 2

  // Background images hardcoded
  const backgroundImages = [
    '/background-section1.png',
    '/background-section2.png',
    '/background-section3.png',
  ]

  const renderCardTitle = (title: string, highlightText?: string) => {
    if (!highlightText) return title

    const parts = title.split(highlightText)
    return (
      <>
        {parts[0]}
        <span className="text-[#FC4D0A]">{highlightText}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <div ref={sectionRef} className="relative" style={{ height: '300vh' }}>
      <section
        className="w-full h-screen py-10 md:py-16 sticky top-0 overflow-hidden bg-white"
        id="why-humanoid"
      >
        <div className="container px-6 lg:px-8 mx-auto h-full flex flex-col">
          <div className="mb-2 md:mb-3">
            <div className="flex items-center gap-4 mb-2 md:mb-2 pt-8 sm:pt-6 md:pt-4">
              {(sectionNumber || data.badgeLabel) && (
                <div
                  className="pulse-chip opacity-0 animate-fade-in"
                  style={{
                    animationDelay: '0.1s',
                  }}
                >
                  {sectionNumber && (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">
                      {sectionNumber}
                    </span>
                  )}
                  {data.badgeLabel && <span>{data.badgeLabel}</span>}
                </div>
              )}
            </div>

            {data.title && (
              <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-1 md:mb-2">
                {data.title}
              </h2>
            )}
          </div>

          <div
            ref={cardsContainerRef}
            className="relative flex-1 perspective-1000"
          >
            {data.cards.map((card, index) => {
              if (!card.title) return null

              const isVisible =
                index === 0
                  ? isFirstCardVisible
                  : index === 1
                    ? isSecondCardVisible
                    : isThirdCardVisible
              const zIndex = (index + 1) * 10
              const scales = [0.9, 0.95, 1]
              const translateY =
                index === 0
                  ? '90px'
                  : index === 1
                    ? activeCardIndex === 1
                      ? '55px'
                      : '45px'
                    : activeCardIndex === 2
                      ? '15px'
                      : '0'
              const bgPosition =
                index === 0
                  ? 'top center'
                  : index === 1
                    ? 'center'
                    : 'bottom center'

              return (
                <div
                  key={card._key}
                  className={`absolute inset-0 overflow-hidden shadow-xl ${isVisible ? 'animate-card-enter' : ''}`}
                  style={{
                    ...cardStyle,
                    zIndex,
                    transform: `translateY(${isVisible ? translateY : '200px'}) scale(${scales[index]})`,
                    opacity: isVisible ? (index === 0 ? 0.9 : 1) : 0,
                    pointerEvents: isVisible ? 'auto' : 'none',
                  }}
                >
                  <div
                    className="absolute inset-0 z-0 bg-gradient-to-b from-pulse-900/40 to-dark-900/80"
                    style={{
                      backgroundImage: `url('${backgroundImages[index]}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: bgPosition,
                      backgroundBlendMode: 'overlay',
                    }}
                  ></div>

                  {card.tag && (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white">
                        <span className="text-sm font-medium">{card.tag}</span>
                      </div>
                    </div>
                  )}

                  <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full flex items-center">
                    <div className="max-w-lg">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-display text-white font-bold leading-tight mb-4">
                        {renderCardTitle(card.title, card.highlightText)}
                      </h3>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HumanoidSection
