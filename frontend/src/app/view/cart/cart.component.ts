import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"

interface Portrait {
  id: number
  title: string
  artist: string
  imageUrl: string
  category: string
}

interface SizeOption {
  id: string
  name: string
  dimensions: string
  price: number
}

interface CartItem {
  id: string
  portrait: Portrait
  selectedSizeId: string
  selectedSize: SizeOption
  availableSizes: SizeOption[]
  quantity: number
  selected: boolean
  addedDate: string
}

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.css",
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = []
  promoCode = ""
  promoMessage = ""
  promoSuccess = false
  isApplyingPromo = false
  isProcessingCheckout = false
  appliedDiscount = 0

  // Tax rate (8.5%)
  private readonly TAX_RATE = 0.085
  // Free shipping threshold
  private readonly FREE_SHIPPING_THRESHOLD = 500
  // Standard shipping cost
  private readonly SHIPPING_COST = 25

  // Available size options
  private readonly sizeOptions: SizeOption[] = [
    {
      id: "small",
      name: "Small Print",
      dimensions: "12x16 inches",
      price: 199,
    },
    {
      id: "medium",
      name: "Medium Print",
      dimensions: "18x24 inches",
      price: 299,
    },
    {
      id: "large",
      name: "Large Print",
      dimensions: "24x32 inches",
      price: 449,
    },
    {
      id: "xlarge",
      name: "Extra Large Print",
      dimensions: "30x40 inches",
      price: 699,
    },
  ]

  // Mock promo codes
  private readonly promoCodes = {
    SAVE10: { discount: 0.1, message: "10% discount applied!" },
    WELCOME20: { discount: 0.2, message: "Welcome! 20% discount applied!" },
    FIRST15: { discount: 0.15, message: "First-time buyer 15% discount applied!" },
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadCartItems()
  }

  /**
   * Load cart items (mock data for demo)
   */
  loadCartItems(): void {
    // Mock cart items - in real app, this would come from a service
    this.cartItems = [
      {
        id: "cart-1",
        portrait: {
          id: 101,
          title: "Evening Grace",
          artist: "Sarah Johnson",
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Portrait",
        },
        selectedSizeId: "medium",
        selectedSize: this.sizeOptions[1], // Medium
        availableSizes: [...this.sizeOptions],
        quantity: 1,
        selected: true,
        addedDate: "2024-01-15",
      },
      {
        id: "cart-2",
        portrait: {
          id: 102,
          title: "Family Harmony",
          artist: "Michael Chen",
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Family",
        },
        selectedSizeId: "large",
        selectedSize: this.sizeOptions[2], // Large
        availableSizes: [...this.sizeOptions],
        quantity: 2,
        selected: true,
        addedDate: "2024-01-14",
      },
      {
        id: "cart-3",
        portrait: {
          id: 103,
          title: "Wedding Bliss",
          artist: "Emma Rodriguez",
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Wedding",
        },
        selectedSizeId: "xlarge",
        selectedSize: this.sizeOptions[3], // Extra Large
        availableSizes: [...this.sizeOptions],
        quantity: 1,
        selected: false,
        addedDate: "2024-01-13",
      },
    ]
  }

  /**
   * Get total price of all items in cart
   */
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + this.getItemTotal(item), 0)
  }

  /**
   * Get total for a specific item
   */
  getItemTotal(item: CartItem): number {
    return item.selectedSize.price * item.quantity
  }

  /**
   * Get count of selected items
   */
  getSelectedItemsCount(): number {
    return this.cartItems.filter((item) => item.selected).length
  }

  /**
   * Get subtotal of selected items
   */
  getSelectedItemsSubtotal(): number {
    return this.cartItems.filter((item) => item.selected).reduce((total, item) => total + this.getItemTotal(item), 0)
  }

  /**
   * Get shipping cost
   */
  getShippingCost(): number {
    const subtotal = this.getSelectedItemsSubtotal()
    return subtotal >= this.FREE_SHIPPING_THRESHOLD ? 0 : this.SHIPPING_COST
  }

  /**
   * Get tax amount
   */
  getTaxAmount(): number {
    const subtotal = this.getSelectedItemsSubtotal()
    return Math.round(subtotal * this.TAX_RATE * 100) / 100
  }

  /**
   * Get discount amount
   */
  getDiscountAmount(): number {
    const subtotal = this.getSelectedItemsSubtotal()
    return Math.round(subtotal * this.appliedDiscount * 100) / 100
  }

  /**
   * Get final total
   */
  getFinalTotal(): number {
    const subtotal = this.getSelectedItemsSubtotal()
    const shipping = this.getShippingCost()
    const tax = this.getTaxAmount()
    const discount = this.getDiscountAmount()
    return Math.round((subtotal + shipping + tax - discount) * 100) / 100
  }

  /**
   * Update item size
   */
  updateItemSize(item: CartItem): void {
    const selectedSize = item.availableSizes.find((size) => size.id === item.selectedSizeId)
    if (selectedSize) {
      item.selectedSize = selectedSize
    }
  }

  /**
   * Increase item quantity
   */
  increaseQuantity(item: CartItem): void {
    if (item.quantity < 10) {
      item.quantity++
    }
  }

  /**
   * Decrease item quantity
   */
  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--
    }
  }

  /**
   * Remove item from cart
   */
  removeFromCart(item: CartItem): void {
    const index = this.cartItems.findIndex((cartItem) => cartItem.id === item.id)
    if (index > -1) {
      this.cartItems.splice(index, 1)
      alert(`${item.portrait.title} removed from cart`)
    }
  }

  /**
   * Clear entire cart
   */
  clearCart(): void {
    if (confirm("Are you sure you want to clear your cart? This action cannot be undone.")) {
      this.cartItems = []
      this.appliedDiscount = 0
      this.promoCode = ""
      this.promoMessage = ""
      alert("Cart cleared successfully")
    }
  }

  /**
   * Select/deselect all items
   */
  selectAllItems(): void {
    const allSelected = this.allItemsSelected
    this.cartItems.forEach((item) => {
      item.selected = !allSelected
    })
  }

  /**
   * Update item selection
   */
  updateItemSelection(): void {
    // This method is called when individual items are selected/deselected
    // The actual selection is handled by ngModel binding
  }

  /**
   * Check if all items are selected
   */
  get allItemsSelected(): boolean {
    return this.cartItems.length > 0 && this.cartItems.every((item) => item.selected)
  }

  /**
   * Apply promo code
   */
  applyPromoCode(): void {
    if (!this.promoCode.trim()) return

    this.isApplyingPromo = true

    // Simulate API call
    setTimeout(() => {
      const upperPromoCode = this.promoCode.toUpperCase()
      const promo = this.promoCodes[upperPromoCode as keyof typeof this.promoCodes]

      if (promo) {
        this.appliedDiscount = promo.discount
        this.promoMessage = promo.message
        this.promoSuccess = true
      } else {
        this.promoMessage = "Invalid promo code. Please try again."
        this.promoSuccess = false
        this.appliedDiscount = 0
      }

      this.isApplyingPromo = false
    }, 1000)
  }

  /**
   * Proceed to checkout
   */
  proceedToCheckout(): void {
    if (this.getSelectedItemsCount() === 0) {
      alert("Please select at least one item to proceed to checkout.")
      return
    }

    this.isProcessingCheckout = true

    // Simulate processing
    setTimeout(() => {
      this.isProcessingCheckout = false
      alert("Redirecting to checkout...")
      // In real app: this.router.navigate(['/checkout'])
    }, 2000)
  }

  /**
   * Contact support
   */
  contactSupport(): void {
    alert("Opening support chat...")
    // In real app, this would open a chat widget or navigate to support page
  }

  /**
   * Navigation helper
   */
  navigateTo(route: string): void {
    this.router.navigate([route])
  }

  /**
   * Track by function for ngFor
   */
  trackByCartItemId(index: number, item: CartItem): string {
    return item.id
  }
}
