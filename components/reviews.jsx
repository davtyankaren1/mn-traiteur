"use client";

import { useState, useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import Head from "next/head";

export default function Reviews({ initialReviews = null }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("right");
  const sliderRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Use initialReviews if provided, otherwise use static data
  const reviews = initialReviews || [
    {
      id: 1,
      name: "Emilie Dupont",
      location: "Strasbourg",
      rating: 5,
      text: "Une expérience incroyable avec la Grillade au charbon de bois ! La viande était parfaitement cuite, pleine de saveurs. Livraison rapide et un service impeccable. Je recommande vivement à tous les amateurs de bonne cuisine.",
      dish_type: "Grillade au charbon de bois"
    },
    {
      id: 2,
      name: "Thomas Berger",
      location: "Bischheim",
      rating: 5,
      text: "Les Assiettes sont délicieuses, très bien équilibrées et généreuses. Une livraison rapide et un service soigné. Je suis plus que satisfait de ma commande, c'est une adresse que je vais garder dans mes favoris.",
      dish_type: "Nos Assiettes"
    },
    {
      id: 3,
      name: "Claire Martin",
      location: "Haguenau",
      rating: 5,
      text: "Les Boissons étaient parfaites pour accompagner nos plats. Tout était frais, bien préparé et livré en un rien de temps. C'était une excellente expérience, je reviendrai sans hésiter.",
      dish_type: "Nos Boissons"
    },
    {
      id: 4,
      name: "Julien Lefevre",
      location: "Schiltigheim",
      rating: 5,
      text: "Les Burgers sont absolument délicieux. Chaque bouchée était un régal. Livraison rapide, comme toujours, et présentation impeccable. Je vais certainement recommander à mes amis.",
      dish_type: "Nos Burgers"
    },
    {
      id: 5,
      name: "Sophie Charbonnier",
      location: "Geispolsheim",
      rating: 5,
      text: "Des Desserts à tomber ! Tout était parfait, de la présentation à la saveur. Très rapide et pratique, la livraison a été faite sans aucun souci. C’est une option parfaite pour finir un repas.",
      dish_type: "Nos Desserts"
    },
    {
      id: 6,
      name: "David Muller",
      location: "Strasbourg",
      rating: 5,
      text: "Les Fritures étaient juste parfaites, croustillantes et savoureuses. Je suis ravi de la rapidité de la livraison, et la qualité est toujours au rendez-vous. C'est devenu mon choix préféré pour une soirée tranquille.",
      dish_type: "Nos Fritures"
    },
    {
      id: 7,
      name: "Isabelle Klein",
      location: "Molsheim",
      rating: 5,
      text: "Les Pastas étaient incroyablement bonnes, bien assaisonnées et parfaitement cuites. Livraison rapide et service impeccable. Je suis ravie de chaque commande et je recommande à tout le monde de goûter ces plats.",
      dish_type: "Nos Pastas"
    },
    {
      id: 8,
      name: "Maxime Dupuis",
      location: "Obernai",
      rating: 5,
      text: "Les Pizza sont excellentes, la pâte est parfaite et les ingrédients de qualité. Livraison rapide, tout était encore chaud à l'arrivée. Une expérience vraiment agréable, je reviendrai sans hésiter.",
      dish_type: "Nos Pizza"
    },
    {
      id: 9,
      name: "Nathalie Rousseau",
      location: "Strasbourg",
      rating: 5,
      text: "Les Salads étaient frais, croquants et pleins de saveurs. C'est un excellent choix pour une option saine et gourmande. Livraison rapide et tout était parfaitement emballé. Je recommande vivement.",
      dish_type: "Nos Salads"
    },
    {
      id: 10,
      name: "François Lemoine",
      location: "Saverne",
      rating: 5,
      text: "La qualité est toujours au top, et chaque plat est délicieux. Je suis particulièrement fan des burgers, mais tout le menu est top. Livraison rapide et service au point. Je suis toujours satisfait.",
      dish_type: "Nos Burgers"
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
    <>
      <Head>
        <title>Avis Clients - M.N. Traiteur</title>
        <meta
          name='description'
          content='Découvrez les témoignages de nos clients satisfaits sur M.N. Traiteur. Des plats traditionnels préparés avec amour et des services exceptionnels.'
        />
        <meta property='og:title' content='Avis Clients - M.N. Traiteur' />
        <meta
          property='og:description'
          content='Découvrez les témoignages de nos clients satisfaits sur M.N. Traiteur. Des plats traditionnels préparés avec amour et des services exceptionnels.'
        />
        <meta
          property='og:image'
          content='https://example.com/path-to-image.jpg'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://mntraiteur.fr/avis' />
        <meta name='robots' content='index, follow' />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Review",
              itemReviewed: {
                "@type": "Livraison de plats chauds",
                name: "M.N. Traiteur",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Strasbourg",
                  addressCountry: "FR"
                }
              },
              reviewRating: {
                "@type": "Rating",
                ratingValue: 5,
                bestRating: 5
              },
              author: {
                "@type": "Person",
                name: "Emilie Dupont"
              }
            })
          }}
        />
      </Head>

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
    </>
  );
}
