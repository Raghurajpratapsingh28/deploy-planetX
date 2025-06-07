"use client"

import { useRouter, usePathname } from "next/navigation"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const CATEGORIES = [
  "All Posts",
  "Roommate Wanted",
  "Property For Sale",
  "Property For Rent",
  "Community Updates",
  "Market Insights",
]

export function CategoryFilter({ selectedCategory }: { selectedCategory: string }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(window.location.search)

    if (category === "All Posts") {
      params.delete("category")
    } else {
      params.set("category", category)
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  const displayCategory = selectedCategory || "All Posts"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between md:w-[200px]">
          {displayCategory}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2 h-4 w-4"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px]">
        <DropdownMenuGroup>
          {CATEGORIES.map((category) => (
            <DropdownMenuItem
              key={category}
              className={cn(
                "flex cursor-pointer items-center justify-between",
                displayCategory === category && "bg-accent",
              )}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
              {displayCategory === category && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
