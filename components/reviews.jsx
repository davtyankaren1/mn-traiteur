"use client";

import { useState, useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("right");
  const sliderRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Static reviews data - TODO: Replace with Redux store data
  const reviews = [
    {
      id: 1,
      name: "Emilie Dupont",
      location: "Strasbourg",
      rating: 5,
      text: "Une expérience fantastique ! Les plats étaient délicieux, surtout le couscous, qui était à tomber. Le service était rapide et très sympathique. Je recommande vivement ce restaurant à tous ceux qui veulent goûter des saveurs authentiques.",
      dish_type: "Couscous"
    },
    {
      id: 2,
      name: "Thomas Berger",
      location: "Bischheim",
      rating: 4,
      text: "J'ai été agréablement surpris par la qualité de la nourriture. Les assiettes étaient bien garnies et pleines de saveurs. Le personnel était attentif et très courtois. Parfait pour une soirée en famille.",
      dish_type: "Cuisine Alsacienne"
    },
    {
      id: 3,
      name: "Claire Martin",
      location: "Haguenau",
      rating: 5,
      text: "Le meilleur restaurant que j'ai visité ces derniers temps ! Les plats sont parfaitement équilibrés, les saveurs sont riches, et l'accueil est exceptionnel. Un vrai moment de plaisir à chaque visite.",
      dish_type: "Cuisine Française"
    },
    {
      id: 4,
      name: "Julien Lefevre",
      location: "Schiltigheim",
      rating: 5,
      text: "Service impeccable et ambiance chaleureuse. Les desserts étaient divins et le plat principal était exquis. Une adresse que je vais certainement recommander à mes amis.",
      dish_type: "Gastronomie Française"
    },
    {
      id: 5,
      name: "Sophie Charbonnier",
      location: "Geispolsheim",
      rating: 4,
      text: "Très bon rapport qualité-prix. Les plats étaient savoureux et bien présentés. Un endroit idéal pour une sortie en famille. Je reviendrai sans hésiter.",
      dish_type: "Pizza"
    },
    {
      id: 6,
      name: "David Muller",
      location: "Strasbourg",
      rating: 5,
      text: "Un repas incroyable, surtout le plat de viande grillée ! Les saveurs étaient parfaites et le service rapide. L'endroit est très agréable, avec une vue magnifique sur la ville.",
      dish_type: "Grillades"
    },
    {
      id: 7,
      name: "Isabelle Klein",
      location: "Molsheim",
      rating: 5,
      text: "Un endroit à découvrir absolument. Les plats étaient délicieux, les portions généreuses, et le personnel très sympathique. Un vrai régal à chaque bouchée.",
      dish_type: "Cuisine Traditionnelle"
    },
    {
      id: 8,
      name: "Maxime Dupuis",
      location: "Obernai",
      rating: 4,
      text: "Très bon restaurant avec une belle ambiance. Le plat principal était un peu trop salé à mon goût, mais le reste était parfait. J'y reviendrai certainement.",
      dish_type: "Cuisine du Terroir"
    },
    {
      id: 9,
      name: "Nathalie Rousseau",
      location: "Strasbourg",
      rating: 5,
      text: "Une expérience culinaire inoubliable. Les plats étaient préparés avec soin, et les saveurs étaient équilibrées. Je recommande vivement cet endroit pour tous les gourmets.",
      dish_type: "Menu Dégustation"
    },
    {
      id: 10,
      name: "François Lemoine",
      location: "Saverne",
      rating: 4,
      text: "Très bon restaurant avec des produits frais. Le service était rapide, mais j'ai trouvé que le menu manquait un peu de variété. Néanmoins, une excellente adresse à découvrir.",
      dish_type: "Cuisine Française"
    }
  ];

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Number of cards to display based on screen size
  const cardsToShow = isMobile ? 1 : 3;

  const nextSlide = () => {
    if (isAnimating || reviews.length === 0) return;
    setDirection("right");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev + 1 >= reviews.length - (cardsToShow - 1) ? 0 : prev + 1
      );
      setIsAnimating(false);
    }, 500);
  };

  // Auto-play functionality - 5 seconds
  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Changed to 5 seconds
    return () => clearInterval(interval);
  }, [isAnimating, reviews.length]);

  // Get visible reviews
  const visibleReviews = [];
  for (let i = 0; i < cardsToShow; i++) {
    const index = (currentIndex + i) % reviews.length;
    visibleReviews.push(reviews[index]);
  }

  return (
    <section
      className='py-16 lg:py-24 bg-gradient-to-b from-white to-red-50'
      id='reviews'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* New Header Style */}
        <div className='text-center mb-16'>
          <div className='inline-block mb-3'>
            <div className='flex items-center justify-center gap-2'>
              <span className='h-1 w-10 bg-red-600 rounded-full'></span>
              <span className='text-red-600 font-medium uppercase tracking-wider text-sm'>
                AVIS CLIENTS
              </span>
              <span className='h-1 w-10 bg-red-600 rounded-full'></span>
            </div>
          </div>
          <h2
            className='text-3xl lg:text-4xl font-bold text-gray-900 mb-4'
            style={{ fontFamily: "Arial" }}
          >
            Ce que disent nos <span className='text-[#DC2626]'>clients</span>
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Découvrez les témoignages de nos clients satisfaits
          </p>
        </div>

        {/* Large quote icon as background */}
        <div className='relative'>
          <div className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-200/30'>
            <Quote size={120} />
          </div>

          {/* Reviews slider - Added gaps between cards */}
          <div className='relative overflow-visible' ref={sliderRef}>
            <div
              className={`flex gap-6 transition-all duration-500 ease-in-out ${
                isAnimating
                  ? direction === "right"
                    ? "translate-x-[-50px] opacity-0"
                    : "translate-x-[50px] opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              {visibleReviews.map((review, index) => (
                <div
                  key={review.id}
                  className={`review-card ${
                    isMobile ? "w-full" : "flex-1"
                  } bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative flex flex-col border border-red-100`}
                  style={{
                    animationDelay: `${index * 150}ms`,
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  {/* Decorative elements */}
                  <div className='absolute -top-3 -right-3 w-6 h-6 rounded-full bg-red-200'></div>
                  <div className='absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-red-600'></div>

                  <div className='flex-1 flex flex-col'>
                    {/* Rating stars */}
                    <div className='flex mb-5'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating
                              ? "fill-red-500 text-red-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className='ml-2 text-sm text-gray-500'>
                        {review.dish_type}
                      </span>
                    </div>

                    {/* Review text */}
                    <div className='flex-1 overflow-hidden'>
                      <p className='text-gray-700 line-clamp-6 leading-relaxed'>
                        {review.text}
                      </p>
                    </div>
                  </div>

                  {/* Reviewer info - positioned at the bottom with person avatar */}
                  <div className='mt-6 pt-4 border-t border-gray-100'>
                    <div className='flex items-center'>
                      <div className='relative w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-red-600'>
                        <Image
                          src='/avatar-person.png'
                          alt={review.name}
                          fill
                          className='object-cover'
                        />
                      </div>
                      <div>
                        <h4
                          className='font-bold text-gray-900'
                          style={{ fontFamily: "Arial" }}
                        >
                          {review.name}
                        </h4>
                        <p className='text-sm text-gray-500'>
                          {review.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide indicators */}
          <div className='mt-10 flex justify-center gap-2'>
            {reviews
              .slice(0, reviews.length - (cardsToShow - 1))
              .map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating && index !== currentIndex) {
                      setDirection(index > currentIndex ? "right" : "left");
                      setIsAnimating(true);
                      setTimeout(() => {
                        setCurrentIndex(index);
                        setIsAnimating(false);
                      }, 500);
                    }
                  }}
                  className={`h-2 w-8 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-red-600 scale-110"
                      : "bg-gray-300 hover:bg-red-300"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
