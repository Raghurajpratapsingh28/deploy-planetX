import { cache } from "react"

// This is a mock implementation - replace with your actual database implementation
// For example, with Prisma, Supabase, MongoDB, etc.

export type Post = {
  id: string
  title: string
  description: string
  category: string
  author: string
  authorId: string
  date: string
  image?: string
  contact: string
}

// Generate more mock posts for testing infinite scroll
const generateMockPosts = (count: number) => {
  const categories = [
    "Roommate Wanted",
    "Property for Sale",
    "Property for Rent",
    "Community Updates",
    "Market Insights",
  ]
  const authors = [
    "Jane Smith",
    "Michael Johnson",
    "Community Association",
    "Rental Properties Inc.",
    "Market Analysis Team",
    "Alex Chen",
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 7}`, // Start from 7 since we already have 6 posts
    title: `Sample Post ${i + 7}`,
    description: `This is a sample post description for testing infinite scrolling. This post contains information about real estate and community updates.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.`,
    category: categories[Math.floor(Math.random() * categories.length)],
    author: authors[Math.floor(Math.random() * authors.length)],
    authorId: `user${Math.floor(Math.random() * 10) + 1}`,
    date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    image: `/placeholder.svg?height=400&width=600&text=Post+${i + 7}`,
    contact: `contact${i + 7}@example.com`,
  }))
}

// Initial posts
let posts: Post[] = [
  {
    id: "1",
    title: "Roommate Wanted for Downtown Apartment",
    description:
      "Looking for a responsible roommate to share a 2-bedroom apartment in downtown. Rent is $1200/month including utilities. Available from June 1st.\n\nThe apartment features a modern kitchen, spacious living room, and a balcony with city views. It's located within walking distance to public transportation, restaurants, and shopping centers.\n\nIdeal roommate would be clean, respectful, and preferably a young professional or graduate student.",
    category: "Roommate Wanted",
    author: "Jane Smith",
    authorId: "user1",
    date: "2023-05-15T10:30:00Z",
    image: "/placeholder.svg?height=400&width=600",
    contact: "jane.smith@example.com or 555-123-4567",
  },
  {
    id: "2",
    title: "Luxury Condo for Sale in River District",
    description:
      "Stunning 3-bedroom, 2-bathroom luxury condo with panoramic river views. Recently renovated with high-end finishes.\n\nFeatures include hardwood floors throughout, gourmet kitchen with stainless steel appliances, marble countertops, and a large island. The primary suite offers a walk-in closet and an ensuite bathroom with a soaking tub and separate shower.\n\nBuilding amenities include 24-hour concierge, fitness center, rooftop pool, and secure parking.",
    category: "Property for Sale",
    author: "Michael Johnson",
    authorId: "user2",
    date: "2023-05-10T14:45:00Z",
    image: "/placeholder.svg?height=400&width=600",
    contact: "michael.johnson@realestate.com",
  },
  {
    id: "3",
    title: "Community Garden Project Starting Next Month",
    description:
      "We're excited to announce the start of our neighborhood community garden project! Join us in transforming the vacant lot on Maple Street into a beautiful shared garden space.\n\nThe project will kick off with a planning meeting on June 5th at the Community Center. We'll discuss layout plans, plant selection, and volunteer schedules.\n\nNo gardening experience necessary - just bring your enthusiasm and ideas!",
    category: "Community Updates",
    author: "Community Association",
    authorId: "user3",
    date: "2023-05-20T09:15:00Z",
    image: "/placeholder.svg?height=400&width=600",
    contact: "community@neighborhood.org",
  },
  {
    id: "4",
    title: "Cozy Studio Apartment for Rent",
    description:
      "Charming studio apartment available for rent in a quiet residential area. Perfect for students or young professionals.\n\nThe apartment includes a kitchenette, full bathroom, and built-in storage solutions. Freshly painted with new flooring throughout.\n\nRent is $850/month plus utilities. 6-month minimum lease required. No pets, please.",
    category: "Property for Rent",
    author: "Rental Properties Inc.",
    authorId: "user4",
    date: "2023-05-18T11:20:00Z",
    image: "/placeholder.svg?height=400&width=600",
    contact: "rentals@properties.com",
  },
  {
    id: "5",
    title: "Q2 Real Estate Market Analysis",
    description:
      "Our analysis of Q2 real estate trends shows a 5% increase in home prices compared to the same period last year. Inventory remains low, creating a competitive market for buyers.\n\nThe rental market has stabilized after last year's fluctuations, with average rent increasing by only 2% year-over-year.\n\nInterest rates are expected to remain steady through the summer months, providing a good opportunity for potential homebuyers.",
    category: "Market Insights",
    author: "Market Analysis Team",
    authorId: "user5",
    date: "2023-05-12T16:30:00Z",
    image: "/placeholder.svg?height=400&width=600",
    contact: "analysis@realestate.com",
  },
  {
    id: "6",
    title: "Roommate Needed for Shared House",
    description:
      "Looking for a roommate to share a 3-bedroom house with two professionals in their early 30s. The available room is furnished with a queen bed, dresser, and desk.\n\nThe house has a large kitchen, living room with a fireplace, backyard with a patio, and a two-car garage. Located in a safe neighborhood with easy access to public transportation.\n\nRent is $900/month plus utilities. We're looking for someone clean, respectful, and sociable but who also values privacy.",
    category: "Roommate Wanted",
    author: "Alex Chen",
    authorId: "user6",
    date: "2023-05-16T13:10:00Z",
    image: "/placeholder.svg?height=400&width=600",
    contact: "alex.chen@example.com",
  },
]

// Add more mock posts for testing infinite scroll
posts = [...posts, ...generateMockPosts(30)]

// Get all posts with optional filtering and pagination
export const getPosts = cache(
  async ({
    category,
    search,
    page = 1,
    limit = 10,
  }: {
    category?: string
    search?: string
    page?: number
    limit?: number
  } = {}) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    let filteredPosts = [...posts]

    if (category) {
      filteredPosts = filteredPosts.filter((post) => post.category === category)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) || post.description.toLowerCase().includes(searchLower),
      )
    }

    // Sort by date (newest first)
    filteredPosts = filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    return filteredPosts.slice(startIndex, endIndex)
  },
)

// Get a single post by ID
export const getPostById = cache(async (id: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return posts.find((post) => post.id === id)
})

// Create a new post
export async function createPost(postData: Omit<Post, "id">) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newPost: Post = {
    ...postData,
    id: `${posts.length + 1}`, // In a real app, use a UUID or database-generated ID
  }

  posts = [newPost, ...posts]

  return newPost.id
}

// In a real application, you would implement these functions
// to interact with your database (e.g., MongoDB, Supabase, etc.)
