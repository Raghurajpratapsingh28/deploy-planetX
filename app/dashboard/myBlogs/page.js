"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getToken } from "@/lib/BACKEND_URL";
import BACKEND_URL from "@/lib/BACKEND_URL";
import axios from "axios";

export default function MyBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const process = async () => {
      try {
        const token = getToken();
        const postRes = await axios.get(`${BACKEND_URL}/blogs/get-user`, {
          headers: {
            Authorization: token,
          },
        });
        console.log("API Response:", postRes.data.blogs); // Debug
        setBlogs(postRes.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    process();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Blogs</h1>
        <Link href="/blog/new">
          <Button className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5" />
            New Blog
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {blogs.map((blog, ind) => (
          <PostView key={ind} blog={blog} />
        ))}
      </div>
    </div>
  );
}

function PostView({ blog }) {
  const imageSrc = blog.image && blog.image.startsWith('http') 
    ? blog.image 
    : '/plot-land.png';

  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="w-full md:w-40 h-28 relative flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={imageSrc}
            alt={blog.title || "Blog Image"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              {blog.title || "Untitled"}
            </h2>
            <p className="text-sm text-muted-foreground">{blog.category || "Uncategorized"}</p>
            <p className="text-sm text-muted-foreground">
              {blog.dateListed 
                ? new Date(blog.dateListed).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "Date not available"}
            </p>
          </div>

          <p className="mt-2 line-clamp-2 text-sm text-gray-600">
            {blog.description || "No description available"}
          </p>

          {blog.price && (
            <p className="mt-2 font-semibold text-green-600">
              Price: ₹{blog.price.toLocaleString()}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <Link href={`/blog/${blog._id}/edit`}>
          <Button variant="outline" className="flex items-center gap-2">
            <Pencil className="w-4 h-4" />
            Edit
          </Button>
        </Link>
      </div>
    </div>
  );
}