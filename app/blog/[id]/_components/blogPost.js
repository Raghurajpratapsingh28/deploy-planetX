"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag, LocateIcon, LocateFixed, Locate, LandmarkIcon, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { getPostById } from "@/lib/posts"
import { formatDate } from "@/lib/utils";
import axios from "axios";
import BACKEND_URL from "@/lib/BACKEND_URL";
import { use, useEffect, useState } from "react";

const constructLocation = (location) => {
  const { city, state, locality } = location;
  const subLocality = (location.subLocality) === undefined || (location.subLocality) === ""? "": location.subLocality + ", ";
  const apartment = (location.apartment) === undefined || (location.apartment) === ""? "": location.apartment + ", ";
  const houseNumber = (location.houseNumber) === undefined || (location.houseNumber) === "" ? "": location.houseNumber + ", ";
  
  return `${houseNumber}${apartment}${subLocality}${locality}, ${city}, ${state}.`
};

export default function BlogPost({ id }) {
  //   console.log(id);
  const [post, setPost] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  // if (!post) {
  //     notFound();
  //   }
  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
      const res = await axios.get(`${BACKEND_URL}/blogs/get/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      const userRes = await axios.get(`${BACKEND_URL}/auth/get-user`, {
        headers: {
          Authorization: token,
        },
      });
      // console.log(res.data.blog)
      setLoading(false);
      setPost({ ...res.data.blog });
      setUser({ ...userRes.data.user });
    };
    getData();
  }, []);
  if (loading) return <div>loading</div>;
  else {
    // location: {
    //   city: { type: String, required: false },
    //   state: { type: String, required: false },
    //   locality: { type: String, required: false },
    //   subLocality: { type: String },
    //   apartment: { type: String },
    //   houseNumber: { type: String },
    // }
    console.log(post.location)
    // console.log(constructLocation(post.location));
    return (
      <div className="container max-w-4xl px-4 py-8 md:py-12">
        <div className="w-full flex justify-between">
          <Link href="/blog">
            <Button variant="ghost" className="mb-6 pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
          {post.userId == user._id && (
            <Link href={`/blog/${post._id}/edit`}>
              <Button variant="link" className="mb-6">
                Edit
              </Button>
            </Link>
          )}
        </div>

        {post.image && (
          <div className="relative mb-6 h-[300px] w-full overflow-hidden rounded-lg md:h-[400px]">
            <Image
              src={post.image || "/placeholder.svg"}
              //   src={"/placeholder.svg"}
              alt={post.title}
              fill="true"
              className="object-cover"
              priority="true"
            />
          </div>
        )}

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm">
            <Tag className="mr-1 h-3 w-3" />
            {post.category}
          </span>
        </div>

        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          {post.title}
        </h1>

        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="mr-1 h-4 w-4"/>
            {constructLocation(post.location)}
          </div>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <User className="mr-1 h-4 w-4" />
            {post.author}
          </div>
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            {formatDate(post.createdAt)}
          </div>
        </div>

        <div className="prose max-w-none dark:prose-invert">
          {post.description.split("\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {post.contactInfo && (
          <div className="mt-8 rounded-lg border p-4">
            <h2 className="mb-2 font-semibold">Contact Information</h2>
            <p>{post.contactInfo}</p>
          </div>
        )}
      </div>
    );
  }
}
