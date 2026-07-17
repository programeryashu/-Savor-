import React, { useState, useEffect } from "react";
import { Menu, X, Utensils, ArrowRight } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  setActivePage: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activePage, setActivePage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (page: string) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (activePage !== "home") {
      setActivePage("home");
      setTimeout(() => {
        const storySection = document.getElementById("story-section");
        storySection?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const storySection = document.getElementById("story-section");
      storySection?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const footer = document.getElementById("main-footer");
    footer?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface select-none">
      {/* TopAppBar */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-2xl h-16"
            : "bg-transparent h-20"
        }`}
        id="main-nav"
      >
        <div className="flex items-center justify-between px-margin-mobile md:px-margin-desktop py-base max-w-container-max mx-auto h-full relative">
          {/* Menu Icon Left (Desktop) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="text-secondary hover:bg-white/5 transition-all duration-300 active:scale-95 p-2 rounded-full hidden md:block cursor-pointer focus-visible:outline-2 focus-visible:outline-secondary"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo Center */}
          <button
            onClick={() => handleNavClick("home")}
            className="font-display text-3xl md:text-4xl tracking-tighter text-on-surface hover:text-secondary transition-colors duration-300 absolute left-1/2 -translate-x-1/2 cursor-pointer focus-visible:outline-2 focus-visible:outline-secondary px-2 py-1 rounded"
          >
            Savoré
          </button>

          {/* Nav Items & Book Button Right */}
          <div className="flex gap-4 ml-auto items-center">
            <nav className="hidden md:flex gap-8 items-center mr-8">
              <button
                onClick={() => handleNavClick("menu")}
                className={`font-sans text-sm tracking-widest uppercase cursor-pointer hover:text-secondary transition-colors focus-visible:outline-2 focus-visible:outline-secondary px-2 py-1 rounded ${
                  activePage === "menu" ? "text-secondary font-semibold" : "text-on-surface-variant"
                }`}
              >
                Menu
              </button>
              <a
                href="#story"
                onClick={handleStoryClick}
                className="font-sans text-sm tracking-widest uppercase cursor-pointer text-on-surface-variant hover:text-secondary transition-colors focus-visible:outline-2 focus-visible:outline-secondary px-2 py-1 rounded"
              >
                Story
              </a>
              <a
                href="#contact"
                onClick={handleContactClick}
                className="font-sans text-sm tracking-widest uppercase cursor-pointer text-on-surface-variant hover:text-secondary transition-colors focus-visible:outline-2 focus-visible:outline-secondary px-2 py-1 rounded"
              >
                Contact
              </a>
            </nav>

            {/* Book a Table Button (Desktop) */}
            <button
              onClick={() => handleNavClick("reservations")}
              className={`bg-secondary text-background font-sans font-bold text-xs tracking-wider uppercase px-6 py-3 rounded-full hover:bg-secondary-fixed transition-all duration-300 active:scale-95 whitespace-nowrap hidden sm:block cursor-pointer focus-visible:outline-2 focus-visible:outline-secondary ${
                activePage === "reservations" ? "opacity-90 ring-2 ring-secondary ring-offset-2 ring-offset-background" : ""
              }`}
            >
              Book a Table
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              className="text-secondary p-2 md:hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-secondary rounded-full hover:bg-white/5"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`fixed inset-0 top-[64px] md:top-[80px] bg-background/95 backdrop-blur-2xl z-40 transition-all duration-500 flex flex-col justify-center items-center gap-8 ${
            isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
          }`}
        >
          <button
            onClick={() => handleNavClick("home")}
            className="text-2xl font-serif text-on-surface hover:text-secondary transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick("menu")}
            className="text-2xl font-serif text-on-surface hover:text-secondary transition-colors"
          >
            Menu
          </button>
          <a
            href="#story"
            onClick={handleStoryClick}
            className="text-2xl font-serif text-on-surface hover:text-secondary transition-colors"
          >
            Story
          </a>
          <a
            href="#contact"
            onClick={handleContactClick}
            className="text-2xl font-serif text-on-surface hover:text-secondary transition-colors"
          >
            Contact
          </a>
          <button
            onClick={() => handleNavClick("reservations")}
            className="mt-4 bg-secondary text-background font-sans font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-full hover:bg-secondary-fixed transition-all"
          >
            Book a Table
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="w-full relative bg-surface-container-lowest border-t border-white/5" id="main-footer">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto items-start">
          <div className="md:col-span-1 mb-8 md:mb-0">
            <span className="font-serif text-3xl text-on-surface block mb-4">Savoré</span>
            <p className="font-sans text-sm text-on-surface-variant opacity-70 leading-relaxed">
              Elevating the art of dining through passion, precision, and profound flavor.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-sans text-xs font-semibold text-secondary uppercase tracking-widest mb-1">
              Contact Us
            </span>
            <div className="flex flex-col gap-2.5">
              <span className="font-sans text-xs text-on-surface-variant/75 flex items-center gap-1.5">
                <span>📞</span> +91 98*** ***54
              </span>
              <a 
                href="mailto:cont***@savore.in" 
                className="font-sans text-xs text-secondary hover:text-on-surface transition-colors duration-200 flex items-center gap-1.5"
              >
                <span>✉️</span> cont***@savore.in
              </a>
              <span className="font-sans text-xs text-on-surface-variant/75 flex items-center gap-1.5">
                <span>📍</span> 12* Luxury Rd, Mum***
              </span>
              <div className="flex gap-2 mt-2 pt-2 border-t border-white/5">
                <a 
                  href="https://instagram.com/sav***_dining" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-sans text-[10px] text-secondary hover:text-on-surface transition-colors duration-200"
                >
                  IG: @sav***_dining
                </a>
                <span className="text-white/10 text-xs">|</span>
                <a 
                  href="https://x.com/sav***_dining" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-sans text-[10px] text-secondary hover:text-on-surface transition-colors duration-200"
                >
                  X: @sav***_dining
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <a className="font-sans text-sm text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer">
              Press
            </a>
            <a className="font-sans text-sm text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer">
              Careers
            </a>
            <a className="font-sans text-sm text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer">
              Private Events
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-sans text-xs font-semibold text-secondary uppercase tracking-widest mb-2">
              Newsletter
            </span>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing to Savoré Newsletter!");
              }}
              className="relative w-full"
            >
              <input
                className="w-full bg-transparent border-0 border-b border-white/20 focus:border-secondary focus:ring-0 text-on-surface font-sans text-sm py-2 px-0 transition-colors duration-300 placeholder:text-on-surface-variant/50 focus:outline-none"
                placeholder="Email Address"
                required
                type="email"
                aria-label="Subscribe to our newsletter"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface transition-colors duration-300 p-2 cursor-pointer"
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          <div className="md:col-span-4 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="font-sans text-xs text-on-surface-variant opacity-50">
              © 2026 Savoré. All rights reserved.
            </span>
            <div className="flex gap-6">
              <a className="text-on-surface-variant hover:text-secondary transition-colors duration-300 opacity-50 hover:opacity-100 text-xs cursor-pointer">
                Privacy Policy
              </a>
              <a className="text-on-surface-variant hover:text-secondary transition-colors duration-300 opacity-50 hover:opacity-100 text-xs cursor-pointer">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button (Mobile Only) */}
      {activePage !== "reservations" && (
        <div className="fixed bottom-margin-mobile right-margin-mobile z-40 md:hidden">
          <button
            onClick={() => handleNavClick("reservations")}
            className="bg-secondary text-background shadow-[0_10px_30px_rgba(211,197,168,0.3)] rounded-full h-14 px-6 flex items-center justify-center gap-2 font-sans font-bold text-xs uppercase tracking-wider active:scale-95 transition-transform cursor-pointer"
          >
            <Utensils size={16} />
            <span>Book a Table</span>
          </button>
        </div>
      )}
    </div>
  );
};
