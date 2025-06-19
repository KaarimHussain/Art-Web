import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"

interface Portrait {
  id: number
  title: string
  artist: string
  price: number
  imageUrl: string
  category: string
}

interface Collection {
  id: number
  title: string
  description: string
  artist: string
  category: string
  coverImage: string
  previewPortraits: Portrait[]
  portraitCount: number
  startingPrice: number
  rating?: number
  isNew: boolean
  isFeatured: boolean
  isInWishlist: boolean
  createdDate: string
}

@Component({
  selector: "app-collection",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./collection.component.html",
  styleUrl: "./collection.component.css",
})
export class CollectionComponent implements OnInit {
  // Filter and search properties
  searchQuery = ""
  selectedCategory = "All"
  sortBy = "newest"
  viewMode: "grid" | "list" = "grid"

  // Loading state
  isLoading = false

  // Categories for filtering
  categories = ["All", "Portrait", "Family", "Wedding", "Corporate", "Fashion", "Artistic", "Children"]

  // All collections data
  allCollections: Collection[] = [
    {
      id: 1,
      title: "Elegant Evenings",
      description:
        "A sophisticated collection of evening portraits capturing the essence of elegance and grace in low-light settings. Each piece showcases masterful use of shadows and highlights.",
      artist: "Sarah Johnson",
      category: "Portrait",
      coverImage: "/placeholder.svg?height=400&width=600",
      previewPortraits: [
        {
          id: 101,
          title: "Evening Grace",
          artist: "Sarah Johnson",
          price: 299,
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Portrait",
        },
        {
          id: 102,
          title: "Twilight Beauty",
          artist: "Sarah Johnson",
          price: 349,
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Portrait",
        },
        {
          id: 103,
          title: "Midnight Elegance",
          artist: "Sarah Johnson",
          price: 399,
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Portrait",
        },
        {
          id: 104,
          title: "Dusk Portrait",
          artist: "Sarah Johnson",
          price: 279,
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Portrait",
        },
      ],
      portraitCount: 12,
      startingPrice: 279,
      rating: 4.9,
      isNew: true,
      isFeatured: true,
      isInWishlist: false,
      createdDate: "2024-01-15",
    },
    {
      id: 2,
      title: "Family Bonds",
      description:
        "Heartwarming family portraits that celebrate the beautiful connections between loved ones. Natural, candid moments captured with artistic flair.",
      artist: "Michael Chen",
      category: "Family",
      coverImage: "/placeholder.svg?height=400&width=600",
      previewPortraits: [
        {
          id: 201,
          title: "Family Unity",
          artist: "Michael Chen",
          price: 450,
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Family",
        },
        {
          id: 202,
          title: "Generations",
          artist: "Michael Chen",
          price: 520,
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Family",
        },
        {
          id: 203,
          title: "Love & Laughter",
          artist: "Michael Chen",
          price: 480,
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Family",
        },
        {
          id: 204,
          title: "Together Forever",
          artist: "Michael Chen",
          price: 495,
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Family",
        },
      ],
      portraitCount: 18,
      startingPrice: 450,
      rating: 4.8,
      isNew: false,
      isFeatured: true,
      isInWishlist: false,
      createdDate: "2024-01-10",
    },
    {
      id: 3,
      title: "Wedding Dreams",
      description:
        "Romantic wedding portraits that capture the magic and emotion of your special day. Timeless memories preserved with artistic excellence.",
      artist: "Emma Rodriguez",
      category: "Wedding",
      coverImage: "/placeholder.svg?height=400&width=600",
      previewPortraits: [
        {
          id: 301,
          title: "First Dance",
          artist: "Emma Rodriguez",
          price: 599,
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Wedding",
        },
        {
          id: 302,
          title: "Eternal Vows",
          artist: "Emma Rodriguez",
          price: 649,
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Wedding",
        },
        {
          id: 303,
          title: "Wedding Bliss",
          artist: "Emma Rodriguez",
          price: 579,
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Wedding",
        },
        {
          id: 304,
          title: "Love's Promise",
          artist: "Emma Rodriguez",
          price: 625,
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Wedding",
        },
      ],
      portraitCount: 25,
      startingPrice: 579,
      rating: 5.0,
      isNew: false,
      isFeatured: true,
      isInWishlist: false,
      createdDate: "2024-01-08",
    },
    {
      id: 4,
      title: "Executive Presence",
      description:
        "Professional corporate headshots that convey confidence, approachability, and leadership. Perfect for business profiles and marketing materials.",
      artist: "David Kim",
      category: "Corporate",
      coverImage: "/placeholder.svg?height=400&width=600",
      previewPortraits: [
        {
          id: 401,
          title: "CEO Portrait",
          artist: "David Kim",
          price: 199,
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Corporate",
        },
        {
          id: 402,
          title: "Executive Profile",
          artist: "David Kim",
          price: 229,
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Corporate",
        },
        {
          id: 403,
          title: "Business Leader",
          artist: "David Kim",
          price: 249,
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Corporate",
        },
        {
          id: 404,
          title: "Professional Headshot",
          artist: "David Kim",
          price: 189,
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Corporate",
        },
      ],
      portraitCount: 15,
      startingPrice: 189,
      rating: 4.7,
      isNew: false,
      isFeatured: false,
      isInWishlist: false,
      createdDate: "2024-01-05",
    },
    {
      id: 5,
      title: "Fashion Forward",
      description:
        "Bold and contemporary fashion portraits featuring dramatic lighting and cutting-edge styling. Art meets fashion in stunning visual narratives.",
      artist: "Lisa Thompson",
      category: "Fashion",
      coverImage: "/placeholder.svg?height=400&width=600",
      previewPortraits: [
        {
          id: 501,
          title: "Avant-Garde",
          artist: "Lisa Thompson",
          price: 399,
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Fashion",
        },
        {
          id: 502,
          title: "Modern Muse",
          artist: "Lisa Thompson",
          price: 429,
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Fashion",
        },
        {
          id: 503,
          title: "Style Icon",
          artist: "Lisa Thompson",
          price: 459,
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Fashion",
        },
        {
          id: 504,
          title: "Fashion Statement",
          artist: "Lisa Thompson",
          price: 379,
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Fashion",
        },
      ],
      portraitCount: 20,
      startingPrice: 379,
      rating: 4.6,
      isNew: true,
      isFeatured: false,
      isInWishlist: false,
      createdDate: "2024-01-03",
    },
    {
      id: 6,
      title: "Artistic Visions",
      description:
        "Experimental and avant-garde portraits that push the boundaries of traditional photography. Creative compositions that challenge perception.",
      artist: "Robert Martinez",
      category: "Artistic",
      coverImage: "/placeholder.svg?height=400&width=600",
      previewPortraits: [
        {
          id: 601,
          title: "Abstract Beauty",
          artist: "Robert Martinez",
          price: 799,
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Artistic",
        },
        {
          id: 602,
          title: "Surreal Portrait",
          artist: "Robert Martinez",
          price: 849,
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Artistic",
        },
        {
          id: 603,
          title: "Creative Vision",
          artist: "Robert Martinez",
          price: 729,
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Artistic",
        },
        {
          id: 604,
          title: "Artistic Expression",
          artist: "Robert Martinez",
          price: 779,
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Artistic",
        },
      ],
      portraitCount: 14,
      startingPrice: 729,
      rating: 4.9,
      isNew: false,
      isFeatured: true,
      isInWishlist: false,
      createdDate: "2024-01-01",
    },
  ]

  // Filtered collections based on current filters
  filteredCollections: Collection[] = []

  // Featured collections
  featuredCollections: Collection[] = []

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadCollections()
  }

  /**
   * Load and filter collections
   */
  loadCollections(): void {
    this.isLoading = true

    // Simulate API call delay
    setTimeout(() => {
      this.applyFilters()
      this.loadFeaturedCollections()
      this.isLoading = false
    }, 500)
  }

  /**
   * Load featured collections
   */
  loadFeaturedCollections(): void {
    this.featuredCollections = this.allCollections.filter((collection) => collection.isFeatured).slice(0, 3)
  }

  /**
   * Apply all active filters
   */
  applyFilters(): void {
    let filtered = [...this.allCollections]

    // Apply category filter
    if (this.selectedCategory !== "All") {
      filtered = filtered.filter((collection) => collection.category === this.selectedCategory)
    }

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (collection) =>
          collection.title.toLowerCase().includes(query) ||
          collection.artist.toLowerCase().includes(query) ||
          collection.description.toLowerCase().includes(query) ||
          collection.category.toLowerCase().includes(query),
      )
    }

    // Apply sorting
    filtered = this.sortCollections(filtered)

    this.filteredCollections = filtered
  }

  /**
   * Sort collections based on selected criteria
   */
  sortCollections(collections: Collection[]): Collection[] {
    return collections.sort((a, b) => {
      switch (this.sortBy) {
        case "newest":
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        case "oldest":
          return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
        case "popular":
          return (b.rating || 0) - (a.rating || 0)
        case "name":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })
  }

  /**
   * Handle search input
   */
  onSearch(): void {
    this.applyFilters()
  }

  /**
   * Select category filter
   */
  selectCategory(category: string): void {
    this.selectedCategory = category
    this.applyFilters()
  }

  /**
   * Handle sort change
   */
  onSortChange(): void {
    this.applyFilters()
  }

  /**
   * Set view mode
   */
  setViewMode(mode: "grid" | "list"): void {
    this.viewMode = mode
  }

  /**
   * Check if there are active filters
   */
  hasActiveFilters(): boolean {
    return this.selectedCategory !== "All" || this.searchQuery.trim() !== ""
  }

  /**
   * Clear category filter
   */
  clearCategoryFilter(): void {
    this.selectedCategory = "All"
    this.applyFilters()
  }

  /**
   * Clear search filter
   */
  clearSearch(): void {
    this.searchQuery = ""
    this.applyFilters()
  }

  /**
   * Clear all filters
   */
  clearAllFilters(): void {
    this.selectedCategory = "All"
    this.searchQuery = ""
    this.sortBy = "newest"
    this.applyFilters()
  }

  /**
   * Get total portraits count
   */
  getTotalPortraitsCount(): number {
    return this.filteredCollections.reduce((total, collection) => total + collection.portraitCount, 0)
  }

  /**
   * Get category badge class
   */
  getCategoryBadgeClass(category: string): string {
    const classes = {
      Portrait: "bg-emerald-600/20 text-emerald-400 border border-emerald-600/30",
      Family: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
      Wedding: "bg-pink-500/20 text-pink-400 border border-pink-500/30",
      Corporate: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
      Fashion: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
      Artistic: "bg-red-500/20 text-red-400 border border-red-500/30",
      Children: "bg-green-500/20 text-green-400 border border-green-500/30",
    }
    return classes[category as keyof typeof classes] || "bg-slate-600/20 text-slate-400 border border-slate-600/30"
  }

  /**
   * Get formatted date
   */
  getFormattedDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  /**
   * View collection details
   */
  viewCollection(collection: Collection): void {
    // Navigate to collection detail page (you can create this route)
    console.log("Viewing collection:", collection.title)
    // this.router.navigate(['/collection-detail', collection.id])

    // For now, show alert
    alert(`Viewing collection: ${collection.title}`)
  }

  /**
   * View individual portrait
   */
  viewPortrait(portrait: Portrait, event: Event): void {
    event.stopPropagation()
    this.router.navigate(["/product-detail", portrait.id])
  }

  /**
   * Toggle collection wishlist
   */
  toggleCollectionWishlist(collection: Collection, event: Event): void {
    event.stopPropagation()
    collection.isInWishlist = !collection.isInWishlist

    const action = collection.isInWishlist ? "added to" : "removed from"
    alert(`${collection.title} collection ${action} your wishlist!`)
  }

  /**
   * Track by function for ngFor
   */
  trackByCollectionId(index: number, collection: Collection): number {
    return collection.id
  }
}
