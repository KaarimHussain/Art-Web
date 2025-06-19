import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface Portrait {
  id: number;
  title: string;
  artist: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  images: string[];
  category: string;
  description: string;
  rating: number;
  reviewCount?: number;
  views?: number;
  isPopular: boolean;
  isInWishlist: boolean;
  dimensions: string;
  medium: string;
  dateCreated: string;
  edition?: string;
  tags: string[];
  artistInfo?: {
    profileImage: string;
    location: string;
    bio: string;
    worksCount: number;
    followersCount: number;
  };
}

interface SizeOption {
  id: string;
  name: string;
  dimensions: string;
  price: number;
  originalPrice?: number;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})

export class ProductDetailComponent implements OnInit {
  portrait: Portrait | null = null
  isLoading = true
  selectedImage = ""
  selectedSizeOption = "medium"
  quantity = 1
  maxQuantity = 10
  isFollowingArtist = false

  // Size options for purchase
  sizeOptions: SizeOption[] = [
    {
      id: "small",
      name: "Small Print",
      dimensions: "12x16 inches",
      price: 199,
      originalPrice: 249,
    },
    {
      id: "medium",
      name: "Medium Print",
      dimensions: "18x24 inches",
      price: 299,
      originalPrice: 349,
    },
    {
      id: "large",
      name: "Large Print",
      dimensions: "24x32 inches",
      price: 449,
      originalPrice: 499,
    },
    {
      id: "xlarge",
      name: "Extra Large Print",
      dimensions: "30x40 inches",
      price: 699,
      originalPrice: 799,
    },
  ]

  // Related portraits
  relatedPortraits: Portrait[] = []

  // Mock data - replace with actual API calls
  private mockPortraits: Portrait[] = [
    {
      id: 1,
      title: "Elegant Evening Portrait",
      artist: "Sarah Johnson",
      price: 299,
      originalPrice: 349,
      imageUrl: "/placeholder.svg?height=600&width=480",
      images: [
        "/placeholder.svg?height=600&width=480",
        "/placeholder.svg?height=600&width=480&text=View2",
        "/placeholder.svg?height=600&width=480&text=View3",
        "/placeholder.svg?height=600&width=480&text=Detail",
      ],
      category: "Portrait",
      description:
        "A stunning evening portrait capturing the subject's natural elegance and grace in soft, warm lighting. This piece showcases masterful use of chiaroscuro technique, creating dramatic contrasts that highlight the subject's features while maintaining an intimate, contemplative mood. The composition draws the viewer into a moment of quiet reflection, making it a perfect centerpiece for any sophisticated interior space.",
      rating: 4.8,
      reviewCount: 24,
      views: 1247,
      isPopular: true,
      isInWishlist: false,
      dimensions: "24x36 inches",
      medium: "Digital Print on Canvas",
      dateCreated: "2024-01-15",
      edition: "Limited Edition of 50",
      tags: ["Portrait", "Evening", "Elegant", "Contemporary", "Dramatic Lighting"],
      artistInfo: {
        profileImage: "/placeholder.svg?height=64&width=64",
        location: "New York, USA",
        bio: "Sarah Johnson is a renowned portrait photographer with over 15 years of experience capturing the essence of human emotion. Her work has been featured in galleries worldwide.",
        worksCount: 127,
        followersCount: 2840,
      },
    },
    {
      id: 2,
      title: "Family Harmony",
      artist: "Michael Chen",
      price: 450,
      imageUrl: "/placeholder.svg?height=600&width=480",
      images: ["/placeholder.svg?height=600&width=480", "/placeholder.svg?height=600&width=480&text=View2"],
      category: "Family",
      description:
        "A heartwarming family portrait showcasing the beautiful bond between loved ones in a natural outdoor setting.",
      rating: 4.9,
      reviewCount: 18,
      views: 892,
      isPopular: true,
      isInWishlist: false,
      dimensions: "30x40 inches",
      medium: "Canvas Print",
      dateCreated: "2024-01-10",
      tags: ["Family", "Outdoor", "Natural"],
      artistInfo: {
        profileImage: "/placeholder.svg?height=64&width=64",
        location: "California, USA",
        bio: "Michael Chen specializes in family portraits that capture genuine moments and emotions.",
        worksCount: 89,
        followersCount: 1520,
      },
    },
    {
      id: 3,
      title: "Wedding Bliss",
      artist: "Emma Rodriguez",
      price: 599,
      imageUrl: "/placeholder.svg?height=600&width=480",
      images: ["/placeholder.svg?height=600&width=480"],
      category: "Wedding",
      description: "A romantic wedding portrait capturing the pure joy and love of the couple on their special day.",
      rating: 5.0,
      reviewCount: 32,
      views: 1456,
      isPopular: true,
      isInWishlist: false,
      dimensions: "20x30 inches",
      medium: "Fine Art Print",
      dateCreated: "2024-01-08",
      tags: ["Wedding", "Romance", "Love"],
      artistInfo: {
        profileImage: "/placeholder.svg?height=64&width=64",
        location: "Texas, USA",
        bio: "Emma Rodriguez is a wedding photographer known for her romantic and timeless style.",
        worksCount: 156,
        followersCount: 3240,
      },
    },
  ]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const portraitId = +params["id"]
      this.loadPortrait(portraitId)
    })
  }

  /**
   * Load portrait details
   */
  loadPortrait(id: number): void {
    this.isLoading = true

    // Simulate API call
    setTimeout(() => {
      this.portrait = this.mockPortraits.find((p) => p.id === id) || null

      if (this.portrait) {
        this.selectedImage = this.portrait.images[0]
        this.loadRelatedPortraits()
      }

      this.isLoading = false
    }, 800)
  }

  /**
   * Load related portraits
   */
  loadRelatedPortraits(): void {
    if (!this.portrait) return

    // Mock related portraits - filter out current portrait
    this.relatedPortraits = this.mockPortraits.filter((p) => p.id !== this.portrait!.id).slice(0, 4)
  }

  /**
   * Select image for main display
   */
  selectImage(image: string): void {
    this.selectedImage = image
  }

  /**
   * Open image viewer (full screen)
   */
  openImageViewer(): void {
    console.log("Opening image viewer for:", this.selectedImage)
    // Implement full-screen image viewer
  }

  /**
   * Toggle wishlist status
   */
  toggleWishlist(): void {
    if (this.portrait) {
      this.portrait.isInWishlist = !this.portrait.isInWishlist
      const action = this.portrait.isInWishlist ? "added to" : "removed from"
      alert(`${this.portrait.title} ${action} your wishlist!`)
    }
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
   * Get star array for rating display
   */
  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0)
  }

  /**
   * Get year from date string
   */
  getYear(dateString: string): string {
    if (!dateString) return "N/A"
    return new Date(dateString).getFullYear().toString()
  }

  /**
   * Get discount percentage
   */
  getDiscountPercentage(): number {
    if (!this.portrait?.originalPrice || !this.portrait?.price) return 0
    return Math.round(((this.portrait.originalPrice - this.portrait.price) / this.portrait.originalPrice) * 100)
  }

  /**
   * Increase quantity
   */
  increaseQuantity(): void {
    if (this.quantity < this.maxQuantity) {
      this.quantity++
    }
  }

  /**
   * Decrease quantity
   */
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--
    }
  }

  /**
   * Get selected size option
   */
  getSelectedSizeOption(): SizeOption {
    return this.sizeOptions.find((option) => option.id === this.selectedSizeOption) || this.sizeOptions[0]
  }

  /**
   * Get total price
   */
  getTotalPrice(): number {
    const selectedOption = this.getSelectedSizeOption()
    return selectedOption.price * this.quantity
  }

  /**
   * Add to cart
   */
  addToCart(): void {
    const selectedOption = this.getSelectedSizeOption()
    console.log("Adding to cart:", {
      portrait: this.portrait,
      sizeOption: selectedOption,
      quantity: this.quantity,
      totalPrice: this.getTotalPrice(),
    })

    alert(`Added ${this.quantity}x ${this.portrait?.title} (${selectedOption.name}) to cart!`)
  }

  /**
   * Buy now
   */
  buyNow(): void {
    console.log("Buy now clicked")
    alert("Redirecting to checkout...")
  }

  /**
   * Follow/unfollow artist
   */
  followArtist(): void {
    this.isFollowingArtist = !this.isFollowingArtist
    const action = this.isFollowingArtist ? "following" : "unfollowed"
    alert(`You are now ${action} ${this.portrait?.artist}!`)
  }

  /**
   * View artist profile
   */
  viewArtistProfile(): void {
    console.log("Viewing artist profile")
    // Navigate to artist profile page
  }

  /**
   * View related portrait
   */
  viewRelatedPortrait(relatedPortrait: Portrait): void {
    this.router.navigate(["/product-detail", relatedPortrait.id])
  }

  /**
   * Navigation methods
   */
  navigateTo(route: string): void {
    this.router.navigate([route])
  }

  goBack(): void {
    this.router.navigate(["/shop"])
  }

  hasDiscount(): boolean {
    return !!(this.portrait?.originalPrice &&
      this.portrait?.price &&
      this.portrait.originalPrice > this.portrait.price);
  }
}
