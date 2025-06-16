import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  popular: boolean;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  activeFilter = 'all';
  
  products: Product[] = [
    {
      id: 1,
      name: 'Standard Portrait Session',
      description: '1-hour session, 5 digital images, 1 8x10 print',
      price: 199,
      originalPrice: 249,
      image: 'assets/images/product-1.jpg',
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
      image: 'assets/images/product-2.jpg',
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
      image: 'assets/images/product-3.jpg',
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
      image: 'assets/images/product-4.jpg',
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
      image: 'assets/images/product-5.jpg',
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
      image: 'assets/images/product-6.jpg',
      category: 'digital',
      rating: 4.8,
      popular: false,
    },
  ];

  get filteredProducts(): Product[] {
    return this.activeFilter === 'all' 
      ? this.products 
      : this.products.filter(product => product.category === this.activeFilter);
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  isActiveFilter(filter: string): boolean {
    return this.activeFilter === filter;
  }

  addToCart(product: Product) {
    // Emit event to add product to cart
    console.log('Adding to cart:', product);
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}