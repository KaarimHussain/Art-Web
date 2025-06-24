import { Component } from '@angular/core';
import CartItem from '../../models/CartItems';
import Product from '../../models/Product';
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

  products: Product[] = [
    {
      id: 1,
      name: 'Standard Portrait Session',
      description: '1-hour session, 5 digital images, 1 8x10 print',
      price: 199,
      originalPrice: 249,
      image: '/placeholder.svg?height=600&width=400',
      category: 'session',
      rating: 4.9,
      popular: false,
    },
    {
      id: 2,
      name: 'Premium Portrait Session',
      description: '2-hour session, 10 digital images, 2 8x10 prints',
      price: 349,
      originalPrice: 399,
      image: '/placeholder.svg?height=600&width=400',
      category: 'session',
      rating: 5.0,
      popular: true,
    },
    {
      id: 3,
      name: 'Family Portrait Package',
      description: '3-hour session, 20 digital images, 1 16x20 canvas print',
      price: 499,
      originalPrice: 599,
      image: '/placeholder.svg?height=600&width=400',
      category: 'session',
      rating: 4.8,
      popular: false,
    },
    {
      id: 4,
      name: '8x10 Print',
      description: 'Professional quality print on premium paper',
      price: 25,
      originalPrice: 35,
      image: '/placeholder.svg?height=600&width=400',
      category: 'print',
      rating: 4.7,
      popular: false,
    },
    {
      id: 5,
      name: '16x20 Canvas Print',
      description: 'Gallery-quality canvas print, ready to hang',
      price: 150,
      originalPrice: 200,
      image: '/placeholder.svg?height=600&width=400',
      category: 'print',
      rating: 4.9,
      popular: false,
    },
    {
      id: 6,
      name: 'Digital Image Package',
      description: '10 high-resolution digital images with print release',
      price: 199,
      originalPrice: 249,
      image: '/placeholder.svg?height=600&width=400',
      category: 'digital',
      rating: 4.8,
      popular: false,
    },
  ];

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
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
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
