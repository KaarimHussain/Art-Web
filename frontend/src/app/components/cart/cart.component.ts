import { Component, Input } from '@angular/core';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @Input() isOpen = false;
  
  cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Standard Portrait Session',
      price: 199,
      quantity: 1,
      image: 'assets/images/product-1.jpg',
    },
    {
      id: 4,
      name: '8x10 Print',
      price: 25,
      quantity: 2,
      image: 'assets/images/product-4.jpg',
    },
  ];

  get subtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  closeCart() {
    this.isOpen = false;
  }

  updateQuantity(item: CartItem, change: number) {
    item.quantity = Math.max(1, item.quantity + change);
  }

  removeItem(itemId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
  }

  proceedToCheckout() {
    // Navigate to checkout
    this.closeCart();
  }

  trackByItemId(index: number, item: CartItem): number {
    return item.id;
  }
}