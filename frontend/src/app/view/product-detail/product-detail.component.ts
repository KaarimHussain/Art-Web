import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  portrait: Product | null = null;
  isLoading = true;
  selectedImage = '';
  quantity = 1;
  maxQuantity = 10;
  relatedPortraits: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.loadProduct(id);
    });
  }

  loadProduct(id: number): void {
    this.isLoading = true;
    this.productService.getById(id).subscribe(
      (product) => {
        this.portrait = product;
        this.selectedImage = product.featuredImage || product.images?.[0]?.url || '';
        this.loadRelatedProducts();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading product details:', error);
        this.isLoading = false;
      }
    );
  }

  loadRelatedProducts(): void {
    if (!this.portrait) return;
    this.productService.getProductsByCategory(this.portrait.category).subscribe(
      (products) => {
        this.relatedPortraits = products.filter(p => p.id !== this.portrait!.id).slice(0, 4);
      },
      (error) => console.error('Error loading related products:', error)
    );
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  hasDiscount(): boolean {
    return !!(this.portrait?.originalPrice && this.portrait?.price && this.portrait.originalPrice > this.portrait.price);
  }

  getDiscountPercentage(): number {
    if (!this.portrait?.originalPrice || !this.portrait?.price) return 0;
    return Math.round(((this.portrait.originalPrice - this.portrait.price) / this.portrait.originalPrice) * 100);
  }

  increaseQuantity(): void {
    if (this.quantity < this.maxQuantity) this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) this.quantity--;
  }

  getTotalPrice(): number {
    return this.portrait?.price ? this.portrait.price * this.quantity : 0;
  }

  addToCart(): void {
    if (!this.portrait) return;
    this.cartService.addToCart(this.portrait, this.quantity).subscribe((success) => {
      alert(success ? `Added ${this.quantity}x to cart!` : 'Failed to add item to cart.');
    });
  }

  buyNow(): void {
    alert('Redirecting to checkout...');
  }

  viewRelatedPortrait(portrait: Product): void {
    this.router.navigate(['/product-detail', portrait.id]);
  }

  getYear(dateString: string): string {
    return new Date(dateString).getFullYear().toString();
  }
}
