
import React, { useRef } from "react";

interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
  backgroundImage: string;
}

const TestimonialCard = ({
  content,
  author,
  role,
  backgroundImage
}: TestimonialCardProps) => {
  return (
    <div 
      className="bg-cover bg-center rounded-lg p-8 h-full flex flex-col justify-between text-white transform transition-transform duration-300 hover:-translate-y-2 relative overflow-hidden" 
      style={{
        backgroundImage: `url('${backgroundImage}')`
      }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-white z-10"></div>
      
      <div className="relative z-0">
        <p className="text-xl mb-8 font-medium leading-relaxed pr-20">{`"${content}"`}</p>
        <div>
          <h4 className="font-semibold text-xl">{author}</h4>
          <p className="text-white/80">{role}</p>
        </div>
      </div>
    </div>
  );
};

interface TestimonialsSectionProps {
  data?: {
    badgeLabel?: string;
    title?: string;
    testimonials?: Array<{
      _key: string;
      content?: string;
      author?: string;
      role?: string;
    }>;
  };
  sectionNumber?: string;
}

const Testimonials = ({ data, sectionNumber }: TestimonialsSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  if (!data?.testimonials || data.testimonials.length === 0) return null;
  
  // Hardcoded background images rotation
  const backgroundImages = [
    '/background-section1.png',
    '/background-section2.png',
    '/background-section3.png',
    '/background-section1.png'
  ];

  return (
    <section className="py-12 bg-white relative" id="testimonials" ref={sectionRef}>
      <div className="section-container opacity-0 animate-on-scroll">
        {(sectionNumber || data.badgeLabel) && (
          <div className="flex items-center gap-4 mb-6">
            <div className="pulse-chip">
              {sectionNumber && (
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">
                  {sectionNumber}
                </span>
              )}
              {data.badgeLabel && <span>{data.badgeLabel}</span>}
            </div>
          </div>
        )}
        
        {data.title && (
          <h2 className="text-5xl font-display font-bold mb-12 text-left">{data.title}</h2>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.testimonials.map((testimonial, index) => {
            if (!testimonial.content || !testimonial.author || !testimonial.role) return null;
            
            return (
              <TestimonialCard 
                key={testimonial._key}
                content={testimonial.content}
                author={testimonial.author}
                role={testimonial.role}
                backgroundImage={backgroundImages[index % backgroundImages.length]}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
