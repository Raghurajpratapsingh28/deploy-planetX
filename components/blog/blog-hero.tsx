import Link from "next/link"
import { Button } from "@/components/ui/button"

export function BlogHero() {
  return (
    <div className="bg-muted py-12 md:py-16 lg:py-20">
      <div className="container px-4 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">Real Estate Community Blog</h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
          Find roommates, discover properties, and stay updated with the latest community news
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/blog/new">
            <Button size="lg">Post a Listing</Button>
          </Link>
          {/* <Link href="/blog?category=Roommate+Wanted">
            <Button variant="outline" size="lg">
              Find a Roommate
            </Button>
          </Link> */}
        </div>
      </div>
    </div>
  )
}
