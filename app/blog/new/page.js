"use client";
import { redirect } from "next/navigation";
import { PostForm } from "@/components/blog/post-form";
import { use, useEffect, useState } from "react";
import axios from "axios";
import BACKEND_URL from "@/lib/BACKEND_URL";
// import { getCurrentUser } from "@/lib/auth"

const getUser = async (setUser) => {
  const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
  const userResponse = await axios.get(`${BACKEND_URL}/auth/get-user`, {
    headers: { Authorization: token },
  });
  // console.log(userResponse)
  setUser(userResponse.data.user);
};

export default function NewPostPage() {
  const [user, setUser] = useState({});
    useEffect(() => {
        getUser(setUser);
    } ,[])
  // Redirect to login if not authenticated
  if (!user) {
    redirect("/login?callbackUrl=/blog/new");
  }

  // console.log(user)

  return (
    <div className="container max-w-4xl px-4 py-8 md:py-12">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">
        Create New Post
      </h1>
      <PostForm user={user} />
    </div>
  );
}
