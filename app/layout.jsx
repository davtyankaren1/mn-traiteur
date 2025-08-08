// import { Inter } from "next/font/google";
// import { Toaster } from "sonner";
// import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "M.N. Traiteur - Livraison de plats chauds",
//   description:
//     "Découvrez nos délicieuses spécialités françaises préparées avec des ingrédients frais et de qualité, livrées directement chez vous.",
//   viewport:
//     "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang='fr' className='overflow-x-hidden'>
//       <head>
//         <title>M.N. Traiteur - Livraison de plats chauds</title>

//         {/* Manifest link */}
//         <link rel='manifest' href='/manifest.json' />

//         {/* Meta tags */}
//         <meta name='description' content={metadata.description} />
//         <meta name='viewport' content={metadata.viewport} />

//         {/* Open Graph Meta Tags */}
//         <meta
//           property='og:title'
//           content='M.N. Traiteur - Livraison de plats chauds'
//         />
//         <meta property='og:description' content={metadata.description} />
//         <meta property='og:image' content='/path_to_your_image.jpg' />
//         <meta property='og:url' content='https://mn-traiteur.netlify.app' />
//         <meta property='og:type' content='website' />

//         {/* Twitter Card Meta Tags */}
//         <meta name='twitter:card' content='summary_large_image' />
//         <meta
//           name='twitter:title'
//           content='M.N. Traiteur - Livraison de plats chauds'
//         />
//         <meta name='twitter:description' content={metadata.description} />
//         <meta name='twitter:image' content='/path_to_your_image.jpg' />
//         <meta name='twitter:url' content='https://mn-traiteur.netlify.app' />

//         {/* Icons */}
//         <link rel='icon' href='/favicon.ico' sizes='any' />
//         <link
//           rel='icon'
//           href='/favicon-16x16.png'
//           type='image/png'
//           sizes='16x16'
//         />
//         <link
//           rel='icon'
//           href='/favicon-32x32.png'
//           type='image/png'
//           sizes='32x32'
//         />
//         <link
//           rel='apple-touch-icon'
//           href='/apple-touch-icon.png'
//           sizes='180x180'
//         />
//       </head>
//       <body className={`${inter.className} overflow-x-hidden`}>
//         <div className='overflow-x-hidden w-full'>{children}</div>
//         <Toaster position='top-right' />
//       </body>
//     </html>
//   );
// }

import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "M.N. Traiteur - Livraison de plats chauds",
  description:
    "Découvrez nos délicieuses spécialités françaises préparées avec des ingrédients frais et de qualité, livrées directement chez vous.",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"
};

if (typeof window !== "undefined" && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  });
}

export default function RootLayout({ children }) {
  return (
    <html lang='fr' className='overflow-x-hidden'>
      <head>
        <title>M.N. Traiteur - Livraison de plats chauds</title>

        {/* Manifest link */}
        <link rel='manifest' href='/manifest.json' />

        {/* Meta tags */}
        <meta name='description' content={metadata.description} />
        <meta name='viewport' content={metadata.viewport} />

        {/* Open Graph Meta Tags */}
        <meta
          property='og:title'
          content='M.N. Traiteur - Livraison de plats chauds'
        />
        <meta property='og:description' content={metadata.description} />
        <meta property='og:image' content='/path_to_your_image.jpg' />
        <meta property='og:url' content='https://mn-traiteur.netlify.app' />
        <meta property='og:type' content='website' />

        {/* Twitter Card Meta Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:title'
          content='M.N. Traiteur - Livraison de plats chauds'
        />
        <meta name='twitter:description' content={metadata.description} />
        <meta name='twitter:image' content='/path_to_your_image.jpg' />
        <meta name='twitter:url' content='https://mn-traiteur.netlify.app' />

        {/* Icons */}
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link
          rel='icon'
          href='/favicon-16x16.png'
          type='image/png'
          sizes='16x16'
        />
        <link
          rel='icon'
          href='/favicon-32x32.png'
          type='image/png'
          sizes='32x32'
        />
        <link
          rel='apple-touch-icon'
          href='/apple-touch-icon.png'
          sizes='180x180'
        />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <div className='overflow-x-hidden w-full'>{children}</div>
        <Toaster position='top-right' />
      </body>
    </html>
  );
}
