"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowLeft, Loader2, Trash2 } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// import { updatePost, deletePost } from "@/lib/posts"
import { toast } from "@/hooks/use-toast";
import { getToken } from "@/lib/BACKEND_URL";
import BACKEND_URL from "@/lib/BACKEND_URL";
import axios from "axios";
import { uploadBlogImage } from "@/lib/uploader";

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
    )
    .optional(),
  houseNumber: z.string().optional(),
  apartment: z.string().optional(),
  subLocality: z.string().optional(),
  locality: z.string(),
  city: z.string(),
  state: z.string(),
  contactInfo: z
    .string()
    .min(5, "Contact information must be at least 5 characters"),
});

const updatePost = async (postId, updateValues) => {
  const token = getToken();

  const updateRes = await axios.put(
    `${BACKEND_URL}/blogs/update/${postId}`,
    updateValues,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return updateRes;
};

const deletePost = async (postId) => {
  const token = getToken();
  const deleteRes = await axios.delete(
    `${BACKEND_URL}/blogs/delete/${postId}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export default function EditPostForm({ post, user }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post.title,
      description: post.description,
      category: post.category,
      contactInfo: post.contactInfo,
      houseNumber: post.location.houseNumber,
      apartment: post.location.apartment,
      subLocality: post.location.subLocality,
      locality: post.location.locality,
      city: post.location.city,
      state: post.location.state,
    },
  });

  async function onSubmit(values) {
    try {
      setIsSubmitting(true);

      // const updatedPostData = {
      //   ...values,
      //   id: post._id,
      //   author: post.author,
      //   authorId: post.authorId,
      //   date: post.date,
      //   updatedAt: new Date().toISOString(),
      // }

      let updatedPostData = { ...values };

      // console.log(updatedPostData.image);
      if (values.image instanceof File) {
        updatedPostData["image"] = await uploadBlogImage(values.image);
      } else if (values.image === undefined) {
        delete updatedPostData["image"];
      }

      updatedPostData["location"] = {
        city: updatedPostData.city,
        state: updatedPostData.state,
        locality: updatedPostData.locality,
        subLocality: updatedPostData.subLocality || "",
        apartment: updatedPostData.apartment || "",
        houseNumber: updatedPostData.houseNumber || "",
      };

      console.log(updatedPostData);
      console.log(await updatePost(post._id, updatedPostData));

      toast({
        title: "Post updated successfully!",
        description: "Your changes have been saved.",
      });

      router.push(`/blog/${post._id}`);
      router.refresh();
    } catch (error) {
      console.error("Error updating post:", error);
      toast({
        title: "Something went wrong",
        description: "Your post could not be updated. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    try {
      setIsDeleting(true);

      await deletePost(post._id);

      toast({
        title: "Post deleted successfully!",
        description: "Your post has been removed.",
      });

      router.push("/blog");
      router.refresh();
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        title: "Something went wrong",
        description: "Your post could not be deleted. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link href={`/blog/${post._id}`}>
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Post
            </Button>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" disabled={isDeleting}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Post
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your blog post and remove it from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete Post"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

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
                      <FormDescription>
                        Locality of the location
                      </FormDescription>
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
                        value={undefined}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Please add here image if you want to change the image
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactInfo"
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

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating Post...
                    </>
                  ) : (
                    "Update Post"
                  )}
                </Button>
                <Link href={`/blog/${post._id}`} className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
}
