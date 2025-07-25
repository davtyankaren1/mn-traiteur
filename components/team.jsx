"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

interface TeamMember {
  id: number
  name: string
  position: string
  image: string
}

// TODO: Replace with Redux store data
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Aramé Hakobyan",
    position: "Գլխավոր խոհարար",
    image: "/team/team-member.png",
  },
  {
    id: 2,
    name: "Մարիամ Ավագյան",
    position: "Ռեստորանի մենեջեր",
    image: "/team/team-member.png",
  },
  {
    id: 3,
    name: "Դավիթ Սարգսյան",
    position: "Խորոված մասնագետ",
    image: "/team/team-member.png",
  },
  {
    id: 4,
    name: "Անի Մկրտչյան",
    position: "Հաճախորդների սպասարկում",
    image: "/team/team-member.png",
  },
  {
    id: 5,
    name: "Գարիկ Պետրոսյան",
    position: "Օգնական խոհարար",
    image: "/team/team-member.png",
  },
  {
    id: 6,
    name: "Լուսինե Ղազարյան",
    position: "Շաուրմա մասնագետ",
    image: "/team/team-member.png",
  },
  {
    id: 7,
    name: "Վահան Մարտիրոսյան",
    position: "Բարիստա",
    image: "/team/team-member.png",
  },
  {
    id: 8,
    name: "Նարինե Հովհաննիսյան",
    position: "Հաշվապահ",
    image: "/team/team-member.png",
  },
]

export default function Team() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState("right")
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Number of cards to display based on screen size
  const cardsToShow = isMobile ? 1 : 4

  // Calculate total number of pages
  const totalPages = Math.ceil(teamMembers.length / cardsToShow)

  // Calculate current page
  const currentPage = Math.floor(currentIndex / cardsToShow)

  const nextSlide = () => {
    if (isAnimating) return
    setDirection("right")
    setIsAnimating(true)
    setTimeout(() => {
      const nextIndex = currentIndex + cardsToShow
      if (nextIndex >= teamMembers.length) {
        setCurrentIndex(0) // Go back to first page
      } else {
        setCurrentIndex(nextIndex)
      }
      setIsAnimating(false)
    }, 500)
  }

  // Auto-play functionality - 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000) // Changed to 5 seconds
    return () => clearInterval(interval)
  }, [isAnimating])

  // Get visible team members with padding if needed
  const visibleMembers = teamMembers.slice(currentIndex, Math.min(currentIndex + cardsToShow, teamMembers.length))

  // Pad with empty slots if we have fewer than cardsToShow
  if (visibleMembers.length < cardsToShow) {
    const emptySlots = cardsToShow - visibleMembers.length
    for (let i = 0; i < emptySlots; i++) {
      visibleMembers.push({
        id: -i - 1, // Use negative IDs for empty slots
        name: "",
        position: "",
        image: "",
      })
    }
  }

  return (
    <section className="bg-white py-16 lg:py-24" id="team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-3">
            <div className="flex items-center justify-center gap-2">
              <span className="h-1 w-10 bg-red-600 rounded-full"></span>
              <span className="text-red-600 font-medium uppercase tracking-wider text-sm">Մեր թիմը</span>
              <span className="h-1 w-10 bg-red-600 rounded-full"></span>
            </div>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Arial" }}>
            Մեր <span className="text-[#DC2626]">թիմը</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Մասնագիտական և փորձառու թիմ, որը ապահովում է բարձրորակ սպասարկում և համեղ ուտեստներ
          </p>
        </div>

        {/* Team slider - Removed external padding and arrows */}
        <div className="relative overflow-visible" ref={sliderRef}>
          <div
            className={`grid grid-cols-1 md:grid-cols-4 transition-all duration-500 ease-in-out ${
              isAnimating
                ? direction === "right"
                  ? "translate-x-[-50px] opacity-0"
                  : "translate-x-[50px] opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            {visibleMembers.map((member, index) => (
              <div
                key={member.id}
                className="team-card w-full bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative"
                style={{
                  animationDelay: `${index * 150}ms`,
                  transitionDelay: `${index * 50}ms`,
                  visibility: member.id < 0 ? "hidden" : "visible",
                }}
              >
                {/* Only render content if not an empty slot */}
                {member.id > 0 && (
                  <>
                    {/* Decorative elements */}
                    <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-red-200 opacity-80"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-red-600 opacity-80"></div>

                    {/* Image container */}
                    <div className="relative mb-4 md:mb-6 h-48 md:h-56 w-full overflow-hidden rounded-xl group">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                      {/* Brand badge */}
                      <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                        <span style={{ fontFamily: "Arial" }}>ՏԻԳ-ԳՈՌ</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3
                        className="mb-1 text-lg md:text-xl font-bold text-gray-900 transition-all duration-300 hover:text-red-600"
                        style={{ fontFamily: "Arial" }}
                      >
                        {member.name}
                      </h3>
                      <p className="text-red-600 text-sm md:text-base font-semibold" style={{ fontFamily: "Arial" }}>
                        {member.position}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Slide indicators */}
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating && index !== currentPage) {
                  setDirection(index > currentPage ? "right" : "left")
                  setIsAnimating(true)
                  setTimeout(() => {
                    setCurrentIndex(index * cardsToShow)
                    setIsAnimating(false)
                  }, 500)
                }
              }}
              className={`h-2 w-8 rounded-full transition-all ${
                index === currentPage ? "bg-red-600 scale-110" : "bg-gray-300 hover:bg-red-300"
              }`}
              aria-label={`Go to team slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
