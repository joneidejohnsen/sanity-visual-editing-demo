
import React from "react";

interface ImageShowcaseSectionProps {
  data?: {
    title?: string;
    description?: string;
    image?: {
      asset?: {
        url?: string;
      };
    };
    imageAlt?: string;
    cardTitle?: string;
    cardDescription?: string;
  };
}

const ImageShowcaseSection = ({ data }: ImageShowcaseSectionProps) => {
  if (!data?.image?.asset?.url) return null;
  
  return (
    <section className="w-full pt-0 pb-8 sm:pb-12 bg-white" id="showcase">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        {(data.title || data.description) && (
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 animate-on-scroll">
            {data.title && (
              <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-gray-900 mb-3 sm:mb-4">
                {data.title}
              </h2>
            )}
            {data.description && (
              <p className="text-base sm:text-lg text-gray-600">
                {data.description}
              </p>
            )}
          </div>
        )}
        
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant mx-auto max-w-4xl animate-on-scroll">
          <div className="w-full">
            <img 
              src={data.image.asset.url} 
              alt={data.imageAlt || data.title || "Robot showcase"} 
              className="w-full h-auto object-cover"
            />
          </div>
          {(data.cardTitle || data.cardDescription) && (
            <div className="bg-white p-4 sm:p-8">
              {data.cardTitle && (
                <h3 className="text-xl sm:text-2xl font-display font-semibold mb-3 sm:mb-4">
                  {data.cardTitle}
                </h3>
              )}
              {data.cardDescription && (
                <p className="text-gray-700 text-sm sm:text-base">
                  {data.cardDescription}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImageShowcaseSection;
