"use client";

import { Award, Heart, Users, Clock } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "../components/ui/card";
import Head from "next/head";

export default function About() {
  const features = [
    {
      icon: Heart,
      title: "Préparé avec Amour",
      description: "Chaque plat est préparé avec amour et attention",
      mobileDescription: "Plats préparés avec amour"
    },
    {
      icon: Award,
      title: "Ingrédients de Qualité",
      description:
        "Seulement des ingrédients frais et de haute qualité pour nos plats",
      mobileDescription: "Ingrédients frais et de qualité"
    },
    {
      icon: Users,
      title: "Ambiance Familiale",
      description:
        "Atmosphère chaleureuse et accueillante pour tous nos clients",
      mobileDescription: "Atmosphère chaleureuse"
    },
    {
      icon: Clock,
      title: "Recettes Traditionnelles",
      description:
        "Recettes françaises traditionnelles transmises de génération en génération",
      mobileDescription: "Recettes traditionnelles françaises"
    }
  ];

  return (
    <>
      <Head>
        <title>
          À propos de M.N. Traiteur - Traiteur français traditionnel
        </title>
        <meta
          name='description'
          content="Découvrez l'histoire et les valeurs de M.N. Traiteur, un traiteur français spécialisé dans des plats préparés avec amour, des ingrédients de qualité, et une ambiance familiale."
        />
        <meta
          property='og:title'
          content='À propos de M.N. Traiteur - Traiteur français traditionnel'
        />
        <meta
          property='og:description'
          content="Découvrez l'histoire et les valeurs de M.N. Traiteur, un traiteur français spécialisé dans des plats préparés avec amour, des ingrédients de qualité, et une ambiance familiale."
        />
        <meta
          property='og:image'
          content='https://example.com/path-to-your-image.jpg'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://mntraiteur.fr/a-propos' />
        <meta name='robots' content='index, follow' />
      </Head>

      <style jsx>{`
        @keyframes float3D {
          0%,
          100% {
            transform: perspective(1000px) rotateX(0deg) rotateY(0deg)
              rotateZ(0deg) translateZ(0px);
          }
          25% {
            transform: perspective(1000px) rotateX(5deg) rotateY(15deg)
              rotateZ(-2deg) translateZ(20px);
          }
          50% {
            transform: perspective(1000px) rotateX(-3deg) rotateY(-10deg)
              rotateZ(1deg) translateZ(30px);
          }
          75% {
            transform: perspective(1000px) rotateX(7deg) rotateY(8deg)
              rotateZ(-1deg) translateZ(15px);
          }
        }

        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(220, 38, 38, 0.3),
              0 0 40px rgba(220, 38, 38, 0.2), 0 0 60px rgba(220, 38, 38, 0.1);
          }
          50% {
            box-shadow: 0 0 30px rgba(220, 38, 38, 0.5),
              0 0 60px rgba(220, 38, 38, 0.3), 0 0 90px rgba(220, 38, 38, 0.2);
          }
        }

        @keyframes pulse3D {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .logo-3d {
          animation: float3D 6s ease-in-out infinite,
            glow 3s ease-in-out infinite alternate;
          transform-style: preserve-3d;
          filter: drop-shadow(0 10px 20px rgba(220, 38, 38, 0.3));
        }

        .logo-container {
          perspective: 1200px;
          transform-style: preserve-3d;
        }

        .logo-3d:hover {
          animation: float3D 2s ease-in-out infinite,
            glow 1s ease-in-out infinite alternate,
            pulse3D 2s ease-in-out infinite;
        }

        @keyframes cardFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .feature-card {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .feature-card:hover {
          animation: cardFloat 2s ease-in-out infinite;
          box-shadow: 0 20px 40px rgba(220, 38, 38, 0.15);
        }

        .icon-circle {
          background: linear-gradient(135deg, #dc2626, #ef4444);
          transition: all 0.3s ease;
        }

        .feature-card:hover .icon-circle {
          background: linear-gradient(135deg, #ef4444, #f87171);
          transform: scale(1.1) rotate(5deg);
        }
      `}</style>

      <section
        id='about'
        className='py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* New Header Style */}
          <div className='text-center mb-16'>
            <div className='inline-block mb-3'>
              <div className='flex items-center justify-center gap-2'>
                <span className='h-1 w-10 bg-red-600 rounded-full'></span>
                <span className='text-red-600 font-medium uppercase tracking-wider text-sm'>
                  À PROPOS
                </span>
                <span className='h-1 w-10 bg-red-600 rounded-full'></span>
              </div>
            </div>
            <h2
              className='text-3xl lg:text-4xl font-bold text-gray-900 mb-4'
              style={{ fontFamily: "Arial" }}
            >
              À propos de <span className='text-[#DC2626]'>M.N. Traiteur</span>
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Notre histoire, nos valeurs et ce qui nous distingue des autres
            </p>
          </div>

          <div className='grid lg:grid-cols-2 gap-8 items-center mb-16'>
            <div className='space-y-6'>
              <div className='space-y-4'>
                <h3
                  className='text-2xl font-bold text-gray-900'
                  style={{ fontFamily: "Arial" }}
                >
                  Notre Histoire
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  M.N. Traiteur a été fondé en 2015 avec l'objectif d'apporter
                  le vrai goût de la cuisine française traditionnelle à nos
                  clients. Notre nom symbolise la parfaite combinaison du feu et
                  de la saveur.
                </p>
                <p className='text-gray-600 leading-relaxed'>
                  Au fil des années, nous sommes devenus réputés pour notre
                  service de qualité, nos ingrédients frais et nos recettes
                  traditionnelles. Chacun de nos plats est préparé avec amour et
                  une grande attention aux détails.
                </p>
              </div>
            </div>

            {/* 3D Animated Logo */}
            <div className='relative flex justify-center lg:justify-end'>
              <div className='logo-container relative'>
                <div className='logo-3d relative rounded-2xl overflow-hidden w-full max-w-sm bg-gradient-to-br from-white to-gray-50 p-6 border border-red-100'>
                  <Image
                    src='/logo.png'
                    alt='M.N. Traiteur Logo 3D'
                    width={320}
                    height={160}
                    className='w-full h-auto'
                    priority
                  />

                  {/* Floating particles around logo */}
                  <div
                    className='absolute top-4 left-4 w-2 h-2 bg-red-400 rounded-full opacity-60 animate-bounce'
                    style={{ animationDelay: "0s" }}
                  ></div>
                  <div
                    className='absolute top-8 right-6 w-1.5 h-1.5 bg-red-500 rounded-full opacity-70 animate-bounce'
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className='absolute bottom-6 left-8 w-1 h-1 bg-red-600 rounded-full opacity-50 animate-bounce'
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <div
                    className='absolute bottom-4 right-4 w-2.5 h-2.5 bg-red-400 rounded-full opacity-60 animate-bounce'
                    style={{ animationDelay: "1.5s" }}
                  ></div>

                  {/* Experience Badge - Bottom Left */}
                  <div className='absolute bottom-4 left-4 bg-gradient-to-r from-red-600 to-red-700 p-3 rounded-xl shadow-xl z-10 transform hover:scale-105 transition-transform duration-300'>
                    <div className='text-center'>
                      <div className='text-xl font-bold text-white'>9+</div>
                      <div className='text-xs text-white/90'>
                        Ans d'expérience
                      </div>
                    </div>
                  </div>

                  {/* Customers Badge - Top Right */}
                  <div className='absolute top-4 right-4 bg-gradient-to-r from-red-600 to-red-700 p-3 rounded-xl shadow-xl z-10 transform hover:scale-105 transition-transform duration-300'>
                    <div className='text-center'>
                      <div className='text-xl font-bold text-white'>2000+</div>
                      <div className='text-xs text-white/90'>
                        Clients satisfaits
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modern Features Grid - Mobile Optimized */}
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6'>
            {features.map((feature, index) => (
              <Card
                key={index}
                className='feature-card text-center border-0 shadow-lg bg-white group'
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className='p-4 lg:p-8'>
                  <div className='icon-circle w-12 h-12 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-6 relative overflow-hidden'>
                    <feature.icon className='w-6 h-6 lg:w-10 lg:h-10 text-white relative z-10' />
                    <div className='absolute inset-0 bg-gradient-to-br from-red-400/20 to-red-600/20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500'></div>
                  </div>
                  <h3 className='text-sm lg:text-xl font-bold text-gray-900 mb-2 lg:mb-4 group-hover:text-red-600 transition-colors duration-300 leading-tight'>
                    {feature.title}
                  </h3>
                  {/* Mobile: Show shorter description, Desktop: Show full description */}
                  <p className='text-gray-600 text-xs lg:text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300 block lg:hidden'>
                    {feature.mobileDescription}
                  </p>
                  <p className='text-gray-600 text-xs lg:text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300 hidden lg:block'>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
