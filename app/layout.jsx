import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "M.N. Traiteur - Restaurant Français",
  description:
    "Cuisine française traditionnelle et moderne préparée avec des ingrédients naturels et beaucoup d'amour",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"
};

export default function RootLayout({ children }) {
  return (
    <html lang='fr' className='overflow-x-hidden'>
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

      <head>
        <link rel='manifest' href='/manifest.json' />
        <title>M.N. Traiteur - Restaurant Français</title>
        <meta name='description' content={metadata.description} />
        <meta name='viewport' content={metadata.viewport} />

        {/* Open Graph Meta Tags */}
        <meta
          property='og:title'
          content='M.N. Traiteur - Restaurant Français'
        />
        <meta property='og:description' content={metadata.description} />
        <meta property='og:image' content='/path_to_your_image.jpg' />
        <meta property='og:url' content='https://mn-traiteur.netlify.app' />
        <meta property='og:type' content='website' />

        {/* Twitter Card Meta Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:title'
          content='M.N. Traiteur - Restaurant Français'
        />
        <meta name='twitter:description' content={metadata.description} />
        <meta name='twitter:image' content='/path_to_your_image.jpg' />
        <meta name='twitter:url' content='https://mn-traiteur.netlify.app' />

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
