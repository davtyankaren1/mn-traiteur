"use client";

import { useState, useEffect } from "react";
import {
  ShoppingCart,
  X,
  Phone,
  Facebook,
  Instagram,
  MessageCircle
} from "lucide-react";
import { Button } from "../components/ui/button";
import { useCart } from "../contexts/cart-context";
import Image from "next/image";

export default function Header({ onCartClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isAnimating, setIsAnimating] = useState(false);
  const { items } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ["hero", "menu", "about", "reviews", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      setIsAnimating(true);
    } else {
      document.body.style.overflow = "unset";
      setIsAnimating(false);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  // TODO: Replace with Redux store data or keep as static navigation
  const navItems = [
    { name: "Accueil", id: "hero" },
    { name: "Menu", id: "menu" },
    { name: "À propos", id: "about" },
    { name: "Avis", id: "reviews" },
    { name: "Contact", id: "contact" }
  ];

  return (
    <>
      <style jsx>{`
        @keyframes slideInFromTop {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideOutToTop {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(-100%);
            opacity: 0;
          }
        }

        @keyframes fadeInUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .menu-enter {
          animation: slideInFromTop 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        }

        .menu-exit {
          animation: slideOutToTop 0.3s cubic-bezier(0.55, 0.06, 0.68, 0.19)
            forwards;
        }

        .nav-item {
          animation: fadeInUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          opacity: 0;
        }

        .social-buttons {
          animation: scaleIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          opacity: 0;
        }
      `}</style>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-lg"
            : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-20 lg:h-24'>
            {/* Logo Image - Reduced size */}
            <div className='flex items-center'>
              <Image
                src='/logo.png'
                alt='M.N. Traiteur Logo'
                width={280}
                height={100}
                className='h-12 sm:h-14 md:h-16 lg:h-18 w-auto transition-all duration-300'
                priority
              />
            </div>

            {/* Desktop Navigation */}
            <nav className='hidden lg:flex items-center space-x-12'>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative font-semibold transition-colors duration-300 px-0 py-2 ${
                    activeSection === item.id
                      ? "text-[#DC2626]"
                      : "text-gray-800 hover:text-[#DC2626]"
                  } group`}
                  style={{ fontFamily: "Arial" }}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-300 ease-out ${
                      activeSection === item.id
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              ))}
            </nav>

            {/* Cart and Mobile Menu */}
            <div className='flex items-center space-x-3 sm:space-x-4'>
              <Button
                variant='ghost'
                size='icon'
                onClick={onCartClick}
                className='relative p-2 sm:p-3 bg-red-600/20  hover:bg-red-600/30 hover:text-red-600  transition-all duration-300'
              >
                <ShoppingCart className='h-8 w-8 sm:h-7 sm:w-7' />
                {totalItems > 0 && (
                  <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold'>
                    {totalItems}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='lg:hidden hover:bg-[#DC2626]/10 transition-all duration-300 p-2 sm:p-3 bg-red-600/20  hover:bg-red-600/30 hover:text-red-600 border  flex items-center justify-center'
              >
                <div className='relative w-6 h-6 flex items-center justify-center'>
                  <span
                    className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                      isMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
                    }`}
                  />
                  <span
                    className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                      isMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                      isMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
                    }`}
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Full Screen Mobile Navigation - White Background with Red Text */}
      {isMenuOpen && (
        <div
          className={`fixed inset-0 z-[9999] lg:hidden ${
            isAnimating ? "menu-enter" : "menu-exit"
          }`}
        >
          {/* White Background */}
          <div className='absolute inset-0 bg-white'>
            {/* Subtle Pattern Overlay */}
            <div className='absolute inset-0 opacity-5'>
              <div className='absolute top-10 left-10 w-20 h-20 border border-red-600 rounded-full animate-pulse'></div>
              <div className='absolute top-32 right-16 w-16 h-16 border border-red-600 rounded-full animate-pulse delay-1000'></div>
              <div className='absolute bottom-20 left-20 w-24 h-24 border border-red-600 rounded-full animate-pulse delay-500'></div>
              <div className='absolute bottom-40 right-10 w-12 h-12 border border-red-600 rounded-full animate-pulse delay-1500'></div>
            </div>
          </div>

          <div className='relative flex flex-col h-full text-red-600'>
            {/* Header with Red Logo */}
            <div className='flex items-center justify-between p-6 border-b border-red-100'>
              <Image
                src='/logo-red.png'
                alt='M.N. Traiteur Logo'
                width={180}
                height={70}
                className='h-12 sm:h-14 w-auto'
              />
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsMenuOpen(false)}
                className='text-red-600 hover:bg-red-50 transition-all duration-300 hover:rotate-90'
              >
                <X className='h-7 w-7' />
              </Button>
            </div>

            {/* Navigation Items - Red Text */}
            <nav className='flex-1 px-4 py-6 flex flex-col justify-center'>
              <div className='space-y-1'>
                {navItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`nav-item block w-full text-left px-4 py-3 text-2xl font-bold transition-all duration-300 rounded-2xl ${
                      activeSection === item.id
                        ? "text-white bg-red-600 shadow-lg"
                        : "text-red-600 hover:bg-red-50 hover:text-red-700 hover:translate-x-2"
                    }`}
                    style={{
                      fontFamily: "Arial",
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </nav>

            {/* Contact Actions - Phone Number and Social Media in Flex */}
            <div
              className='p-4 space-y-4 social-buttons'
              style={{ animationDelay: "0.8s" }}
            >
              {/* Phone Number and Social Media Icons in Flex Layout */}
              <div className='flex items-center justify-center space-x-2'>
                {/* Phone Number - Light Background */}
                <a
                  href='tel:+33123456789'
                  className='flex items-center justify-center px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 border border-red-200'
                >
                  <Phone className='h-4 w-4 mr-2' />
                  +33 1 23 45 67 89
                </a>

                {/* Social Media Icons */}
                <a
                  href='#'
                  className='flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 hover:scale-110 shadow-md'
                >
                  <Facebook className='h-5 w-5' />
                </a>
                <a
                  href='#'
                  className='flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-all duration-300 hover:scale-110 shadow-md'
                >
                  <Instagram className='h-5 w-5' />
                </a>
                <a
                  href='#'
                  className='flex items-center justify-center w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-300 hover:scale-110 shadow-md'
                >
                  <MessageCircle className='h-5 w-5' />
                </a>
              </div>

              {/* Footer Text - Red Text */}
              <div className='text-center text-red-600/70 text-sm pt-4'>
                <p style={{ fontFamily: "Arial" }}>© 2024 M.N. Traiteur</p>
                <p style={{ fontFamily: "Arial" }}>
                  Cuisine française de qualité
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
