import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { getPostById } from "@/lib/posts"
import { formatDate } from "@/lib/utils";
import axios from "axios";
import BACKEND_URL from "@/lib/BACKEND_URL";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

import BlogPost from "./_components/blogPost";

const getPostById = async (id) => {
  console.log(data);
};

// export async function generateMetadata({ params }) {
//   const post = await getPostById(params.id)

//   if (!post) {
//     return {
//       title: "Post Not Found",
//       description: "The requested blog post could not be found",
//     }
//   }

//   return {
//     title: post.title,
//     description: post.description.substring(0, 160),
//     openGraph: {
//       title: post.title,
//       description: post.description.substring(0, 160),
//       images: post.image ? [post.image] : [],
//     },
//   }
// }

export default async function BlogPostPage({ params }) {
  const { id } = await params;

  return <BlogPost id={id} />;
}
