"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { createPost } from "@/lib/posts"
import { toast } from "@/hooks/use-toast";
import React from "react";
import axios from "axios";
import BACKEND_URL from "@/lib/BACKEND_URL";
import { uploadBlogImage } from "@/lib/uploader";

const createPost = async (postData) => {
  const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
  // console.log(token);
  const data = {
    title: postData.title,
    category: postData.category,
    description: postData.description,
    contactInfo: postData.contact,
    image: postData.image,
    location: {
      city: postData.city,
      state: postData.state,
      locality: postData.locality,
      subLocality: postData.subLocality || "",
      apartment: postData.apartment || "",
      houseNumber: postData.houseNumber || "",
    },
  };
  const header = {
    headers: {
      Authorization: token,
    },
  };
  console.log(postData.image);
  const res = await axios.post(`${BACKEND_URL}/blogs/create`, data, header);
  // console.log(res);
};

const CATEGORIES = [
  "Roommate Wanted",
  "Property For Sale",
  "Property For Rent",
  "Community Updates",
  "Market Insights",
];

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z
    .string()
    .refine(
      (val) => CATEGORIES.includes(val),
      "Please select a valid category"
    ),
  image: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "File must be less than 5MB"
    ) // 5MB max
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "application/pdf"].includes(file.type),
      "Only JPEG, PNG, and PDF files are allowed"
    ),
  houseNumber: z.string().optional(),
  apartment: z.string().optional(),
  subLocality: z.string().optional(),
  locality: z.string(),
  city: z.string(),
  state: z.string(),
  contact: z
    .string()
    .min(5, "Contact information must be at least 5 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export function PostForm({ user }: { user: { id: string; name: string } }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      contact: "",
      houseNumber: "",
      apartment: "",
      subLocality: "",
      locality: "",
      city: "",
      state: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      setIsSubmitting(true);

      // Add author information from the authenticated user
      let imageUrl = "";
      if (values.image instanceof File) {
        imageUrl = await uploadBlogImage(values.image);
      }
      const postData = {
        ...values,
        image: imageUrl,
        author: user.name,
        authorId: user.id,
        date: new Date().toISOString(),
      };

      console.log(postData)
      const newPostId = await createPost(postData);
      // console.log(newPostId)

      toast({
        title: "Post created successfully!",
        description: "Your post has been published.",
      });

      router.push(`/blog`);
      router.refresh();
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Something went wrong",
        description: "Your post could not be created. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the category that best fits your post
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter post title" {...field} />
                </FormControl>
                <FormDescription>
                  Create a compelling title for your post
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter post content"
                    className="min-h-[200px] resize-y"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide detailed information about your listing or update
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Location</FormLabel>
            {/* // location: {
    //   city: { type: String, required: false },
    //   state: { type: String, required: false },
    //   locality: { type: String, required: false },
    //   subLocality: { type: String },
    //   apartment: { type: String },
    //   houseNumber: { type: String }, */}
            <FormField
              control={form.control}
              name="houseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>House Number (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter House Number" {...field} />
                  </FormControl>
                  <FormDescription>
                    House Number of the location
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apartment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apartment (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Apartment Name" {...field} />
                  </FormControl>
                  <FormDescription>Name of the apartment</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subLocality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Locality (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Sub Locality" {...field} />
                  </FormControl>
                  <FormDescription>
                    Sub Locality of the location
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="locality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Locality</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Locality" {...field} />
                  </FormControl>
                  <FormDescription>Locality of the location</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter City" {...field} />
                  </FormControl>
                  <FormDescription>City of the location</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter State" {...field} />
                  </FormControl>
                  <FormDescription>State of the location</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormItem>

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="https://example.com/image.jpg"
                    {...field}
                    onChange={(e) => {
                      // Convert FileList to File | undefined
                      const file = e.target.files?.[0];
                      field.onChange(file);
                    }}
                    value={undefined}
                  />
                </FormControl>
                <FormDescription>
                  Add an image URL to make your post stand out
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Information</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email, phone number, or other contact details"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  How should interested people contact you?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Post...
              </>
            ) : (
              "Create Post"
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
}
