// "use client";

// import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";
// import { Button } from "../components/ui/button";
// import Image from "next/image";

// export default function Footer() {
//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   // TODO: Replace with Redux store data or keep as static navigation
//   const quickLinks = [
//     { name: "Accueil", id: "hero" },
//     { name: "Menu", id: "menu" },
//     { name: "À propos", id: "about" },
//     { name: "Contact", id: "contact" }
//   ];

//   return (
//     <footer className='bg-gray-900 text-white'>
//       <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
//         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
//           {/* Logo and Description - Larger Logo */}
//           <div className='space-y-4'>
//             <div className='flex items-center space-x-2'>
//               <Image
//                 src='/logo.png'
//                 alt='M.N. Traiteur Logo'
//                 width={160}
//                 height={60}
//                 className='h-10 sm:h-12 w-auto'
//               />
//             </div>
//             <p
//               className='text-gray-300 leading-relaxed'
//               style={{ fontFamily: "Arial" }}
//             >
//               Cuisine française traditionnelle et moderne préparée avec des
//               ingrédients naturels et beaucoup d'amour. Notre objectif est
//               d'assurer un service de qualité et des plats délicieux.
//             </p>
//             <div className='flex space-x-3'>
//               <Button
//                 variant='ghost'
//                 size='icon'
//                 className='hover:bg-red-600 hover:text-white transition-all duration-300'
//               >
//                 <Facebook className='h-5 w-5' />
//               </Button>
//               <Button
//                 variant='ghost'
//                 size='icon'
//                 className='hover:bg-red-600 hover:text-white transition-all duration-300'
//               >
//                 <Instagram className='h-5 w-5' />
//               </Button>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3
//               className='text-lg font-semibold mb-4 text-red-600'
//               style={{ fontFamily: "Arial" }}
//             >
//               Liens Rapides
//             </h3>
//             <ul className='space-y-2'>
//               {quickLinks.map((link) => (
//                 <li key={link.id}>
//                   <button
//                     onClick={() => scrollToSection(link.id)}
//                     className='text-gray-300 hover:text-red-600 transition-colors duration-200 text-left'
//                     style={{ fontFamily: "Arial" }}
//                   >
//                     {link.name}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3
//               className='text-lg font-semibold mb-4 text-red-600'
//               style={{ fontFamily: "Arial" }}
//             >
//               Contact
//             </h3>
//             <ul className='space-y-3'>
//               <li className='flex items-start space-x-3'>
//                 <MapPin className='h-5 w-5 text-red-600 mt-0.5 flex-shrink-0' />
//                 <span className='text-gray-300' style={{ fontFamily: "Arial" }}>
//                   19 rue Forlen 67118 Geispolsheim, France
//                 </span>
//               </li>
//               <li className='flex items-center space-x-3'>
//                 <Phone className='h-5 w-5 text-red-600 flex-shrink-0' />
//                 <div className='text-gray-300'>
//                   <div>+33 6 12 53 43 76</div>
//                 </div>
//               </li>
//               <li className='flex items-center space-x-3'>
//                 <Mail className='h-5 w-5 text-red-600 flex-shrink-0' />
//                 <span className='text-gray-300'>info@mn-traiteur.fr</span>
//               </li>
//             </ul>
//           </div>

//           {/* Working Hours */}
//           <div>
//             <h3
//               className='text-lg font-semibold mb-4 text-red-600'
//               style={{ fontFamily: "Arial" }}
//             >
//               Horaires d'ouverture
//             </h3>
//             <div className='space-y-2 text-gray-300'>
//               <div className='flex justify-between'>
//                 <span style={{ fontFamily: "Arial" }}>Monday - Fermé</span>
//                 <span>10:00 - 23:00</span>
//               </div>
//               <div className='flex justify-between'>
//                 <span style={{ fontFamily: "Arial" }}>Tuesday-Sunday</span>
//                 <span>11h30 - 14h30 et 18h - 21h45</span>
//               </div>
//             </div>
//             <div className='mt-4 p-3 bg-red-600/20 rounded-lg'>
//               <p
//                 className='text-sm text-red-600 font-medium'
//                 style={{ fontFamily: "Arial" }}
//               >
//                 Livraison dans tout Paris
//               </p>
//               <p
//                 className='text-xs text-gray-300 mt-1'
//                 style={{ fontFamily: "Arial" }}
//               >
//                 Commande minimum 30€
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className='border-t border-gray-800 mt-8 pt-8'>
//           <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
//             <p
//               className='text-gray-400 text-sm'
//               style={{ fontFamily: "Arial" }}
//             >
//               © 2024 M.N. Traiteur. Tous droits réservés.
//             </p>
//             <div className='flex items-center space-x-4 text-sm text-gray-400'>
//               <span style={{ fontFamily: "Arial" }}>Fait avec</span>
//               <span className='text-red-600'>❤️</span>
//               <span style={{ fontFamily: "Arial" }}>en France</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

"use client";
import { Phone, Mail, MapPin, Send } from "lucide-react";
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
              {/* Facebook Icon with blue background */}
              <Button
                size='icon'
                className='w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 rounded-full p-0'
                onClick={() => window.open("https://facebook.com", "_blank")}
              >
                <svg
                  className='h-5 w-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                </svg>
              </Button>

              {/* Instagram Icon with gradient background */}
              <Button
                size='icon'
                className='w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white transition-all duration-300 rounded-full p-0'
                onClick={() => window.open("https://instagram.com", "_blank")}
              >
                <svg
                  className='h-5 w-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                </svg>
              </Button>

              {/* WhatsApp Icon with green background */}
              <Button
                size='icon'
                className='w-10 h-10 bg-green-500 hover:bg-green-600 text-white transition-all duration-300 rounded-full p-0'
                onClick={() =>
                  window.open("https://wa.me/33612534376", "_blank")
                }
              >
                <svg
                  className='h-5 w-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488' />
                </svg>
              </Button>
            </div>

            {/* Add red underline after social icons */}
            <div className='w-16 h-0.5 bg-red-600 mt-2'></div>
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
                  19 rue Forlen 67118 Geispolsheim, France
                </span>
              </li>
              <li className='flex items-center space-x-3'>
                <Phone className='h-5 w-5 text-red-600 flex-shrink-0' />
                <div className='text-gray-300'>
                  <div>+33 6 12 53 43 76</div>
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
                <span style={{ fontFamily: "Arial" }}>Lundi</span>
                <span className='text-red-400'>Fermé</span>
              </div>
              <div className='flex justify-between'>
                <span style={{ fontFamily: "Arial" }}>Mar-Dim</span>
                <span>11h30-14h30</span>
              </div>
              <div className='flex justify-between'>
                <span></span>
                <span>18h-21h45</span>
              </div>
            </div>
            <div className='mt-4 p-3 bg-red-600/20 rounded-lg border border-red-600/30'>
              <p
                className='text-sm text-red-400 font-medium'
                style={{ fontFamily: "Arial" }}
              >
                🚚 Livraison Geispolsheim
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
          </div>
        </div>
      </div>

      {/* Developer Credit */}
      <div className='bg-black py-3'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-center space-x-2'>
            <span
              className='text-gray-400 text-sm'
              style={{ fontFamily: "Arial" }}
            >
              Site créé par Karen Davtyan
            </span>
            <Button
              size='sm'
              className='h-8 w-8 p-0 bg-blue-600 hover:bg-white-700 text-white rounded-full transition-all duration-300'
              onClick={() => window.open("https://t.me/karend", "_blank")}
            >
              <Send className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
