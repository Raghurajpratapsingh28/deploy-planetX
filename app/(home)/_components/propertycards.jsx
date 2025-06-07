'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { motion } from 'framer-motion'

const propertyCards = [
  {
    title: "Buy Property",
    description:
      "Browse rental properties that fit your lifestyle and budget. Flexible terms, verified listings.",
    onclick: "/show-property?minPrice=0&maxPrice=100000000&propertyType=For+Sale",
    icon: "/villa.png"
  },
  {
    title: "Rent Property",
    description:
      "Discover homes for sale in prime locations. Find the perfect property to call your own.",
    onclick: "/show-property?minPrice=0&maxPrice=100000000&propertyType=For+Rent",
    icon: "/flat.png"
  },
  {
    title: "Hotels",
    description:
      "Book your stay at top-rated hotels for business or leisure trips. Comfortable and affordable options.",
    onclick: "/show-property?minPrice=0&maxPrice=100000000&category=Hotel",
    icon: "/hotel.png"
  },
  {
    title: "Paying Guest",
    description:
      "Looking for a shared living space? Explore verified PG accommodations near you.",
    onclick: "/show-property?minPrice=0&maxPrice=100000000&category=Pg",
    icon: "/pg.png"
  },
]

export const PropertyCards = () => {
  const router = useRouter()

  const handleCardClick = (url) => {
    if (url && url !== "#") {
      router.push(url)
    }
  }

  const cardVariants = {
    initial: { scale: 1, rotateX: 0, rotateY: 0 },
    hover: { 
      scale: 1.05, 
      rotateX: 2, 
      rotateY: 5, 
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }

  const iconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.15, 
      transition: { duration: 0.2, ease: "easeOut" }
    }
  }

  const textVariants = {
    initial: { y: 0, color: "#1F2937" },
    hover: { 
      y: -3, 
      color: "#2563EB",
      transition: { duration: 0.2, ease: "easeOut" }
    }
  }

  return (
    <section className="w-full py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900"
        >
          Find the Perfect Place for Every Need
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {propertyCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <motion.div
                variants={cardVariants}
                initial="initial"
                whileHover="hover"
              >
                <Card
                  onClick={() => handleCardClick(card.onclick)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCardClick(card.onclick)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Explore ${card.title}`}
                  className="w-full max-w-[300px] h-[320px] rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg hover:shadow-2xl hover:bg-white/90 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-6 flex flex-col h-full gap-5 relative z-10">
                    <motion.div
                      className="w-[80px] h-[80px] bg-gradient-to-br from-blue-50 to-gray-100 hover:from-blue-100 hover:to-blue-50 rounded-xl flex items-center justify-center"
                      variants={iconVariants}
                    >
                      <Image
                        height={50}
                        width={50}
                        src={card.icon}
                        alt={`${card.title} icon`}
                        className="object-contain"
                        priority={index < 2}
                      />
                    </motion.div>
                    <div className="flex flex-col gap-3">
                      <motion.h2 
                        className="text-xl font-semibold text-gray-900 truncate"
                        variants={textVariants}
                      >
                        {card.title}
                      </motion.h2>
                      <motion.p 
                        className="text-sm text-gray-600 leading-relaxed line-clamp-3"
                        variants={textVariants}
                      >
                        {card.description}
                      </motion.p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}