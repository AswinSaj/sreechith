"use client";
import { useState, useEffect } from "react";

export function NavbarDemo() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Works",
      link: "/works",
    },
    {
      name: "About",
      link: "/about",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);

      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Set new timeout to show navbar after user stops scrolling
      const newTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 1000); // Show after 1 second of no scrolling

      setScrollTimeout(newTimeout);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [lastScrollY, scrollTimeout]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#home" className="text-white text-xl font-bold">
                DOP Sree
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item, idx) => (
                  <a
                    key={`nav-link-${idx}`}
                    href={item.link}
                    className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* IMDB and Contact Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://www.imdb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-[#F5C518] px-8 py-3 rounded-lg hover:bg-[#E6B800] transition-colors duration-200 min-w-[100px]"
              >
                <img 
                  src="/imdb-logo.png" 
                  alt="IMDB" 
                  className="w-full h-6 object-contain"
                />
              </a>
              <button className="bg-white text-black px-8 py-3 rounded-lg text-base font-medium hover:bg-gray-200 transition-colors duration-200">
                Contact
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white p-2"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-md">
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                >
                  {item.name}
                </a>
              ))}
              <div className="px-3 py-2 space-y-3">
                <a
                  href="https://www.imdb.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-[#F5C518] px-6 py-4 rounded-lg hover:bg-[#E6B800] transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <img 
                    src="/imdb-logo.png" 
                    alt="IMDB" 
                    className="w-20 h-8 object-contain"
                  />
                </a>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full bg-white text-black px-6 py-4 rounded-lg text-base font-medium hover:bg-gray-200 transition-colors duration-200"
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

