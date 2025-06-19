import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"

interface Portrait {
  id: number
  title: string
  artist: string
  price: number
  imageUrl: string
  category: string
  description: string
  rating: number
  isPopular: boolean
  isInWishlist: boolean
  dimensions: string
  medium: string
  dateCreated: string
  views?: number
}

interface Collection {
  id: number
  title: string
  description: string
  artist: string
  category: string
  coverImage: string
  portraitCount: number
  startingPrice: number
  rating?: number
  views?: number
  isNew: boolean
  isFeatured: boolean
  isInWishlist: boolean
  createdDate: string
  artistInfo?: {
    profileImage: string
    location: string
    bio: string
    worksCount: number
    followersCount: number
    experience: number
  }
}

@Component({
  selector: "app-collection-detail",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./collection-detail.component.html",
  styleUrl: "./collection-detail.component.css",
})
export class CollectionDetailComponent implements OnInit {
  collection: Collection | null = null
  isLoading = true
  isFollowingArtist = false

  // Filter and search properties
  searchQuery = ""
  priceRange = "all"
  sortBy = "default"
  viewMode: "grid" | "list" = "grid"

  // Pagination
  currentPage = 1
  itemsPerPage = 12
  totalPages = 1

  // All portraits in this collection
  allPortraits: Portrait[] = []
  filteredPortraits: Portrait[] = []

  // Mock collections data
  private mockCollections: Collection[] = [
    {
      id: 1,
      title: "Elegant Evenings",
      description:
        "A sophisticated collection of evening portraits capturing the essence of elegance and grace in low-light settings. Each piece showcases masterful use of shadows and highlights to create dramatic, intimate portraits that speak to the soul.",
      artist: "Sarah Johnson",
      category: "Portrait",
      coverImage: "https://www.saatchiart.com/saatchi-images/saatchi/1611817/art/12627583/11689771-ZUCDKFHI-7.jpg",
      portraitCount: 12,
      startingPrice: 279,
      rating: 4.9,
      views: 2847,
      isNew: true,
      isFeatured: true,
      isInWishlist: false,
      createdDate: "2024-01-15",
      artistInfo: {
        profileImage: "/placeholder.svg?height=128&width=128",
        location: "New York, USA",
        bio: "Sarah Johnson is a renowned portrait photographer with over 15 years of experience capturing the essence of human emotion. Her work has been featured in galleries worldwide and she specializes in creating intimate, dramatic portraits that tell compelling stories.",
        worksCount: 127,
        followersCount: 2840,
        experience: 15,
      },
    },
    {
      id: 2,
      title: "Family Bonds",
      description:
        "Heartwarming family portraits that celebrate the beautiful connections between loved ones. Natural, candid moments captured with artistic flair.",
      artist: "Michael Chen",
      category: "Family",
      coverImage: "/placeholder.svg?height=400&width=800",
      portraitCount: 18,
      startingPrice: 450,
      rating: 4.8,
      views: 1923,
      isNew: false,
      isFeatured: true,
      isInWishlist: false,
      createdDate: "2024-01-10",
      artistInfo: {
        profileImage: "/placeholder.svg?height=128&width=128",
        location: "California, USA",
        bio: "Michael Chen specializes in family portraits that capture genuine moments and emotions between loved ones.",
        worksCount: 89,
        followersCount: 1520,
        experience: 12,
      },
    },
  ]

  // Mock portraits for collection 1 (Elegant Evenings)
  private mockPortraitsCollection1: Portrait[] = [
    {
      id: 101,
      title: "Evening Grace",
      artist: "Sarah Johnson",
      price: 299,
      imageUrl: "https://www.saatchiart.com/saatchi-images/saatchi/1438463/art/11709009/10771249-XRAYSFFF-7.jpg",
      category: "Portrait",
      description:
        "A stunning evening portrait capturing natural elegance with soft, warm lighting that creates an intimate atmosphere.",
      rating: 4.9,
      isPopular: true,
      isInWishlist: false,
      dimensions: "24x36 inches",
      medium: "Digital Print",
      dateCreated: "2024-01-15",
      views: 456,
    },
    {
      id: 102,
      title: "Twilight Beauty",
      artist: "Sarah Johnson",
      price: 349,
      imageUrl: "https://www.saatchiart.com/saatchi-images/saatchi/1438463/art/11709009/10771249-XRAYSFFF-7.jpg",
      category: "Portrait",
      description:
        "Captured during the golden hour, this portrait showcases the subject's natural beauty in soft twilight.",
      rating: 4.8,
      isPopular: false,
      isInWishlist: false,
      dimensions: "20x30 inches",
      medium: "Canvas Print",
      dateCreated: "2024-01-14",
      views: 324,
    },
    {
      id: 103,
      title: "Midnight Elegance",
      artist: "Sarah Johnson",
      price: 399,
      imageUrl: "https://www.saatchiart.com/saatchi-images/saatchi/1438463/art/11709009/10771249-XRAYSFFF-7.jpg",
      category: "Portrait",
      description:
        "A dramatic midnight portrait using creative lighting to highlight the subject's sophisticated features.",
      rating: 4.7,
      isPopular: true,
      isInWishlist: false,
      dimensions: "30x40 inches",
      medium: "Fine Art Print",
      dateCreated: "2024-01-13",
      views: 567,
    },
    {
      id: 104,
      title: "Dusk Portrait",
      artist: "Sarah Johnson",
      price: 279,
      imageUrl: "https://www.saatchiart.com/saatchi-images/saatchi/1438463/art/11709009/10771249-XRAYSFFF-7.jpg",
      category: "Portrait",
      description: "A serene dusk portrait that captures the peaceful transition from day to night.",
      rating: 4.6,
      isPopular: false,
      isInWishlist: false,
      dimensions: "18x24 inches",
      medium: "Digital Print",
      dateCreated: "2024-01-12",
      views: 289,
    },
    {
      id: 105,
      title: "Candlelight Charm",
      artist: "Sarah Johnson",
      price: 329,
      imageUrl: "https://www.saatchiart.com/saatchi-images/saatchi/1438463/art/11709009/10771249-XRAYSFFF-7.jpg",
      category: "Portrait",
      description: "An intimate portrait lit by candlelight, creating a warm and romantic atmosphere.",
      rating: 4.8,
      isPopular: false,
      isInWishlist: false,
      dimensions: "24x32 inches",
      medium: "Canvas Print",
      dateCreated: "2024-01-11",
      views: 412,
    },
    {
      id: 106,
      title: "Shadow Play",
      artist: "Sarah Johnson",
      price: 359,
      imageUrl: "/placeholder.svg?height=400&width=300",
      category: "Portrait",
      description: "A creative use of shadows and light to create depth and mystery in this evening portrait.",
      rating: 4.9,
      isPopular: true,
      isInWishlist: false,
      dimensions: "24x36 inches",
      medium: "Fine Art Print",
      dateCreated: "2024-01-10",
      views: 634,
    },
    {
      id: 107,
      title: "Moonlit Serenity",
      artist: "Sarah Johnson",
      price: 389,
      imageUrl: "/placeholder.svg?height=400&width=300",
      category: "Portrait",
      description: "A peaceful moonlit portrait that captures the subject's serene expression under natural moonlight.",
      rating: 4.7,
      isPopular: false,
      isInWishlist: false,
      dimensions: "20x30 inches",
      medium: "Digital Print",
      dateCreated: "2024-01-09",
      views: 345,
    },
    {
      id: 108,
      title: "Golden Hour Glow",
      artist: "Sarah Johnson",
      price: 319,
      imageUrl: "/placeholder.svg?height=400&width=300",
      category: "Portrait",
      description: "Captured during the magical golden hour, this portrait radiates warmth and natural beauty.",
      rating: 4.8,
      isPopular: false,
      isInWishlist: false,
      dimensions: "24x32 inches",
      medium: "Canvas Print",
      dateCreated: "2024-01-08",
      views: 478,
    },
    {
      id: 109,
      title: "Evening Reflection",
      artist: "Sarah Johnson",
      price: 369,
      imageUrl: "/placeholder.svg?height=400&width=300",
      category: "Portrait",
      description: "A contemplative evening portrait that captures a moment of quiet reflection and introspection.",
      rating: 4.6,
      isPopular: false,
      isInWishlist: false,
      dimensions: "18x24 inches",
      medium: "Fine Art Print",
      dateCreated: "2024-01-07",
      views: 267,
    },
    {
      id: 110,
      title: "Starlight Dreams",
      artist: "Sarah Johnson",
      price: 429,
      imageUrl: "/placeholder.svg?height=400&width=300",
      category: "Portrait",
      description: "A dreamy portrait taken under starlight, creating an ethereal and magical atmosphere.",
      rating: 4.9,
      isPopular: true,
      isInWishlist: false,
      dimensions: "30x40 inches",
      medium: "Gallery Canvas",
      dateCreated: "2024-01-06",
      views: 789,
    },
    {
      id: 111,
      title: "Velvet Night",
      artist: "Sarah Johnson",
      price: 339,
      imageUrl: "/placeholder.svg?height=400&width=300",
      category: "Portrait",
      description: "A luxurious evening portrait with rich, velvety tones that create an atmosphere of sophistication.",
      rating: 4.7,
      isPopular: false,
      isInWishlist: false,
      dimensions: "24x36 inches",
      medium: "Digital Print",
      dateCreated: "2024-01-05",
      views: 356,
    },
    {
      id: 112,
      title: "Amber Twilight",
      artist: "Sarah Johnson",
      price: 379,
      imageUrl: "/placeholder.svg?height=400&width=300",
      category: "Portrait",
      description: "A warm twilight portrait with amber tones that highlight the subject's natural radiance.",
      rating: 4.8,
      isPopular: false,
      isInWishlist: false,
      dimensions: "20x30 inches",
      medium: "Canvas Print",
      dateCreated: "2024-01-04",
      views: 423,
    },
  ]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const collectionId = +params["id"]
      this.loadCollection(collectionId)
    })
  }

  /**
   * Load collection details and portraits
   */
  loadCollection(id: number): void {
    this.isLoading = true

    // Simulate API call
    setTimeout(() => {
      this.collection = this.mockCollections.find((c) => c.id === id) || null

      if (this.collection) {
        this.loadCollectionPortraits(id)
      }

      this.isLoading = false
    }, 800)
  }

  /**
   * Load portraits for the collection
   */
  loadCollectionPortraits(collectionId: number): void {
    // For demo, only collection 1 has detailed portraits
    if (collectionId === 1) {
      this.allPortraits = [...this.mockPortraitsCollection1]
    } else {
      // Generate mock portraits for other collections
      this.allPortraits = this.generateMockPortraits(collectionId)
    }

    this.applyFilters()
  }

  /**
   * Generate mock portraits for collections without detailed data
   */
  generateMockPortraits(collectionId: number): Portrait[] {
    const collection = this.collection
    if (!collection) return []

    const portraits: Portrait[] = []
    const basePrice = collection.startingPrice

    for (let i = 1; i <= collection.portraitCount; i++) {
      portraits.push({
        id: collectionId * 100 + i,
        title: `${collection.category} Portrait ${i}`,
        artist: collection.artist,
        price: basePrice + Math.floor(Math.random() * 200),
        imageUrl: `/placeholder.svg?height=400&width=300&text=Portrait${i}`,
        category: collection.category,
        description: `A beautiful ${collection.category.toLowerCase()} portrait showcasing artistic excellence and emotional depth.`,
        rating: 4.5 + Math.random() * 0.5,
        isPopular: Math.random() > 0.7,
        isInWishlist: false,
        dimensions: ["18x24 inches", "20x30 inches", "24x36 inches"][Math.floor(Math.random() * 3)],
        medium: ["Digital Print", "Canvas Print", "Fine Art Print"][Math.floor(Math.random() * 3)],
        dateCreated: `2024-01-${String(Math.floor(Math.random() * 15) + 1).padStart(2, "0")}`,
        views: Math.floor(Math.random() * 500) + 100,
      })
    }

    return portraits
  }

  /**
   * Apply all active filters
   */
  applyFilters(): void {
    let filtered = [...this.allPortraits]

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (portrait) =>
          portrait.title.toLowerCase().includes(query) ||
          portrait.description.toLowerCase().includes(query) ||
          portrait.dimensions.toLowerCase().includes(query),
      )
    }

    // Apply price range filter
    if (this.priceRange !== "all") {
      filtered = this.filterByPriceRange(filtered)
    }

    // Apply sorting
    filtered = this.sortPortraits(filtered)

    this.filteredPortraits = filtered
    this.updatePagination()
  }

  /**
   * Filter by price range
   */
  filterByPriceRange(portraits: Portrait[]): Portrait[] {
    switch (this.priceRange) {
      case "0-200":
        return portraits.filter((p) => p.price <= 200)
      case "200-400":
        return portraits.filter((p) => p.price > 200 && p.price <= 400)
      case "400-600":
        return portraits.filter((p) => p.price > 400 && p.price <= 600)
      case "600+":
        return portraits.filter((p) => p.price > 600)
      default:
        return portraits
    }
  }

  /**
   * Sort portraits based on selected criteria
   */
  sortPortraits(portraits: Portrait[]): Portrait[] {
    return portraits.sort((a, b) => {
      switch (this.sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
          return a.title.localeCompare(b.title)
        case "popular":
          return b.rating - a.rating
        default:
          return 0 // Keep original order
      }
    })
  }

  /**
   * Handle search input
   */
  onSearch(): void {
    this.currentPage = 1
    this.applyFilters()
  }

  /**
   * Handle price range change
   */
  onPriceRangeChange(): void {
    this.currentPage = 1
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
    return this.searchQuery.trim() !== "" || this.priceRange !== "all"
  }

  /**
   * Clear search filter
   */
  clearSearch(): void {
    this.searchQuery = ""
    this.applyFilters()
  }

  /**
   * Clear price range filter
   */
  clearPriceRange(): void {
    this.priceRange = "all"
    this.applyFilters()
  }

  /**
   * Clear all filters
   */
  clearAllFilters(): void {
    this.searchQuery = ""
    this.priceRange = "all"
    this.sortBy = "default"
    this.currentPage = 1
    this.applyFilters()
  }

  /**
   * Get price range label
   */
  getPriceRangeLabel(): string {
    const labels = {
      "0-200": "$0 - $200",
      "200-400": "$200 - $400",
      "400-600": "$400 - $600",
      "600+": "$600+",
    }
    return labels[this.priceRange as keyof typeof labels] || ""
  }

  /**
   * Get results text
   */
  getResultsText(): string {
    if (this.hasActiveFilters()) {
      return `Filtered from ${this.allPortraits.length} total portraits`
    }
    return "Showing all portraits in this collection"
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
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  /**
   * Toggle collection wishlist
   */
  toggleCollectionWishlist(): void {
    if (this.collection) {
      this.collection.isInWishlist = !this.collection.isInWishlist
      const action = this.collection.isInWishlist ? "added to" : "removed from"
      alert(`${this.collection.title} collection ${action} your wishlist!`)
    }
  }

  /**
   * View portrait details
   */
  viewPortrait(portrait: Portrait): void {
    this.router.navigate(["/product-detail", portrait.id])
  }

  /**
   * Add to wishlist
   */
  addToWishlist(portrait: Portrait, event: Event): void {
    event.stopPropagation()
    portrait.isInWishlist = !portrait.isInWishlist

    const action = portrait.isInWishlist ? "added to" : "removed from"
    alert(`${portrait.title} ${action} your wishlist!`)
  }

  /**
   * Add to cart
   */
  addToCart(portrait: Portrait): void {
    console.log("Adding to cart:", portrait)
    alert(`${portrait.title} added to cart!`)
  }

  /**
   * Follow/unfollow artist
   */
  followArtist(): void {
    this.isFollowingArtist = !this.isFollowingArtist
    const action = this.isFollowingArtist ? "following" : "unfollowed"
    alert(`You are now ${action} ${this.collection?.artist}!`)
  }

  /**
   * View artist profile
   */
  viewArtistProfile(): void {
    console.log("Viewing artist profile")
    // Navigate to artist profile page
  }

  /**
   * Track by function for ngFor
   */
  trackByPortraitId(index: number, portrait: Portrait): number {
    return portrait.id
  }

  /**
   * Navigation methods
   */
  navigateTo(route: string): void {
    this.router.navigate([route])
  }

  goBack(): void {
    this.router.navigate(["/collection"])
  }

  // Pagination methods
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredPortraits.length / this.itemsPerPage)
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = 1
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = []
    const maxVisible = 5
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2))
    const end = Math.min(this.totalPages, start + maxVisible - 1)

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  goToPage(page: number): void {
    this.currentPage = page
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++
    }
  }

  get paginatedPortraits(): Portrait[] {
    const start = (this.currentPage - 1) * this.itemsPerPage
    const end = start + this.itemsPerPage
    return this.filteredPortraits.slice(start, end)
  }
}
