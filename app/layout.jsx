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
      <head>
        <title>M.N. Traiteur - Restaurant Français</title>
        <meta name='description' content={metadata.description} />
        <meta name='viewport' content={metadata.viewport} />
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
