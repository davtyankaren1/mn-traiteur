"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function LoadingScreen({ onLoadingComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Faster loading time - 2 seconds instead of 3
    const minLoadingTime = setTimeout(() => {
      setIsAnimating(false);
      // Start fade out animation
      setTimeout(() => {
        setIsVisible(false);
        onLoadingComplete();
      }, 500); // 500ms fade out duration
    }, 2000); // 2 seconds minimum loading time

    return () => {
      clearTimeout(minLoadingTime);
    };
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .float {
          animation: float 3s ease-in-out infinite;
        }

        .white-bg {
          background: #ffffff;
        }
      `}</style>

      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center white-bg transition-all duration-500 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Minimal Background Patterns */}
        <div className='absolute inset-0 overflow-hidden opacity-10'>
          {/* Simple geometric shapes - much fewer */}
          <div className='absolute top-20 left-20 w-16 h-16 border border-red-600/30 rounded-full'></div>
          <div className='absolute top-32 right-32 w-12 h-12 border border-red-600/20 transform rotate-45'></div>
          <div className='absolute bottom-20 left-32 w-20 h-20 border border-red-600/25 rounded-lg'></div>
          <div className='absolute bottom-32 right-20 w-14 h-14 border border-red-600/30 rounded-full'></div>

          {/* Corner decorations */}
          <div className='absolute top-10 right-10 w-8 h-8 border border-red-600/20 transform rotate-45'></div>
          <div className='absolute bottom-10 left-10 w-10 h-10 border border-red-600/25 rounded-full'></div>
        </div>

        {/* Content Container */}
        <div className='relative z-10 flex flex-col items-center space-y-8'>
          {/* Logo Container - Much Smaller */}
          <div
            className={`transform transition-all duration-1000 float ${
              isAnimating
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-[-20px] opacity-0 scale-95"
            }`}
          >
            {/* <Image
              src='/logo.png'
              alt='M.N. Traiteur Logo'
              width={120}
              height={50}
              className='w-auto h-auto max-w-[120px] max-h-[50px]'
              priority
            /> */}

            <Image
              src='/logo.png'
              alt='M.N. Traiteur Logo'
              width={200}
              height={80}
              className='w-auto h-auto max-w-[200px] max-h-[80px]'
              priority
            />
          </div>

          {/* Simple Spinner */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isAnimating
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-[20px] opacity-0 scale-95"
            }`}
          >
            <div className='relative'>
              <div className='w-12 h-12 border-4 border-red-600/30 border-t-red-600 rounded-full spinner'></div>
            </div>
          </div>

          {/* Welcome Text - Red Text */}
          <div
            className={`transform transition-all duration-1000 delay-500 fade-in ${
              isAnimating
                ? "translate-y-0 opacity-100"
                : "translate-y-[20px] opacity-0"
            }`}
          >
            <div className='text-center space-y-2'>
              <h2
                className='text-red-600 text-xl sm:text-2xl font-bold'
                style={{ fontFamily: "Arial" }}
              >
                Welcome to M.N. Traiteur
              </h2>
              <p
                className='text-red-600/80 text-sm sm:text-base'
                style={{ fontFamily: "Arial" }}
              >
                Cuisine française traditionnelle
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
