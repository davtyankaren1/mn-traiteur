"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../components/ui/button";
import Image from "next/image";

// TODO: Replace with Redux store data
const galleryImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Restaurant Interior",
    category: "restaurant"
  },
  {
    id: 2,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Grilled Kebab",
    category: "food"
  },
  {
    id: 3,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Happy Customers",
    category: "customers"
  },
  {
    id: 4,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Chef Preparing Food",
    category: "food"
  },
  {
    id: 5,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Dining Area",
    category: "restaurant"
  },
  {
    id: 6,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Barbecue Plate",
    category: "food"
  },
  {
    id: 7,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Family Dining",
    category: "customers"
  },
  {
    id: 8,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Kitchen",
    category: "restaurant"
  },
  {
    id: 9,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Traditional Dishes",
    category: "food"
  }
];

// TODO: Replace with Redux store data
const categories = [
  { id: "all", name: "Բոլորը" },
  { id: "restaurant", name: "Ռեստորան" },
  { id: "food", name: "Ուտեստներ" },
  { id: "customers", name: "Հաճախորդներ" }
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] =
    (useState < (typeof galleryImages)[0]) | (null > null);

  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <section id='gallery' className='py-16 lg:py-24 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2
            className='text-3xl lg:text-4xl font-bold text-gray-900 mb-4'
            style={{ fontFamily: "Arial" }}
          >
            Մեր <span className='text-[#DC2626]'>պատկերասրահը</span>
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Բացահայտեք մեր ռեստորանի մթնոլորտը, համեղ ուտեստները և գոհ
            հաճախորդներին
          </p>
        </div>

        {/* Category Filter */}
        <div className='flex flex-wrap justify-center gap-2 mb-12'>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`${
                selectedCategory === category.id
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              } transition-all duration-300`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className='group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer'
              onClick={() => setSelectedImage(image)}
            >
              <div className='aspect-[4/3] relative'>
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className='object-cover group-hover:scale-110 transition-transform duration-500'
                />
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center'>
                  <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div className='bg-white/90 backdrop-blur-sm rounded-full p-3'>
                      <svg
                        className='w-6 h-6 text-red-600'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7'
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className='fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4'>
            <div className='relative max-w-4xl max-h-full'>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setSelectedImage(null)}
                className='absolute -top-12 right-0 text-white hover:bg-white/20 z-10'
              >
                <X className='h-6 w-6' />
              </Button>
              <div className='relative'>
                <Image
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.alt}
                  width={800}
                  height={600}
                  className='max-w-full max-h-[80vh] object-contain rounded-lg'
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
