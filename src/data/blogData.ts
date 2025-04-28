
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "2023 Color Trends For Your Home",
    excerpt: "Discover the hottest color trends of the year and how to incorporate them into your home design.",
    date: "June 12, 2023",
    image: "https://www.roll-onpainting.com/wp-content/uploads/2020/12/interior-paint-3-scaled.jpg",
    category: "Design Trends"
  },
  {
    id: 2,
    title: "How to Choose the Right Paint Finish",
    excerpt: "Learn about different paint finishes and which ones work best for specific areas of your home.",
    date: "May 23, 2023",
    image: "https://www.roll-onpainting.com/wp-content/uploads/2020/12/services_feature3.jpg",
    category: "Painting Tips"
  },
  {
    id: 3,
    title: "The Benefits of Professional Painting",
    excerpt: "Why hiring professionals can save you time, money, and provide superior results for your painting project.",
    date: "April 15, 2023",
    image: "https://www.roll-onpainting.com/wp-content/uploads/2020/12/interior-painting-process3-scaled.jpg",
    category: "Professional Services"
  },
  {
    id: 4,
    title: "Preparing Your Home for Paint: A Complete Guide",
    excerpt: "A step-by-step guide to prepare your home for a professional paint job to ensure the best results.",
    date: "March 10, 2023",
    image: "https://www.roll-onpainting.com/wp-content/uploads/2020/12/roll-on-painting-stage-4.jpg",
    category: "Painting Tips"
  },
  {
    id: 5,
    title: "Why Premium Paints Are Worth the Investment",
    excerpt: "Discover why investing in high-quality paints can save you money and provide superior results in the long run.",
    date: "February 15, 2023",
    image: "https://www.roll-onpainting.com/wp-content/uploads/2020/12/partition-frame-white-scaled.jpg",
    category: "Painting Tips"
  },
  {
    id: 6,
    title: "Creating a Perfect Accent Wall",
    excerpt: "Tips and tricks for creating a stunning accent wall that becomes the focal point of any room.",
    date: "January 20, 2023",
    image: "https://www.roll-onpainting.com/wp-content/uploads/2020/12/service-ff3-banner.jpg",
    category: "Design Trends"
  }
];
