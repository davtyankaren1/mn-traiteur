"use client";

import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "../components/ui/button";
import Image from "next/image";

export default function Footer() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // TODO: Replace with Redux store data or keep as static navigation
  const quickLinks = [
    { name: "Accueil", id: "hero" },
    { name: "Menu", id: "menu" },
    { name: "À propos", id: "about" },
    { name: "Contact", id: "contact" }
  ];

  return (
    <footer className='bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Logo and Description - Larger Logo */}
          <div className='space-y-4'>
            <div className='flex items-center space-x-2'>
              <Image
                src='/logo.png'
                alt='M.N. Traiteur Logo'
                width={160}
                height={60}
                className='h-10 sm:h-12 w-auto'
              />
            </div>
            <p
              className='text-gray-300 leading-relaxed'
              style={{ fontFamily: "Arial" }}
            >
              Cuisine française traditionnelle et moderne préparée avec des
              ingrédients naturels et beaucoup d'amour. Notre objectif est
              d'assurer un service de qualité et des plats délicieux.
            </p>
            <div className='flex space-x-3'>
              <Button
                variant='ghost'
                size='icon'
                className='hover:bg-red-600 hover:text-white transition-all duration-300'
              >
                <Facebook className='h-5 w-5' />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                className='hover:bg-red-600 hover:text-white transition-all duration-300'
              >
                <Instagram className='h-5 w-5' />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className='text-lg font-semibold mb-4 text-red-600'
              style={{ fontFamily: "Arial" }}
            >
              Liens Rapides
            </h3>
            <ul className='space-y-2'>
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className='text-gray-300 hover:text-red-600 transition-colors duration-200 text-left'
                    style={{ fontFamily: "Arial" }}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3
              className='text-lg font-semibold mb-4 text-red-600'
              style={{ fontFamily: "Arial" }}
            >
              Contact
            </h3>
            <ul className='space-y-3'>
              <li className='flex items-start space-x-3'>
                <MapPin className='h-5 w-5 text-red-600 mt-0.5 flex-shrink-0' />
                <span className='text-gray-300' style={{ fontFamily: "Arial" }}>
                  Paris, Rue de la Paix 12, France
                </span>
              </li>
              <li className='flex items-center space-x-3'>
                <Phone className='h-5 w-5 text-red-600 flex-shrink-0' />
                <div className='text-gray-300'>
                  <div>+33 1 23 45 67 89</div>
                  <div>+33 6 12 34 56 78</div>
                </div>
              </li>
              <li className='flex items-center space-x-3'>
                <Mail className='h-5 w-5 text-red-600 flex-shrink-0' />
                <span className='text-gray-300'>info@mn-traiteur.fr</span>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3
              className='text-lg font-semibold mb-4 text-red-600'
              style={{ fontFamily: "Arial" }}
            >
              Horaires d'ouverture
            </h3>
            <div className='space-y-2 text-gray-300'>
              <div className='flex justify-between'>
                <span style={{ fontFamily: "Arial" }}>Lundi - Jeudi</span>
                <span>10:00 - 23:00</span>
              </div>
              <div className='flex justify-between'>
                <span style={{ fontFamily: "Arial" }}>Vendredi - Dimanche</span>
                <span>10:00 - 24:00</span>
              </div>
            </div>
            <div className='mt-4 p-3 bg-red-600/20 rounded-lg'>
              <p
                className='text-sm text-red-600 font-medium'
                style={{ fontFamily: "Arial" }}
              >
                Livraison dans tout Paris
              </p>
              <p
                className='text-xs text-gray-300 mt-1'
                style={{ fontFamily: "Arial" }}
              >
                Commande minimum 30€
              </p>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-8 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            <p
              className='text-gray-400 text-sm'
              style={{ fontFamily: "Arial" }}
            >
              © 2024 M.N. Traiteur. Tous droits réservés.
            </p>
            <div className='flex items-center space-x-4 text-sm text-gray-400'>
              <span style={{ fontFamily: "Arial" }}>Fait avec</span>
              <span className='text-red-600'>❤️</span>
              <span style={{ fontFamily: "Arial" }}>en France</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
