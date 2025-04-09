export interface ITestimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  avatar: string;
}

export const testimonials: ITestimonial[] = [
  {
    id: "1",
    name: "John Doe",
    role: "Bicycle Enthusiast",
    comment:
      "I found my dream bicycle here! The selection and customer service are unparalleled.",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "First-time Buyer",
    comment:
      "As a first-time bicycle buyer, I felt supported throughout the entire process. Highly recommend!",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "3",
    name: "Mike Johnson",
    role: "Bicycle Collector",
    comment:
      "The rare models they offer are simply amazing. A paradise for car collectors!",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: "4",
    name: "Emily Brown",
    role: "Family Bicycle Owner",
    comment:
      "Found the perfect family bicycle here. Safe, spacious, and within our budget!",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: "5",
    name: "Alex Lee",
    role: "Tech Enthusiast",
    comment:
      "The electric vehicle options are cutting-edge. Love the eco-friendly choices!",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
];
