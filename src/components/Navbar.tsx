
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLiveQuery } from "@/sanity/lib/live";
import { defineQuery } from "groq";

const PAGES_QUERY = defineQuery(`*[
  _type == "page" 
  && slug.current != "home"
  && !(_id in path("drafts.**"))
] | order(title) {
  _id,
  title,
  "slug": slug.current
}`);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

  const { data: pages } = useLiveQuery(PAGES_QUERY, {});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent background scrolling when menu is open
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-2 sm:py-3 md:py-4 transition-all duration-300",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <a 
          href="#" 
          className="flex items-center space-x-2"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
          aria-label="Pulse Robot"
        >
          <img 
            src="/logo.svg" 
            alt="Pulse Robot Logo" 
            className="h-7 sm:h-8" 
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a 
            href="/" 
            className="nav-link"
          >
            Home
          </a>
          
          {/* Products Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={() => setIsProductsOpen(false)}
          >
            <button
              className="nav-link flex items-center gap-1"
              onClick={() => setIsProductsOpen(!isProductsOpen)}
            >
              Products
              <ChevronDown 
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isProductsOpen && "rotate-180"
                )} 
              />
            </button>
            
            {/* Invisible bridge to prevent dropdown from closing */}
            {isProductsOpen && (
              <div className="absolute top-full left-0 w-56 h-2" />
            )}
            
            {isProductsOpen && pages && pages.length > 0 && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {pages.map((page: any) => (
                  <a
                    key={page._id}
                    href={`/${page.slug}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {page.title}
                  </a>
                ))}
              </div>
            )}
          </div>
          
          <a href="#features" className="nav-link">About</a>
          <a href="#details" className="nav-link">Contact</a>
        </nav>

        {/* Mobile menu button - increased touch target */}
        <button 
          className="md:hidden text-gray-700 p-3 focus:outline-none" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation - improved for better touch experience */}
      <div className={cn(
        "fixed inset-0 z-40 bg-white flex flex-col pt-16 px-6 md:hidden transition-all duration-300 ease-in-out overflow-y-auto",
        isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
      )}>
        <nav className="flex flex-col space-y-4 items-center mt-8">
          <a 
            href="/" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Home
          </a>
          
          {/* Products Dropdown - Mobile */}
          <div className="w-full">
            <button
              className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2"
              onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
            >
              Products
              <ChevronDown 
                className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  isMobileProductsOpen && "rotate-180"
                )} 
              />
            </button>
            
            {isMobileProductsOpen && pages && pages.length > 0 && (
              <div className="mt-2 space-y-2 pl-4">
                {pages.map((page: any) => (
                  <a
                    key={page._id}
                    href={`/${page.slug}`}
                    className="block text-lg font-medium py-2 px-6 w-full text-center rounded-lg hover:bg-gray-100 text-gray-700"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsMobileProductsOpen(false);
                      document.body.style.overflow = '';
                    }}
                  >
                    {page.title}
                  </a>
                ))}
              </div>
            )}
          </div>
          
          <a 
            href="#features" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            About
          </a>
          <a 
            href="#details" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
