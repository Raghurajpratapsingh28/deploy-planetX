"use client"
import { useInView } from "@/hooks/use-in-view";
import BACKEND_URL from "@/lib/BACKEND_URL";
import axios from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Image from "next/image";
import { Loader2, Tag } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/navigation";

export default function BlogList() {
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: "0px 0px 200px 0px", // Load more content before reaching the end
  });
  const router = useRouter();
  const [page, setPage] = useState(1);
  //   const [post, setPost] = useState([]);
  const post = useRef([]);
  // const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
  
  //     if(!token){
  //       router.push("/login")
  //     }
  const [token, setToken] = useState(null); // Add this with your other useState declarations

useEffect(() => {
  // This runs only on client side
  const accessToken = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
  setToken(accessToken);
  
  if (!accessToken) {
    router.push("/login");
  }
}, [router]);


  const fetchPostdata = async () => {
    if (loading || !hasNext || !inView||!token) return;
    // console.log(page);
    setLoading(true);
    try {
      
      const data = await axios.get(`${BACKEND_URL}/blogs/get`, {
        params: {
          page: page,
          limit: 6,
        },
        headers: {
          Authorization: token,
        },
      });
      console.log(data);
      
      //   setPost((prev) => [...prev, ...data.data.blogs]);
      post.current = [...post.current, ...data.data.blogs];
      setHasNext(data.data.hasNextPage);
      setPage((prev) => prev + 1);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostdata();
    // console.log(inView);
  }, [loading, page, inView]);

  console.log([inView, page, loading, hasNext]);
    return (
      <div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {post.current.map((val, ind) => {
            return <PostComponent key={ind} post={val} />;
          })}
        </div>

        {hasNext && (
          <div>
            {loading && <PostListSkeleton />}
            <div ref={ref} className="flex justify-center py-8">
              {loading && (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Loading more posts...</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
}

function PostListSkeleton() {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          ))}
      </div>
    )
  }
  

function PostComponent({ post }) {
  // console.log(post);
  return (
    <Link key={post._id} href={`/blog/${post._id}`} className="group">
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              fill="true"
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4 flex items-end">
  <span className="inline-flex items-center rounded-full bg-violet-500 px-3 py-1 text-sm font-semibold text-gray-900 shadow-md transition-all hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50">
    <Tag className="mr-1.5 h-4 w-4 text-blue-500" aria-hidden="true" />
    {post.category}
  </span>
</div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="mb-2 line-clamp-1 text-xl font-semibold">
            {post.title}
          </h3>
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {post.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            {formatDate(post.createdAt)}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
