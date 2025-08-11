"use client";

import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import Header from "@/components/header";
import LoadingScreen from "@/components/loading-screen";
import Hero from "@/components/hero";
import MenuRedux from "@/components/menu-redux";
import About from "@/components/about";
import Reviews from "@/components/reviews";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import CartRedux from "@/components/cart-redux";
import { initializeCart } from "@/redux/slices/cartSlice";

export default function ClientPage({ initialHeroSlides, initialMenuData, initialReviews }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  // Initialize cart from localStorage on component mount
  useEffect(() => {
    dispatch(initializeCart());
  }, [dispatch]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
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
          {/* Section IDs added for navigation and SEO */}
          <section id="hero">
            <Hero initialSlides={initialHeroSlides} />
          </section>
          
          <section id="menu">
            <MenuRedux initialMenuData={initialMenuData} />
          </section>
          
          <section id="about">
            <About />
          </section>
          
          <section id="reviews">
            <Reviews initialReviews={initialReviews} />
          </section>
          
          <section id="contact">
            <Contact />
          </section>
        </main>
        <Footer />
        <CartRedux isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </>
  );
}
