"use client";
import BlogList from "@/components/blog-list";
import { BlogHero } from "@/components/blog/blog-hero";
import { CategoryFilter } from "@/components/blog/category-filter";
import { SearchBar } from "@/components/blog/search-bar";
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/use-in-view";
import BACKEND_URL from "@/lib/BACKEND_URL";
import axios from "axios";
import { Loader2, PlusCircle } from "lucide-react";
import Link from "next/link";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";


const pageLimit = 6;
export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <BlogHero />
      <div className="container px-4 py-8 md:py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <Link href="/blog/new">
            <Button className="w-full sm:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Post
            </Button>
          </Link>
        </div>

        {/* <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
          <CategoryFilter selectedCategory={""} />
          <SearchBar defaultValue={""} />
        </div> */}

        <Suspense fallback={<p className="p-4">Loading blog list...</p>}>
          <BlogList />
        </Suspense>
      </div>
    </div>
  );
}

function Post({ post }) {
  console.log(post);
  return (
    <div className="flex my-3 items-center border border-black justify-center w-full h-80">
      <div className="flex flex-col justify-center items-center">
        <div>{post.title}</div>
        <div>{post.description}</div>
      </div>
    </div>
  );
}
