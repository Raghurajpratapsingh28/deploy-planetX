"use client";
import { redirect, notFound, useRouter } from "next/navigation";
import axios from "axios";
import BACKEND_URL from "@/lib/BACKEND_URL";
import { getToken } from "@/lib/BACKEND_URL";
import EditPostForm from "@/components/blog/edit-post-form";
import { use, useEffect, useState } from "react";
import { tuple } from "zod";

export default function EditPage({ pid }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const processData = async () => {
      const token = getToken();
      const userRes = await axios.get(`${BACKEND_URL}/auth/get-user`, {
        headers: {
          Authorization: token,
        },
      });

      const postRes = await axios.get(`${BACKEND_URL}/blogs/get/${pid}`, {
        headers: {
          Authorization: token,
        },
      });

      setLoading(false);
      setUser(userRes.data.user);
      setPost(postRes.data.blog);
    };
    processData();
  }, []);

  if (loading) return <div>Loading...</div>;
  else {
    if (!user) {
      // redirect(`/login?callbackUrl=/blog/${pid}/edit`);
      router.push(`/login?callbackUrl=/blog/${pid}/edit`);
    }

    // Return 404 if post doesn't exist
    if (!post) {
      notFound();
    }

    // Check if user is the author of the post
    if (post.userId !== user._id) {
      redirect(`/blog/${pid}?error=unauthorized`);
    }
    return (
      <div className="container max-w-4xl px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Edit Post</h1>
          <p className="text-muted-foreground">
            Make changes to your blog post below.
          </p>
        </div>
        <EditPostForm post={post} user={user} />
      </div>
    );
  }
}
