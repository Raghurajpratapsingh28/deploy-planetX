"use client"

import { useEffect, useRef, useState } from "react"

interface UseInViewOptions {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
}

export function useInView(options: UseInViewOptions = {}) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting)
    }, options)

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [options])

  return { ref, inView }
}
