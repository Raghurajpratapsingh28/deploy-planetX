'use client'

import { Building, Home, Hotel, Users, Warehouse, Map } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { motion } from 'framer-motion'

const propertyTypes = [
  {
    title: "House / Villa",
    count: "120 Properties",
    icon: '/villa.png',
    href: "/show-property?minPrice=0&maxPrice=100000000&category=Residential"
  },
  {
    title: "Flat / Apartment",
    count: "120 Properties",
    icon: '/flat.png',
    href: "/show-property?minPrice=0&maxPrice=100000000&category=Residential"
  },
  {
    title: "Hotels",
    count: "120 Properties",
    icon: '/hotel.png',
    href: "/show-property?minPrice=0&maxPrice=100000000&category=Hotel"
  },
  {
    title: "PG / Co-living",
    count: "120 Properties",
    icon: '/pg.png',
    href: "/show-property?minPrice=0&maxPrice=100000000&category=Pg",
  },
  {
    title: "Ware House",
    count: "120 Properties",
    icon: '/ware-house.png',
    href: "/show-property?minPrice=0&maxPrice=100000000&category=Warehouse"
  },
  {
    title: "EventSpace",
    count: "120 Properties",
    icon: '/plot-land.png',
    href: '/show-property?minPrice=0&maxPrice=100000000&category=EventSpace'
  },
]

export const PropertyTypes = () => {
  const router = useRouter()

  const handleCardClick = (href) => {
    if (href && href !== '#') {
      router.push(href)
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
    <section className="w-full py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            Explore Properties
          </motion.h2>
        </div>
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {propertyTypes.map((type, index) => (
                <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6 pl-4">
                  <motion.div
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
                        className="w-full max-w-[200px] h-[220px] rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg hover:shadow-2xl hover:bg-white/90 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 relative overflow-hidden"
                        onClick={() => handleCardClick(type.href)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCardClick(type.href)}
                        tabIndex={0}
                        role="button"
                        aria-label={`Explore ${type.title}`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                        <CardContent className="p-6 flex flex-col h-full relative z-10">
                          <motion.div 
                            className="w-[80px] h-[80px] bg-gradient-to-br from-blue-50 to-gray-100 hover:from-blue-100 hover:to-blue-50 rounded-2xl flex items-center justify-center mb-6"
                            variants={iconVariants}
                          >
                            <Image 
                              width={50} 
                              height={50} 
                              src={type.icon} 
                              alt={`${type.title} icon`} 
                              className="object-contain"
                              priority={index < 3}
                            />
                          </motion.div>
                          <div className="flex flex-col gap-2">
                            <motion.h3 
                              className="text-lg font-semibold text-gray-900 truncate"
                              variants={textVariants}
                            >
                              {type.title}
                            </motion.h3>
                            <motion.p 
                              className="text-sm text-gray-600"
                              variants={textVariants}
                            >
                              {type.count}
                            </motion.p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute -top-16 right-0 flex gap-2">
              <CarouselPrevious className="bg-white/90 hover:bg-white text-gray-700 rounded-full shadow-md hover:shadow-lg transition-all" />
              <CarouselNext className="bg-white/90 hover:bg-white text-gray-700 rounded-full shadow-md hover:shadow-lg transition-all" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}