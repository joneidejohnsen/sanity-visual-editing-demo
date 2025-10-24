import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface NewsletterSectionProps {
  data?: {
    badgeLabel?: string;
    title?: string;
    description?: string;
    emailPlaceholder?: string;
    submitButtonText?: string;
  };
  sectionNumber?: string;
}

const Newsletter = ({ data, sectionNumber }: NewsletterSectionProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Thank you for subscribing!",
        description: "You'll receive updates about Atlas soon."
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };
  
  if (!data) return null;
  
  return (
    <section id="newsletter" className="bg-white py-0">
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="max-w-6xl mx-auto">
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
            <h2 className="text-5xl font-display font-bold mb-4 text-left">{data.title}</h2>
          )}
          {data.description && (
            <p className="text-xl text-gray-700 mb-10 text-left">
              {data.description}
            </p>
          )}
          
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-grow">
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder={data.emailPlaceholder || "Email address"} 
                className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pulse-500 text-gray-700" 
                required 
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="bg-pulse-500 hover:bg-pulse-600 text-white font-medium py-4 px-10 rounded-full transition-all duration-300 md:ml-4"
            >
              {isSubmitting ? "Submitting..." : (data.submitButtonText || "Submit")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
