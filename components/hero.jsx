// "use client";

// import { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// // TODO: Replace with Redux store data
// const heroSlides = [
//   {
//     id: 8,
//     image: "/burgers-hero.jpg",
//     title: "Burgers Gourmands",
//     subtitle:
//       "Burgers faits maison avec des ingrédients frais et des pains artisanaux"
//   },
//   {
//     id: 7,
//     image: "/hero-pizza.jpeg",
//     title: "Pizzas Artisanales",
//     subtitle:
//       "Pizzas cuites au four traditionnel avec garnitures généreuses et fromages de qualité"
//   },
//   {
//     id: 6,
//     image: "/hero-pasta.jpeg",
//     title: "Pâtes Fraîches",
//     subtitle:
//       "Pâtes italiennes authentiques avec sauces maison et ingrédients frais"
//   },
//   {
//     id: 2,
//     image: "/hero-2.png",
//     title: "Grillades Savoureuses",
//     subtitle:
//       "Viandes fraîches et recettes traditionnelles pour des grillades parfaites"
//   },
//   {
//     id: 3,
//     image: "/hero-3.png",
//     title: "Préparation Traditionnelle",
//     subtitle: "Cuisson au feu de bois pour un goût authentiquement français"
//   },
//   {
//     id: 4,
//     image: "/hero-4.png",
//     title: "Plats de Qualité",
//     subtitle:
//       "Chaque plat est préparé avec une grande attention et beaucoup d'amour"
//   },
//   {
//     id: 5,
//     image: "/hero-tiramisu.webp",
//     title: "Desserts Artisanaux",
//     subtitle:
//       "Tiramisus faits maison et desserts traditionnels préparés avec passion"
//   },
//   {
//     id: 1,
//     image: "/hero-1.png",
//     title: "Bienvenue chez M.N. Traiteur",
//     subtitle:
//       "Cuisine française traditionnelle préparée avec des ingrédients naturels et beaucoup d'amour"
//   }
// ];

// export default function Hero() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   useEffect(() => {
//     if (!isAutoPlaying) return;

//     const interval = setInterval(() => {
//       handleSlideChange((prev) => (prev + 1) % heroSlides.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [isAutoPlaying]);

//   const handleSlideChange = (newIndex) => {
//     setIsTransitioning(true);
//     setTimeout(() => {
//       if (typeof newIndex === "function") {
//         setCurrentSlide(newIndex);
//       } else {
//         setCurrentSlide(newIndex);
//       }
//       setTimeout(() => setIsTransitioning(false), 50);
//     }, 300);
//   };

//   const scrollToMenu = () => {
//     const menuElement = document.getElementById("menu");
//     if (menuElement) {
//       menuElement.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   const goToPrevious = () => {
//     handleSlideChange(
//       (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
//     );
//     setIsAutoPlaying(false);
//   };

//   const goToNext = () => {
//     handleSlideChange((prev) => (prev + 1) % heroSlides.length);
//     setIsAutoPlaying(false);
//   };

//   const goToSlide = (index) => {
//     handleSlideChange(index);
//     setIsAutoPlaying(false);
//   };

//   return (
//     <>
//       <style jsx>{`
//         @keyframes float-up-down {
//           0%,
//           100% {
//             transform: translateY(0px) translateX(0px);
//           }
//           25% {
//             transform: translateY(-20px) translateX(10px);
//           }
//           50% {
//             transform: translateY(-40px) translateX(-5px);
//           }
//           75% {
//             transform: translateY(-15px) translateX(15px);
//           }
//         }

//         @keyframes float-left-right {
//           0%,
//           100% {
//             transform: translateX(0px) translateY(0px);
//           }
//           25% {
//             transform: translateX(30px) translateY(-10px);
//           }
//           50% {
//             transform: translateX(-20px) translateY(20px);
//           }
//           75% {
//             transform: translateX(25px) translateY(-5px);
//           }
//         }

//         @keyframes float-diagonal {
//           0%,
//           100% {
//             transform: translate(0px, 0px);
//           }
//           25% {
//             transform: translate(20px, -30px);
//           }
//           50% {
//             transform: translate(-15px, -10px);
//           }
//           75% {
//             transform: translate(10px, -25px);
//           }
//         }

//         @keyframes float-circular {
//           0% {
//             transform: translate(0px, 0px);
//           }
//           25% {
//             transform: translate(15px, -15px);
//           }
//           50% {
//             transform: translate(0px, -30px);
//           }
//           75% {
//             transform: translate(-15px, -15px);
//           }
//           100% {
//             transform: translate(0px, 0px);
//           }
//         }

//         @keyframes float-random-1 {
//           0%,
//           100% {
//             transform: translate(0px, 0px);
//           }
//           20% {
//             transform: translate(25px, -20px);
//           }
//           40% {
//             transform: translate(-10px, -35px);
//           }
//           60% {
//             transform: translate(30px, -10px);
//           }
//           80% {
//             transform: translate(-5px, -25px);
//           }
//         }

//         @keyframes float-random-2 {
//           0%,
//           100% {
//             transform: translate(0px, 0px);
//           }
//           15% {
//             transform: translate(-20px, 15px);
//           }
//           35% {
//             transform: translate(25px, -25px);
//           }
//           55% {
//             transform: translate(-15px, -5px);
//           }
//           75% {
//             transform: translate(20px, -30px);
//           }
//         }

//         @keyframes float-random-3 {
//           0%,
//           100% {
//             transform: translate(0px, 0px);
//           }
//           30% {
//             transform: translate(15px, 25px);
//           }
//           50% {
//             transform: translate(-25px, -15px);
//           }
//           70% {
//             transform: translate(10px, -20px);
//           }
//         }

//         .float-up-down {
//           animation: float-up-down 4s ease-in-out infinite;
//         }
//         .float-left-right {
//           animation: float-left-right 5s ease-in-out infinite;
//         }
//         .float-diagonal {
//           animation: float-diagonal 3.5s ease-in-out infinite;
//         }
//         .float-circular {
//           animation: float-circular 6s ease-in-out infinite;
//         }
//         .float-random-1 {
//           animation: float-random-1 7s ease-in-out infinite;
//         }
//         .float-random-2 {
//           animation: float-random-2 5.5s ease-in-out infinite;
//         }
//         .float-random-3 {
//           animation: float-random-3 4.5s ease-in-out infinite;
//         }
//       `}</style>

//       <section
//         id='hero'
//         className='relative min-h-screen flex items-center justify-center overflow-hidden w-full'
//       >
//         {/* Slider Container */}
//         <div className='absolute inset-0 w-full'>
//           {heroSlides.map((slide, index) => (
//             <div
//               key={slide.id}
//               className={`absolute inset-0 w-full transition-all duration-700 ease-in-out ${
//                 index === currentSlide
//                   ? "opacity-100 scale-100"
//                   : "opacity-0 scale-105"
//               }`}
//             >
//               <Image
//                 src={slide.image || "/placeholder.svg"}
//                 alt={slide.title}
//                 fill
//                 className='object-cover brightness-75 contrast-110 saturate-110 w-full'
//                 priority={index === 0}
//               />
//             </div>
//           ))}

//           {/* Black-Red Gradient Overlay */}
//           <div className='absolute inset-0 bg-gradient-to-br from-black/60 via-red-900/40 to-black/50 w-full'></div>

//           {/* Enhanced Random Moving Lights Effect */}
//           <div className='absolute inset-0 overflow-hidden pointer-events-none w-full'>
//             {/* Large floating orbs with random movement */}
//             <div className='absolute top-1/4 left-1/4 w-4 h-4 bg-white/50 rounded-full float-up-down'></div>
//             <div
//               className='absolute top-1/3 right-1/3 w-3 h-3 bg-white/60 rounded-full float-left-right'
//               style={{ animationDelay: "1s" }}
//             ></div>
//             <div
//               className='absolute bottom-1/4 left-1/3 w-3.5 h-3.5 bg-white/40 rounded-full float-diagonal'
//               style={{ animationDelay: "2s" }}
//             ></div>
//             <div
//               className='absolute top-1/2 right-1/4 w-2.5 h-2.5 bg-white/50 rounded-full float-circular'
//               style={{ animationDelay: "3s" }}
//             ></div>
//             <div
//               className='absolute bottom-1/3 right-1/2 w-4 h-4 bg-white/45 rounded-full float-random-1'
//               style={{ animationDelay: "4s" }}
//             ></div>

//             {/* Medium twinkling stars with different movements */}
//             <div
//               className='absolute top-1/6 left-1/6 w-1.5 h-1.5 bg-white/70 rounded-full float-random-2'
//               style={{ animationDelay: "0.5s" }}
//             ></div>
//             <div
//               className='absolute top-2/3 right-1/6 w-1.5 h-1.5 bg-white/60 rounded-full float-up-down'
//               style={{ animationDelay: "1.5s" }}
//             ></div>
//             <div
//               className='absolute bottom-1/6 left-2/3 w-1.5 h-1.5 bg-white/55 rounded-full float-left-right'
//               style={{ animationDelay: "2.5s" }}
//             ></div>
//             <div
//               className='absolute top-1/5 right-2/5 w-1.5 h-1.5 bg-white/65 rounded-full float-diagonal'
//               style={{ animationDelay: "3.5s" }}
//             ></div>

//             {/* Small particles with varied animations */}
//             <div
//               className='absolute top-1/8 left-3/4 w-2 h-2 bg-white/50 rounded-full float-circular'
//               style={{ animationDelay: "0.8s" }}
//             ></div>
//             <div
//               className='absolute bottom-1/8 right-3/4 w-1.5 h-1.5 bg-white/60 rounded-full float-random-3'
//               style={{ animationDelay: "2.2s" }}
//             ></div>
//             <div
//               className='absolute top-5/6 left-1/8 w-2.5 h-2.5 bg-white/40 rounded-full float-up-down'
//               style={{ animationDelay: "3.8s" }}
//             ></div>
//             <div
//               className='absolute bottom-5/6 right-1/8 w-2 h-2 bg-white/45 rounded-full float-left-right'
//               style={{ animationDelay: "4.2s" }}
//             ></div>

//             {/* Additional random particles */}
//             <div
//               className='absolute top-3/8 left-1/5 w-1 h-1 bg-white/75 rounded-full float-random-2'
//               style={{ animationDelay: "0.3s" }}
//             ></div>
//             <div
//               className='absolute bottom-3/8 right-1/5 w-1 h-1 bg-white/70 rounded-full float-diagonal'
//               style={{ animationDelay: "1.8s" }}
//             ></div>
//             <div
//               className='absolute top-7/8 left-3/5 w-1.5 h-1.5 bg-white/50 rounded-full float-circular'
//               style={{ animationDelay: "2.8s" }}
//             ></div>
//             <div
//               className='absolute bottom-7/8 right-3/5 w-1 h-1 bg-white/60 rounded-full float-random-3'
//               style={{ animationDelay: "4.5s" }}
//             ></div>

//             {/* Corner particles */}
//             <div
//               className='absolute top-1/12 left-1/12 w-2 h-2 bg-white/40 rounded-full float-up-down'
//               style={{ animationDelay: "0.7s" }}
//             ></div>
//             <div
//               className='absolute top-1/12 right-1/12 w-1.5 h-1.5 bg-white/50 rounded-full float-left-right'
//               style={{ animationDelay: "1.3s" }}
//             ></div>
//             <div
//               className='absolute bottom-1/12 left-1/12 w-1.5 h-1.5 bg-white/45 rounded-full float-diagonal'
//               style={{ animationDelay: "2.7s" }}
//             ></div>
//             <div
//               className='absolute bottom-1/12 right-1/12 w-2 h-2 bg-white/55 rounded-full float-random-1'
//               style={{ animationDelay: "3.3s" }}
//             ></div>

//             {/* Large glowing particles with blur and movement */}
//             <div className='absolute top-1/5 right-1/5 w-5 h-5 bg-white/30 rounded-full blur-sm float-circular'></div>
//             <div
//               className='absolute bottom-1/5 left-1/5 w-4 h-4 bg-white/35 rounded-full blur-sm float-random-2'
//               style={{ animationDelay: "1.5s" }}
//             ></div>
//             <div
//               className='absolute top-3/4 right-1/3 w-3 h-3 bg-white/40 rounded-full blur-sm float-up-down'
//               style={{ animationDelay: "3s" }}
//             ></div>
//             <div
//               className='absolute bottom-2/3 left-3/4 w-3.5 h-3.5 bg-white/25 rounded-full blur-sm float-left-right'
//               style={{ animationDelay: "4.5s" }}
//             ></div>

//             {/* Extra scattered particles */}
//             <div
//               className='absolute top-2/5 left-4/5 w-1 h-1 bg-white/75 rounded-full float-random-3'
//               style={{ animationDelay: "0.9s" }}
//             ></div>
//             <div
//               className='absolute bottom-2/5 right-4/5 w-1 h-1 bg-white/65 rounded-full float-diagonal'
//               style={{ animationDelay: "2.1s" }}
//             ></div>
//             <div
//               className='absolute top-4/5 left-2/5 w-1.5 h-1.5 bg-white/55 rounded-full float-circular'
//               style={{ animationDelay: "3.1s" }}
//             ></div>
//             <div
//               className='absolute bottom-4/5 right-2/5 w-1 h-1 bg-white/70 rounded-full float-random-1'
//               style={{ animationDelay: "4.1s" }}
//             ></div>

//             <div
//               className='absolute top-1/3 left-1/7 w-0.5 h-0.5 bg-white/80 rounded-full float-up-down'
//               style={{ animationDelay: "0.4s" }}
//             ></div>
//             <div
//               className='absolute bottom-1/3 right-1/7 w-0.5 h-0.5 bg-white/70 rounded-full float-left-right'
//               style={{ animationDelay: "1.7s" }}
//             ></div>
//             <div
//               className='absolute top-2/7 left-5/7 w-0.5 h-0.5 bg-white/60 rounded-full float-diagonal'
//               style={{ animationDelay: "2.9s" }}
//             ></div>
//             <div
//               className='absolute bottom-2/7 right-5/7 w-0.5 h-0.5 bg-white/75 rounded-full float-random-2'
//               style={{ animationDelay: "4.3s" }}
//             ></div>
//           </div>
//         </div>

//         {/* Desktop Navigation Arrows - Only show on large screens (1024px+) */}
//         <Button
//           variant='ghost'
//           onClick={goToPrevious}
//           className='hidden lg:flex absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/50 text-white border border-white/30 backdrop-blur-sm z-10 w-14 h-14 items-center justify-center'
//         >
//           <ChevronLeft className='h-8 w-8' />
//         </Button>

//         <Button
//           variant='ghost'
//           onClick={goToNext}
//           className='hidden lg:flex absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/50 text-white border border-white/30 backdrop-blur-sm z-10 w-14 h-14 items-center justify-center'
//         >
//           <ChevronRight className='h-8 w-8' />
//         </Button>

//         {/* Mobile & Tablet Navigation Arrows - Only show on screens smaller than 1024px */}
//         <div className='flex lg:hidden absolute bottom-20 left-1/2 transform -translate-x-1/2 space-x-4 z-10'>
//           <Button
//             variant='ghost'
//             size='icon'
//             onClick={goToPrevious}
//             className='bg-white/20 hover:bg-white/40 text-white border border-white/30 backdrop-blur-sm w-12 h-12 flex items-center justify-center'
//           >
//             <ChevronLeft className='h-5 w-5' />
//           </Button>
//           <Button
//             variant='ghost'
//             size='icon'
//             onClick={goToNext}
//             className='bg-white/20 hover:bg-white/40 text-white border border-white/30 backdrop-blur-sm w-12 h-12 flex items-center justify-center'
//           >
//             <ChevronRight className='h-5 w-5' />
//           </Button>
//         </div>

//         {/* Content */}
//         <div className='relative z-10 text-center text-white px-4 max-w-4xl mx-auto w-full'>
//           <h1
//             className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight transition-all duration-700 ease-out ${
//               isTransitioning
//                 ? "opacity-0 transform translate-y-8"
//                 : "opacity-100 transform translate-y-0"
//             }`}
//             style={{ fontFamily: "Arial" }}
//           >
//             {heroSlides[currentSlide].title}
//           </h1>
//           <p
//             className={`text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed font-medium transition-all duration-700 ease-out ${
//               isTransitioning
//                 ? "opacity-0 transform translate-y-8"
//                 : "opacity-100 transform translate-y-0"
//             }`}
//             style={{ fontFamily: "Arial", transitionDelay: "100ms" }}
//           >
//             {heroSlides[currentSlide].subtitle}
//           </p>
//           <Button
//             onClick={scrollToMenu}
//             size='lg'
//             className={`bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold transition-all duration-700 transform hover:scale-105 shadow-lg ${
//               isTransitioning
//                 ? "opacity-0 translate-y-8"
//                 : "opacity-100 translate-y-0"
//             }`}
//             style={{ fontFamily: "Arial", transitionDelay: "200ms" }}
//           >
//             Voir le menu
//           </Button>
//         </div>

//         {/* Dots Indicator */}
//         <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10'>
//           {heroSlides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 index === currentSlide
//                   ? "bg-white scale-125"
//                   : "bg-white/50 hover:bg-white/75"
//               }`}
//             />
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHeroSlides } from "@/hooks/useHeroSlides";

export default function Hero() {
  const { slides: heroSlides, isLoading, error } = useHeroSlides();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  console.log(heroSlides, "slides");

  // Reset currentSlide when slides change
  useEffect(() => {
    if (heroSlides.length > 0 && currentSlide >= heroSlides.length) {
      setCurrentSlide(0);
    }
  }, [heroSlides.length, currentSlide]);

  useEffect(() => {
    if (!isAutoPlaying || heroSlides.length === 0) return;
    const interval = setInterval(() => {
      handleSlideChange((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const handleSlideChange = (newIndex) => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (typeof newIndex === "function") {
        setCurrentSlide(newIndex);
      } else {
        setCurrentSlide(newIndex);
      }
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  const scrollToMenu = () => {
    const menuElement = document.getElementById("menu");
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToPrevious = () => {
    if (heroSlides.length === 0) return;
    handleSlideChange(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    if (heroSlides.length === 0) return;
    handleSlideChange((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    handleSlideChange(index);
    setIsAutoPlaying(false);
  };

  // Loading state
  if (isLoading) {
    return (
      <section
        id='hero'
        className='relative min-h-screen flex items-center justify-center overflow-hidden w-full bg-gradient-to-br from-black/60 via-red-900/40 to-black/50'
      >
        <div className='text-center text-white'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
          <p className='text-lg'>Chargement des slides...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error || heroSlides.length === 0) {
    return (
      <section
        id='hero'
        className='relative min-h-screen flex items-center justify-center overflow-hidden w-full bg-gradient-to-br from-black/60 via-red-900/40 to-black/50'
      >
        <div className='text-center text-white max-w-md'>
          <h1 className='text-3xl md:text-5xl font-bold mb-4'>
            Welcome to M.N. Traiteur
          </h1>
          <p className='text-lg mb-8 text-white/90'>
            {error ||
              "Aucun slide hero disponible. Veuillez en ajouter dans le panneau d'administration."}
          </p>
          <Button
            onClick={scrollToMenu}
            size='lg'
            className='bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold'
          >
            Voir le menu
          </Button>
        </div>
      </section>
    );
  }

  return (
    <>
      <style>{`
        @keyframes float-up-down {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-5px);
          }
          75% {
            transform: translateY(-15px) translateX(15px);
          }
        }
        @keyframes float-left-right {
          0%,
          100% {
            transform: translateX(0px) translateY(0px);
          }
          25% {
            transform: translateX(30px) translateY(-10px);
          }
          50% {
            transform: translateX(-20px) translateY(20px);
          }
          75% {
            transform: translateX(25px) translateY(-5px);
          }
        }
        @keyframes float-diagonal {
          0%,
          100% {
            transform: translate(0px, 0px);
          }
          25% {
            transform: translate(20px, -30px);
          }
          50% {
            transform: translate(-15px, -10px);
          }
          75% {
            transform: translate(10px, -25px);
          }
        }
        @keyframes float-circular {
          0% {
            transform: translate(0px, 0px);
          }
          25% {
            transform: translate(15px, -15px);
          }
          50% {
            transform: translate(0px, -30px);
          }
          75% {
            transform: translate(-15px, -15px);
          }
          100% {
            transform: translate(0px, 0px);
          }
        }
        @keyframes float-random-1 {
          0%,
          100% {
            transform: translate(0px, 0px);
          }
          20% {
            transform: translate(25px, -20px);
          }
          40% {
            transform: translate(-10px, -35px);
          }
          60% {
            transform: translate(30px, -10px);
          }
          80% {
            transform: translate(-5px, -25px);
          }
        }
        @keyframes float-random-2 {
          0%,
          100% {
            transform: translate(0px, 0px);
          }
          15% {
            transform: translate(-20px, 15px);
          }
          35% {
            transform: translate(25px, -25px);
          }
          55% {
            transform: translate(-15px, -5px);
          }
          75% {
            transform: translate(20px, -30px);
          }
        }
        @keyframes float-random-3 {
          0%,
          100% {
            transform: translate(0px, 0px);
          }
          30% {
            transform: translate(15px, 25px);
          }
          50% {
            transform: translate(-25px, -15px);
          }
          70% {
            transform: translate(10px, -20px);
          }
        }
        .float-up-down {
          animation: float-up-down 4s ease-in-out infinite;
        }
        .float-left-right {
          animation: float-left-right 5s ease-in-out infinite;
        }
        .float-diagonal {
          animation: float-diagonal 3.5s ease-in-out infinite;
        }
        .float-circular {
          animation: float-circular 6s ease-in-out infinite;
        }
        .float-random-1 {
          animation: float-random-1 7s ease-in-out infinite;
        }
        .float-random-2 {
          animation: float-random-2 5.5s ease-in-out infinite;
        }
        .float-random-3 {
          animation: float-random-3 4.5s ease-in-out infinite;
        }
      `}</style>
      <section
        id='hero'
        className='relative min-h-screen flex items-center justify-center overflow-hidden w-full'
      >
        {/* Slider Container */}
        <div className='absolute inset-0 w-full'>
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full transition-all duration-700 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            >
              <img
                src={
                  slide.image_url ||
                  "/placeholder.svg?height=1080&width=1920&query=hero background"
                }
                alt={slide.title}
                className='w-full h-full object-cover brightness-75 contrast-110 saturate-110'
              />
            </div>
          ))}
          {/* Black-Red Gradient Overlay */}
          <div className='absolute inset-0 bg-gradient-to-br from-black/60 via-red-900/40 to-black/50 w-full'></div>
          {/* Enhanced Random Moving Lights Effect */}
          <div className='absolute inset-0 overflow-hidden pointer-events-none w-full'>
            {/* Large floating orbs with random movement */}
            <div className='absolute top-1/4 left-1/4 w-4 h-4 bg-white/50 rounded-full float-up-down'></div>
            <div
              className='absolute top-1/3 right-1/3 w-3 h-3 bg-white/60 rounded-full float-left-right'
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className='absolute bottom-1/4 left-1/3 w-3.5 h-3.5 bg-white/40 rounded-full float-diagonal'
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className='absolute top-1/2 right-1/4 w-2.5 h-2.5 bg-white/50 rounded-full float-circular'
              style={{ animationDelay: "3s" }}
            ></div>
            <div
              className='absolute bottom-1/3 right-1/2 w-4 h-4 bg-white/45 rounded-full float-random-1'
              style={{ animationDelay: "4s" }}
            ></div>
            {/* Medium twinkling stars with different movements */}
            <div
              className='absolute top-1/6 left-1/6 w-1.5 h-1.5 bg-white/70 rounded-full float-random-2'
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className='absolute top-2/3 right-1/6 w-1.5 h-1.5 bg-white/60 rounded-full float-up-down'
              style={{ animationDelay: "1.5s" }}
            ></div>
            <div
              className='absolute bottom-1/6 left-2/3 w-1.5 h-1.5 bg-white/55 rounded-full float-left-right'
              style={{ animationDelay: "2.5s" }}
            ></div>
            <div
              className='absolute top-1/5 right-2/5 w-1.5 h-1.5 bg-white/65 rounded-full float-diagonal'
              style={{ animationDelay: "3.5s" }}
            ></div>
            {/* Small particles with varied animations */}
            <div
              className='absolute top-1/8 left-3/4 w-2 h-2 bg-white/50 rounded-full float-circular'
              style={{ animationDelay: "0.8s" }}
            ></div>
            <div
              className='absolute bottom-1/8 right-3/4 w-1.5 h-1.5 bg-white/60 rounded-full float-random-3'
              style={{ animationDelay: "2.2s" }}
            ></div>
            <div
              className='absolute top-5/6 left-1/8 w-2.5 h-2.5 bg-white/40 rounded-full float-up-down'
              style={{ animationDelay: "3.8s" }}
            ></div>
            <div
              className='absolute bottom-5/6 right-1/8 w-2 h-2 bg-white/45 rounded-full float-left-right'
              style={{ animationDelay: "4.2s" }}
            ></div>
            {/* Additional random particles */}
            <div
              className='absolute top-3/8 left-1/5 w-1 h-1 bg-white/75 rounded-full float-random-2'
              style={{ animationDelay: "0.3s" }}
            ></div>
            <div
              className='absolute bottom-3/8 right-1/5 w-1 h-1 bg-white/70 rounded-full float-diagonal'
              style={{ animationDelay: "1.8s" }}
            ></div>
            <div
              className='absolute top-7/8 left-3/5 w-1.5 h-1.5 bg-white/50 rounded-full float-circular'
              style={{ animationDelay: "2.8s" }}
            ></div>
            <div
              className='absolute bottom-7/8 right-3/5 w-1 h-1 bg-white/60 rounded-full float-random-3'
              style={{ animationDelay: "4.5s" }}
            ></div>
            {/* Corner particles */}
            <div
              className='absolute top-1/12 left-1/12 w-2 h-2 bg-white/40 rounded-full float-up-down'
              style={{ animationDelay: "0.7s" }}
            ></div>
            <div
              className='absolute top-1/12 right-1/12 w-1.5 h-1.5 bg-white/50 rounded-full float-left-right'
              style={{ animationDelay: "1.3s" }}
            ></div>
            <div
              className='absolute bottom-1/12 left-1/12 w-1.5 h-1.5 bg-white/45 rounded-full float-diagonal'
              style={{ animationDelay: "2.7s" }}
            ></div>
            <div
              className='absolute bottom-1/12 right-1/12 w-2 h-2 bg-white/55 rounded-full float-random-1'
              style={{ animationDelay: "3.3s" }}
            ></div>
            {/* Large glowing particles with blur and movement */}
            <div className='absolute top-1/5 right-1/5 w-5 h-5 bg-white/30 rounded-full blur-sm float-circular'></div>
            <div
              className='absolute bottom-1/5 left-1/5 w-4 h-4 bg-white/35 rounded-full blur-sm float-random-2'
              style={{ animationDelay: "1.5s" }}
            ></div>
            <div
              className='absolute top-3/4 right-1/3 w-3 h-3 bg-white/40 rounded-full blur-sm float-up-down'
              style={{ animationDelay: "3s" }}
            ></div>
            <div
              className='absolute bottom-2/3 left-3/4 w-3.5 h-3.5 bg-white/25 rounded-full blur-sm float-left-right'
              style={{ animationDelay: "4.5s" }}
            ></div>
            {/* Extra scattered particles */}
            <div
              className='absolute top-2/5 left-4/5 w-1 h-1 bg-white/75 rounded-full float-random-3'
              style={{ animationDelay: "0.9s" }}
            ></div>
            <div
              className='absolute bottom-2/5 right-4/5 w-1 h-1 bg-white/65 rounded-full float-diagonal'
              style={{ animationDelay: "2.1s" }}
            ></div>
            <div
              className='absolute top-4/5 left-2/5 w-1.5 h-1.5 bg-white/55 rounded-full float-circular'
              style={{ animationDelay: "3.1s" }}
            ></div>
            <div
              className='absolute bottom-4/5 right-2/5 w-1 h-1 bg-white/70 rounded-full float-random-1'
              style={{ animationDelay: "4.1s" }}
            ></div>
            <div
              className='absolute top-1/3 left-1/7 w-0.5 h-0.5 bg-white/80 rounded-full float-up-down'
              style={{ animationDelay: "0.4s" }}
            ></div>
            <div
              className='absolute bottom-1/3 right-1/7 w-0.5 h-0.5 bg-white/70 rounded-full float-left-right'
              style={{ animationDelay: "1.7s" }}
            ></div>
            <div
              className='absolute top-2/7 left-5/7 w-0.5 h-0.5 bg-white/60 rounded-full float-diagonal'
              style={{ animationDelay: "2.9s" }}
            ></div>
            <div
              className='absolute bottom-2/7 right-5/7 w-0.5 h-0.5 bg-white/75 rounded-full float-random-2'
              style={{ animationDelay: "4.3s" }}
            ></div>
          </div>
        </div>

        {/* Desktop Navigation Arrows - Only show if there are slides */}
        {heroSlides.length > 1 && (
          <>
            <Button
              variant='ghost'
              onClick={goToPrevious}
              className='hidden lg:flex absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/50 text-white border border-white/30 backdrop-blur-sm z-10 w-14 h-14 items-center justify-center'
            >
              <ChevronLeft className='h-8 w-8' />
            </Button>
            <Button
              variant='ghost'
              onClick={goToNext}
              className='hidden lg:flex absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/50 text-white border border-white/30 backdrop-blur-sm z-10 w-14 h-14 items-center justify-center'
            >
              <ChevronRight className='h-8 w-8' />
            </Button>
            {/* Mobile & Tablet Navigation Arrows */}
            <div className='flex lg:hidden absolute bottom-20 left-1/2 transform -translate-x-1/2 space-x-4 z-10'>
              <Button
                variant='ghost'
                size='icon'
                onClick={goToPrevious}
                className='bg-white/20 hover:bg-white/40 text-white border border-white/30 backdrop-blur-sm w-12 h-12 flex items-center justify-center'
              >
                <ChevronLeft className='h-5 w-5' />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                onClick={goToNext}
                className='bg-white/20 hover:bg-white/40 text-white border border-white/30 backdrop-blur-sm w-12 h-12 flex items-center justify-center'
              >
                <ChevronRight className='h-5 w-5' />
              </Button>
            </div>
          </>
        )}

        {/* Content */}
        <div className='relative z-10 text-center text-white px-4 max-w-4xl mx-auto w-full'>
          <h1
            className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight transition-all duration-700 ease-out ${
              isTransitioning
                ? "opacity-0 transform translate-y-8"
                : "opacity-100 transform translate-y-0"
            }`}
            style={{ fontFamily: "Arial" }}
          >
            {heroSlides[currentSlide]?.title}
          </h1>
          <p
            className={`text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed font-medium transition-all duration-700 ease-out ${
              isTransitioning
                ? "opacity-0 transform translate-y-8"
                : "opacity-100 transform translate-y-0"
            }`}
            style={{ fontFamily: "Arial", transitionDelay: "100ms" }}
          >
            {heroSlides[currentSlide]?.subtitle}
          </p>
          <Button
            onClick={scrollToMenu}
            size='lg'
            className={`bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold transition-all duration-700 transform hover:scale-105 shadow-lg ${
              isTransitioning
                ? "opacity-0 translate-y-8"
                : "opacity-100 translate-y-0"
            }`}
            style={{ fontFamily: "Arial", transitionDelay: "200ms" }}
          >
            Voir le menu
          </Button>
        </div>

        {/* Dots Indicator - Only show if there are multiple slides */}
        {heroSlides.length > 1 && (
          <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10'>
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
