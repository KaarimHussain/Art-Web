import { Component } from '@angular/core';
import CartItem from '../../models/CartItems';
import { Product } from '../../models/Product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Portrait {
  id: number;
  src: string;
  alt: string;
  category: string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isCartOpen = false;
  activeProductFilter = 'all';
  activePortraitFilter = 'all';

  products: Product[] = [];

  portraits: Portrait[] = [
    {
      id: 1,
      src: '/placeholder.svg?height=600&width=400',
      alt: 'Professional headshot of a woman',
      category: 'professional',
    },
    {
      id: 2,
      src: '/placeholder.svg?height=600&width=400',
      alt: 'Family portrait outdoors',
      category: 'family',
    },
    {
      id: 3,
      src: '/placeholder.svg?height=600&width=400',
      alt: 'Artistic black and white portrait',
      category: 'artistic',
    },
    {
      id: 4,
      src: '/placeholder.svg?height=600&width=400',
      alt: 'Couple portrait',
      category: 'couple',
    },
    {
      id: 5,
      src: '/placeholder.svg?height=600&width=400',
      alt: 'Corporate team portrait',
      category: 'professional',
    },
    {
      id: 6,
      src: '/placeholder.svg?height=600&width=400',
      alt: 'Artistic color portrait',
      category: 'artistic',
    },
  ];

  cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Standard Portrait Session',
      price: 199,
      quantity: 1,
      image: '/placeholder.svg?height=100&width=100',
    },
    {
      id: 4,
      name: '8x10 Print',
      price: 25,
      quantity: 2,
      image: '/placeholder.svg?height=100&width=100',
    },
  ];

  get filteredProducts(): Product[] {
    return this.activeProductFilter === 'all'
      ? this.products
      : this.products.filter(
        (product) => product.category === this.activeProductFilter
      );
  }

  get filteredPortraits(): Portrait[] {
    return this.activePortraitFilter === 'all'
      ? this.portraits
      : this.portraits.filter(
        (portrait) => portrait.category === this.activePortraitFilter
      );
  }

  get subtotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  setProductFilter(filter: string): void {
    this.activeProductFilter = filter;
  }

  setPortraitFilter(filter: string): void {
    this.activePortraitFilter = filter;
  }

  openCart(): void {
    this.isCartOpen = true;
  }

  closeCart(): void {
    this.isCartOpen = false;
  }

  addToCart(product: Product): void {
    const existingItem = this.cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({
        id: product.id,
        name: product.title,
        price: product.price,
        quantity: 1,
        image: product.featuredImage,
      });
    }
  }

  removeFromCart(itemId: number): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
  }

  updateQuantity(itemId: number, change: number): void {
    const item = this.cartItems.find((item) => item.id === itemId);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.removeFromCart(itemId);
      }
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    // Handle form submission
    console.log('Form submitted');
  }
}
