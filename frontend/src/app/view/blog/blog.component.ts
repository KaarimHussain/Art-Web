import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { RouterLink } from "@angular/router"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  image: string
  readTime: string
  tags: string[]
  featured: boolean
}

interface BlogCategory {
  name: string
  count: number
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Art of Natural Light in Portrait Photography",
      excerpt:
        "Discover how to harness the power of natural light to create stunning, professional portraits that capture the essence of your subjects.",
      content: "Natural light is one of the most powerful tools in a photographer's arsenal...",
      author: "Jane Doe",
      date: "2024-01-15",
      category: "Techniques",
      image: "/placeholder.svg?height=400&width=600",
      readTime: "8 min read",
      tags: ["lighting", "portraits", "natural-light"],
      featured: true,
    },
    {
      id: 2,
      title: "Building Confidence: Tips for Nervous Portrait Subjects",
      excerpt:
        "Learn proven techniques to help your clients feel comfortable and confident during their portrait sessions.",
      content: "Working with nervous subjects is part of every portrait photographer's journey...",
      author: "John Smith",
      date: "2024-01-12",
      category: "Client Relations",
      image: "/placeholder.svg?height=400&width=600",
      readTime: "6 min read",
      tags: ["client-care", "confidence", "communication"],
      featured: false,
    },
    {
      id: 3,
      title: "Color Theory in Portrait Photography",
      excerpt: "Understanding how colors work together can transform your portraits from good to extraordinary.",
      content: "Color theory is fundamental to creating compelling visual narratives...",
      author: "Sarah Johnson",
      date: "2024-01-10",
      category: "Theory",
      image: "/placeholder.svg?height=400&width=600",
      readTime: "10 min read",
      tags: ["color-theory", "composition", "aesthetics"],
      featured: true,
    },
    {
      id: 4,
      title: "Essential Equipment for Professional Portraits",
      excerpt: "A comprehensive guide to the must-have gear for creating professional-quality portrait photography.",
      content: "Having the right equipment can make all the difference in your portrait work...",
      author: "Mike Wilson",
      date: "2024-01-08",
      category: "Equipment",
      image: "/placeholder.svg?height=400&width=600",
      readTime: "12 min read",
      tags: ["equipment", "gear", "professional"],
      featured: false,
    },
    {
      id: 5,
      title: "Post-Processing Techniques for Timeless Portraits",
      excerpt: "Master the art of digital editing to enhance your portraits while maintaining their natural beauty.",
      content: "Post-processing is where good portraits become great portraits...",
      author: "Emily Chen",
      date: "2024-01-05",
      category: "Post-Processing",
      image: "/placeholder.svg?height=400&width=600",
      readTime: "15 min read",
      tags: ["editing", "post-processing", "digital"],
      featured: false,
    },
    {
      id: 6,
      title: "Creating Emotional Connection in Family Portraits",
      excerpt: "Techniques for capturing genuine emotions and authentic moments in family photography sessions.",
      content: "Family portraits are about more than just getting everyone to look at the camera...",
      author: "David Brown",
      date: "2024-01-03",
      category: "Family Photography",
      image: "/placeholder.svg?height=400&width=600",
      readTime: "9 min read",
      tags: ["family", "emotions", "connection"],
      featured: false,
    },
  ]

  categories: BlogCategory[] = [
    { name: "All Posts", count: 6 },
    { name: "Techniques", count: 2 },
    { name: "Client Relations", count: 1 },
    { name: "Theory", count: 1 },
    { name: "Equipment", count: 1 },
    { name: "Post-Processing", count: 1 },
  ]

  filteredPosts: BlogPost[] = []
  activeCategory = "All Posts"
  searchTerm = ""
  featuredPosts: BlogPost[] = []

  ngOnInit(): void {
    this.filteredPosts = this.blogPosts
    this.featuredPosts = this.blogPosts.filter((post) => post.featured)
  }

  filterByCategory(category: string): void {
    this.activeCategory = category
    if (category === "All Posts") {
      this.filteredPosts = this.blogPosts
    } else {
      this.filteredPosts = this.blogPosts.filter((post) => post.category === category)
    }
  }

  searchPosts(): void {
    if (!this.searchTerm.trim()) {
      this.filteredPosts =
        this.activeCategory === "All Posts"
          ? this.blogPosts
          : this.blogPosts.filter((post) => post.category === this.activeCategory)
    } else {
      const filtered = this.blogPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(this.searchTerm.toLowerCase())),
      )
      this.filteredPosts =
        this.activeCategory === "All Posts"
          ? filtered
          : filtered.filter((post) => post.category === this.activeCategory)
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
}
