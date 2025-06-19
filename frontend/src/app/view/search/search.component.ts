import { Component, type OnInit } from "@angular/core"
import { Router, ActivatedRoute } from "@angular/router"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

interface Portrait {
  id: number
  title: string
  artist: string
  image: string
  price: number
  originalPrice?: number
  category: string
  description: string
  rating: number
  reviews: number
  ratingStars: number[]
  isWishlisted: boolean
  inStock: boolean
  onSale: boolean
  style: string
}

interface Category {
  id: string
  name: string
  count: number
  icon: string
}

interface Style {
  id: string
  name: string
  count: number
}

interface Filter {
  id: string
  label: string
  type: string
  value: any
}

interface PopularSearch {
  query: string
  title: string
  image: string
  count: number
}

@Component({
  selector: "app-search",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  // Search State
  searchQuery = ""
  isSearching = false
  hasSearched = false
  searchResults: Portrait[] = []

  // View State
  viewMode: "grid" | "list" = "grid"
  sortBy = "relevance"
  showFilters = false

  // Pagination
  currentPage = 1
  itemsPerPage = 12
  totalPages = 1
  visiblePages: number[] = []

  // Filters
  selectedCategories: string[] = []
  selectedStyles: string[] = []
  selectedRating = 0
  priceRange = { min: 0, max: 1000 }
  filters = {
    inStock: false,
    onSale: false,
  }

  activeFilters: Filter[] = []
  activeFiltersCount = 0
  selectedCategory = ""

  // Data
  categories: Category[] = [
    { id: "portrait", name: "Portrait", count: 245, icon: "fas fa-user" },
    { id: "wedding", name: "Wedding", count: 189, icon: "fas fa-heart" },
    { id: "family", name: "Family", count: 156, icon: "fas fa-users" },
    { id: "corporate", name: "Corporate", count: 98, icon: "fas fa-briefcase" },
    { id: "fashion", name: "Fashion", count: 134, icon: "fas fa-tshirt" },
    { id: "artistic", name: "Artistic", count: 87, icon: "fas fa-palette" },
  ]

  styles: Style[] = [
    { id: "classic", name: "Classic", count: 156 },
    { id: "modern", name: "Modern", count: 234 },
    { id: "vintage", name: "Vintage", count: 89 },
    { id: "dramatic", name: "Dramatic", count: 67 },
    { id: "natural", name: "Natural", count: 198 },
    { id: "editorial", name: "Editorial", count: 45 },
  ]

  ratingOptions = [
    { value: 4, stars: [1, 2, 3, 4] },
    { value: 3, stars: [1, 2, 3] },
    { value: 2, stars: [1, 2] },
    { value: 1, stars: [1] },
  ]

  quickCategories: Category[] = [
    { id: "all", name: "All", count: 0, icon: "fas fa-th" },
    { id: "portrait", name: "Portrait", count: 245, icon: "fas fa-user" },
    { id: "wedding", name: "Wedding", count: 189, icon: "fas fa-heart" },
    { id: "family", name: "Family", count: 156, icon: "fas fa-users" },
    { id: "corporate", name: "Corporate", count: 98, icon: "fas fa-briefcase" },
  ]

  popularSearches: PopularSearch[] = [
    {
      query: "wedding portraits",
      title: "Wedding Portraits",
      image: "/placeholder.svg?height=200&width=300",
      count: 189,
    },
    {
      query: "family photography",
      title: "Family Photography",
      image: "/placeholder.svg?height=200&width=300",
      count: 156,
    },
    {
      query: "corporate headshots",
      title: "Corporate Headshots",
      image: "/placeholder.svg?height=200&width=300",
      count: 98,
    },
    {
      query: "artistic portraits",
      title: "Artistic Portraits",
      image: "/placeholder.svg?height=200&width=300",
      count: 87,
    },
  ]

  // Mock data for demonstration
  allPortraits: Portrait[] = [
    {
      id: 1,
      title: "Elegant Wedding Portrait",
      artist: "Sarah Johnson",
      image: "/placeholder.svg?height=400&width=300",
      price: 299,
      originalPrice: 399,
      category: "Wedding",
      description: "Beautiful wedding portrait capturing the perfect moment",
      rating: 4.8,
      reviews: 24,
      ratingStars: [1, 2, 3, 4, 5],
      isWishlisted: false,
      inStock: true,
      onSale: true,
      style: "classic",
    },
    {
      id: 2,
      title: "Modern Family Portrait",
      artist: "Michael Chen",
      image: "/placeholder.svg?height=400&width=300",
      price: 199,
      category: "Family",
      description: "Contemporary family portrait with natural lighting",
      rating: 4.6,
      reviews: 18,
      ratingStars: [1, 2, 3, 4],
      isWishlisted: true,
      inStock: true,
      onSale: false,
      style: "modern",
    },
    {
      id: 3,
      title: "Professional Headshot",
      artist: "Emily Davis",
      image: "/placeholder.svg?height=400&width=300",
      price: 149,
      category: "Corporate",
      description: "Professional corporate headshot for business use",
      rating: 4.9,
      reviews: 31,
      ratingStars: [1, 2, 3, 4, 5],
      isWishlisted: false,
      inStock: true,
      onSale: false,
      style: "classic",
    },
    {
      id: 4,
      title: "Artistic Portrait Study",
      artist: "David Wilson",
      image: "/placeholder.svg?height=400&width=300",
      price: 349,
      category: "Artistic",
      description: "Creative artistic portrait with dramatic lighting",
      rating: 4.7,
      reviews: 15,
      ratingStars: [1, 2, 3, 4],
      isWishlisted: false,
      inStock: false,
      onSale: false,
      style: "dramatic",
    },
    {
      id: 5,
      title: "Fashion Portrait",
      artist: "Lisa Anderson",
      image: "/placeholder.svg?height=400&width=300",
      price: 279,
      originalPrice: 329,
      category: "Fashion",
      description: "High-fashion portrait with editorial styling",
      rating: 4.5,
      reviews: 22,
      ratingStars: [1, 2, 3, 4],
      isWishlisted: true,
      inStock: true,
      onSale: true,
      style: "editorial",
    },
    {
      id: 6,
      title: "Classic Portrait",
      artist: "Robert Taylor",
      image: "/placeholder.svg?height=400&width=300",
      price: 229,
      category: "Portrait",
      description: "Timeless classic portrait with traditional composition",
      rating: 4.8,
      reviews: 28,
      ratingStars: [1, 2, 3, 4, 5],
      isWishlisted: false,
      inStock: true,
      onSale: false,
      style: "classic",
    },
  ]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // Initialize with popular portraits
    this.searchResults = [...this.allPortraits]
    this.updatePagination()

    // Check for query parameters
    this.route.queryParams.subscribe((params) => {
      if (params["q"]) {
        this.searchQuery = params["q"]
        this.performSearch()
      }
      if (params["category"]) {
        this.selectedCategory = params["category"]
        this.selectQuickCategory(params["category"])
      }
    })
  }

  // Search Methods
  onSearchInput(event: any) {
    this.searchQuery = event.target.value
    if (this.searchQuery.length > 2) {
      this.debounceSearch()
    }
  }

  debounceSearch() {
    clearTimeout(this.searchTimeout)
    this.searchTimeout = setTimeout(() => {
      this.performSearch()
    }, 300)
  }

  private searchTimeout: any

  performSearch() {
    this.isSearching = true
    this.hasSearched = true

    // Simulate API call
    setTimeout(() => {
      this.searchResults = this.filterPortraits()
      this.updatePagination()
      this.isSearching = false
    }, 800)
  }

  filterPortraits(): Portrait[] {
    let filtered = [...this.allPortraits]

    // Text search
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (portrait) =>
          portrait.title.toLowerCase().includes(query) ||
          portrait.artist.toLowerCase().includes(query) ||
          portrait.category.toLowerCase().includes(query) ||
          portrait.description.toLowerCase().includes(query),
      )
    }

    // Category filter
    if (this.selectedCategories.length > 0) {
      filtered = filtered.filter((portrait) => this.selectedCategories.includes(portrait.category.toLowerCase()))
    }

    // Style filter
    if (this.selectedStyles.length > 0) {
      filtered = filtered.filter((portrait) => this.selectedStyles.includes(portrait.style))
    }

    // Price range filter
    filtered = filtered.filter(
      (portrait) => portrait.price >= this.priceRange.min && portrait.price <= this.priceRange.max,
    )

    // Rating filter
    if (this.selectedRating > 0) {
      filtered = filtered.filter((portrait) => portrait.rating >= this.selectedRating)
    }

    // Availability filters
    if (this.filters.inStock) {
      filtered = filtered.filter((portrait) => portrait.inStock)
    }

    if (this.filters.onSale) {
      filtered = filtered.filter((portrait) => portrait.onSale)
    }

    // Sort results
    return this.sortPortraits(filtered)
  }

  sortPortraits(portraits: Portrait[]): Portrait[] {
    switch (this.sortBy) {
      case "newest":
        return portraits.sort((a, b) => b.id - a.id)
      case "oldest":
        return portraits.sort((a, b) => a.id - b.id)
      case "price-low":
        return portraits.sort((a, b) => a.price - b.price)
      case "price-high":
        return portraits.sort((a, b) => b.price - a.price)
      case "popular":
        return portraits.sort((a, b) => b.reviews - a.reviews)
      case "rating":
        return portraits.sort((a, b) => b.rating - a.rating)
      default:
        return portraits
    }
  }

  // Filter Methods
  selectQuickCategory(categoryId: string) {
    this.selectedCategory = categoryId
    if (categoryId === "all") {
      this.selectedCategories = []
    } else {
      this.selectedCategories = [categoryId]
    }
    this.updateActiveFilters()
    this.performSearch()
  }

  toggleCategory(categoryId: string) {
    const index = this.selectedCategories.indexOf(categoryId)
    if (index > -1) {
      this.selectedCategories.splice(index, 1)
    } else {
      this.selectedCategories.push(categoryId)
    }
    this.updateActiveFilters()
    this.performSearch()
  }

  toggleStyle(styleId: string) {
    const index = this.selectedStyles.indexOf(styleId)
    if (index > -1) {
      this.selectedStyles.splice(index, 1)
    } else {
      this.selectedStyles.push(styleId)
    }
    this.updateActiveFilters()
    this.performSearch()
  }

  onPriceChange() {
    this.updateActiveFilters()
    this.debounceSearch()
  }

  onRatingChange() {
    this.updateActiveFilters()
    this.performSearch()
  }

  onFilterChange() {
    this.updateActiveFilters()
    this.performSearch()
  }

  onSortChange() {
    this.performSearch()
  }

  updateActiveFilters() {
    this.activeFilters = []

    // Category filters
    this.selectedCategories.forEach((categoryId) => {
      const category = this.categories.find((c) => c.id === categoryId)
      if (category) {
        this.activeFilters.push({
          id: `category-${categoryId}`,
          label: category.name,
          type: "category",
          value: categoryId,
        })
      }
    })

    // Style filters
    this.selectedStyles.forEach((styleId) => {
      const style = this.styles.find((s) => s.id === styleId)
      if (style) {
        this.activeFilters.push({
          id: `style-${styleId}`,
          label: style.name,
          type: "style",
          value: styleId,
        })
      }
    })

    // Price filter
    if (this.priceRange.min > 0 || this.priceRange.max < 1000) {
      this.activeFilters.push({
        id: "price-range",
        label: `$${this.priceRange.min} - $${this.priceRange.max}`,
        type: "price",
        value: this.priceRange,
      })
    }

    // Rating filter
    if (this.selectedRating > 0) {
      this.activeFilters.push({
        id: "rating",
        label: `${this.selectedRating}+ Stars`,
        type: "rating",
        value: this.selectedRating,
      })
    }

    // Availability filters
    if (this.filters.inStock) {
      this.activeFilters.push({
        id: "in-stock",
        label: "In Stock",
        type: "availability",
        value: "inStock",
      })
    }

    if (this.filters.onSale) {
      this.activeFilters.push({
        id: "on-sale",
        label: "On Sale",
        type: "availability",
        value: "onSale",
      })
    }

    this.activeFiltersCount = this.activeFilters.length
  }

  removeFilter(filter: Filter) {
    switch (filter.type) {
      case "category":
        this.toggleCategory(filter.value)
        break
      case "style":
        this.toggleStyle(filter.value)
        break
      case "price":
        this.priceRange = { min: 0, max: 1000 }
        break
      case "rating":
        this.selectedRating = 0
        break
      case "availability":
        if (filter.value === "inStock") {
          this.filters.inStock = false
        } else if (filter.value === "onSale") {
          this.filters.onSale = false
        }
        break
    }
    this.updateActiveFilters()
    this.performSearch()
  }

  clearAllFilters() {
    this.selectedCategories = []
    this.selectedStyles = []
    this.selectedRating = 0
    this.priceRange = { min: 0, max: 1000 }
    this.filters = { inStock: false, onSale: false }
    this.selectedCategory = ""
    this.updateActiveFilters()
    this.performSearch()
  }

  // View Methods
  setViewMode(mode: "grid" | "list") {
    this.viewMode = mode
  }

  toggleFilters() {
    this.showFilters = !this.showFilters
  }

  // Pagination Methods
  updatePagination() {
    this.totalPages = Math.ceil(this.searchResults.length / this.itemsPerPage)
    this.updateVisiblePages()
  }

  updateVisiblePages() {
    const pages = []
    const start = Math.max(1, this.currentPage - 2)
    const end = Math.min(this.totalPages, this.currentPage + 2)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    this.visiblePages = pages
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page
      this.updateVisiblePages()
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Action Methods
  viewPortrait(id: number) {
    this.router.navigate(["/portrait-detail", id])
  }

  toggleWishlist(portrait: Portrait, event: Event) {
    event.stopPropagation()
    portrait.isWishlisted = !portrait.isWishlisted
    // Here you would typically call a service to update the wishlist
  }

  previewPortrait(portrait: Portrait, event: Event) {
    event.stopPropagation()
    // Implement preview modal logic
    console.log("Preview portrait:", portrait)
  }

  addToCart(portrait: Portrait, event: Event) {
    event.stopPropagation()
    // Implement add to cart logic
    console.log("Add to cart:", portrait)
  }

  searchSuggestion(query: string) {
    this.searchQuery = query
    this.performSearch()
  }

  resetSearch() {
    this.searchQuery = ""
    this.hasSearched = false
    this.clearAllFilters()
    this.searchResults = [...this.allPortraits]
    this.updatePagination()
  }
}
