"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "./searchproperties";

export const LandingPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden">
      {/* Optimized Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/bg.png"
          alt="Background"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
          placeholder="blur"
          blurDataURL="/bg-placeholder.jpg"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col items-center justify-center gap-8 px-4 py-16 sm:px-6 md:px-8 lg:px-16 text-center">
        <div className="flex flex-col gap-6 max-w-3xl">
          <p className="text-gray-200 font-light text-base sm:text-lg md:text-xl leading-relaxed">
            Explore top properties, connect with trusted agents, and take the next
            step towards your future.
          </p>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 animate-fadeIn whitespace-nowrap">
            Every Space for Every Need
          </h1>
        </div>
        <Search />
      </div>

      {/* Animation Styles */}
      <style jsx>{`
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
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};