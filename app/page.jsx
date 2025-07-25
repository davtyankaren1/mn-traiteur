"use client";

import { useState } from "react";
import Header from "components/header";
import { CartProvider } from "contexts/cart-context";
import LoadingScreen from "components/loading-screen";
import Hero from "components/hero";
import Menu from "components/menu";
import About from "components/about";
import Reviews from "components/reviews";
import Contact from "components/contact";
import Footer from "@/components/footer";
import Cart from "@/components/cart";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <CartProvider>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

      {/* Main Content */}
      <div
        className={`min-h-screen bg-white overflow-x-hidden transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Header onCartClick={() => setIsCartOpen(true)} />
        <main className='overflow-x-hidden'>
          <Hero />
          <Menu />
          <About />
          <Reviews />
          <Contact />
        </main>
        <Footer />
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartProvider>
  );
}
