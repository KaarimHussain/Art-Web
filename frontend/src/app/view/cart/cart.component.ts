import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { CartService } from "../../services/cart.service"
import CartItem from "../../models/CartItems"

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

// Local cart item interface that extends the model CartItem
interface CartItemExtended {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  // Additional properties for UI
  selectedSizeId: string
  selectedSize: SizeOption
  availableSizes: SizeOption[]
  selected: boolean
  addedDate: string
  // Portrait info
  portrait: Portrait
}

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.css",
})
export class CartComponent implements OnInit {
  cartItems: CartItemExtended[] = []
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

  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.loadCartItems()
  }

  /**
   * Load cart items (mock data for demo)
   */
  loadCartItems(): void {
    // Subscribe to cart items from the CartService
    this.cartService.getCartItems().subscribe(
      (items) => {
        if (items.length > 0) {
          // Map API cart items to extended cart items with UI properties
          this.cartItems = items.map(item => this.mapToExtendedCartItem(item));
        } else {
          // If cart is empty, use mock data for demo purposes
          this.loadMockCartItems();
        }
      },
      (error) => {
        console.error('Error loading cart items:', error);
        // Fallback to mock data on error
        this.loadMockCartItems();
      }
    );
  }

  /**
   * Map API CartItem to CartItemExtended
   */
  private mapToExtendedCartItem(item: CartItem): CartItemExtended {
    // Determine size based on price
    let selectedSizeId = 'medium';
    let selectedSize = this.sizeOptions[1]; // Default to medium

    // Try to match price to a size option
    const matchingSize = this.sizeOptions.find(size => size.price === item.price);
    if (matchingSize) {
      selectedSizeId = matchingSize.id;
      selectedSize = matchingSize;
    }

    return {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      selectedSizeId: selectedSizeId,
      selectedSize: selectedSize,
      availableSizes: [...this.sizeOptions],
      selected: true,
      addedDate: new Date().toISOString().split('T')[0],
      portrait: {
        id: item.id,
        title: item.name,
        artist: 'Artist', // Default value
        imageUrl: item.image,
        category: 'Portrait' // Default value
      }
    };
  }

  /**
   * Load mock cart items for demo purposes
   */
  private loadMockCartItems(): void {
    this.cartItems = [
      {
        id: 101,
        name: "Evening Grace",
        price: 299,
        quantity: 1,
        image: "/placeholder.svg?height=300&width=300",
        selectedSizeId: "medium",
        selectedSize: this.sizeOptions[1], // Medium
        availableSizes: [...this.sizeOptions],
        selected: true,
        addedDate: "2024-01-15",
        portrait: {
          id: 101,
          title: "Evening Grace",
          artist: "Sarah Johnson",
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Portrait",
        }
      },
      {
        id: 102,
        name: "Family Harmony",
        price: 449,
        quantity: 2,
        image: "/placeholder.svg?height=300&width=300",
        selectedSizeId: "large",
        selectedSize: this.sizeOptions[2], // Large
        availableSizes: [...this.sizeOptions],
        selected: true,
        addedDate: "2024-01-14",
        portrait: {
          id: 102,
          title: "Family Harmony",
          artist: "Michael Chen",
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Family",
        }
      },
      {
        id: 103,
        name: "Wedding Bliss",
        price: 699,
        quantity: 1,
        image: "/placeholder.svg?height=300&width=300",
        selectedSizeId: "xlarge",
        selectedSize: this.sizeOptions[3], // Extra Large
        availableSizes: [...this.sizeOptions],
        selected: false,
        addedDate: "2024-01-13",
        portrait: {
          id: 103,
          title: "Wedding Bliss",
          artist: "Emma Rodriguez",
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "Wedding",
        }
      }
    ];
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
  getItemTotal(item: CartItemExtended): number {
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
  updateItemSize(item: CartItemExtended): void {
    const selectedSize = item.availableSizes.find((size: SizeOption) => size.id === item.selectedSizeId)
    if (selectedSize) {
      item.selectedSize = selectedSize
      
      // Update the item price in the cart service
      this.cartService.updateQuantity(item.id, item.quantity).subscribe(
        (success: boolean) => {
          if (!success) {
            console.error('Failed to update item size');
          }
        },
        (error: any) => {
          console.error('Error updating item size:', error);
        }
      );
    }
  }

  /**
   * Increase item quantity
   */
  increaseQuantity(item: CartItemExtended): void {
    if (item.quantity < 10) {
      item.quantity++
      
      // Update the item quantity in the cart service
      this.cartService.updateQuantity(item.id, item.quantity).subscribe(
        (success: boolean) => {
          if (!success) {
            // Revert the change if update fails
            item.quantity--;
            console.error('Failed to increase quantity');
          }
        },
        (error: any) => {
          // Revert the change on error
          item.quantity--;
          console.error('Error increasing quantity:', error);
        }
      );
    }
  }

  /**
   * Decrease item quantity
   */
  decreaseQuantity(item: CartItemExtended): void {
    if (item.quantity > 1) {
      item.quantity--
      
      // Update the item quantity in the cart service
      this.cartService.updateQuantity(item.id, item.quantity).subscribe(
        (success: boolean) => {
          if (!success) {
            // Revert the change if update fails
            item.quantity++;
            console.error('Failed to decrease quantity');
          }
        },
        (error: any) => {
          // Revert the change on error
          item.quantity++;
          console.error('Error decreasing quantity:', error);
        }
      );
    }
  }

  /**
   * Remove item from cart
   */
  removeFromCart(item: CartItemExtended): void {
    // Use CartService to remove item from cart
    this.cartService.removeFromCart(item.id).subscribe(
      (success) => {
        if (success) {
          const index = this.cartItems.findIndex((cartItem) => cartItem.id === item.id);
          if (index > -1) {
            this.cartItems.splice(index, 1);
            alert(`${item.portrait.title} removed from cart`);
          }
        } else {
          alert('Failed to remove item from cart. Please try again.');
        }
      },
      (error) => {
        console.error('Error removing item from cart:', error);
        alert('Failed to remove item from cart. Please try again.');
      }
    );
  }

  /**
   * Clear entire cart
   */
  clearCart(): void {
    if (confirm("Are you sure you want to clear your cart? This action cannot be undone.")) {
      // Use CartService to clear cart
      this.cartService.clearCart().subscribe(
        (success) => {
          if (success) {
            this.cartItems = [];
            this.appliedDiscount = 0;
            this.promoCode = "";
            this.promoMessage = "";
            alert("Cart cleared successfully");
          } else {
            alert('Failed to clear cart. Please try again.');
          }
        },
        (error) => {
          console.error('Error clearing cart:', error);
          alert('Failed to clear cart. Please try again.');
        }
      );
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
  trackByCartItemId(index: number, item: CartItemExtended): number {
    return item.id
  }
}
