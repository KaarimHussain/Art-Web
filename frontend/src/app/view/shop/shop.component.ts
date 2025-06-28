import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/Product';

interface Portrait {
  id: number;
  title: string;
  artist?: string;
  price: number;
  imageUrl: string;
  category: string;
  description: string;
  rating: number;
  isPopular: boolean;
  isInWishlist: boolean;
  dimensions: string;
  medium: string;
  dateCreated: string;
}

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  searchQuery = '';
  selectedCategory = 'All';
  sortBy = 'newest';
  viewMode: 'grid' | 'list' = 'grid';
  currentPage = 1;
  itemsPerPage = 12;
  totalPages = 1;
  isLoading = false;

  categories = [
    'All',
    'Portrait',
    'Family',
    'Wedding',
    'Corporate',
    'Fashion',
    'Artistic',
    'Children',
  ];

  allPortraits: Portrait[] = [];
  filteredPortraits: Portrait[] = [];

  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.loadPortraits();
  }

  loadPortraits(): void {
    this.isLoading = true;
    this.productService.getAll().subscribe(
      (products) => {
        this.allPortraits = products.map((product) => this.mapProductToPortrait(product));
        this.applyFilters();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      }
    );
  }

  private mapProductToPortrait(product: Product): Portrait {
    const firstImage = product.featuredImage || (product.images?.[0]?.url || '/placeholder.svg');
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      imageUrl: firstImage,
      category: product.category,
      description: product.description,
      rating: 5.0, // or calculate average rating if available
      isPopular: product.isFeatured,
      isInWishlist: false,
      dimensions: `${product.widthInInches}x${product.heightInInches} inches`,
      medium: product.medium,
      dateCreated: new Date(product.createdAt).toISOString().split('T')[0]
    };
  }

  applyFilters(): void {
    let filtered = [...this.allPortraits];

    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter(
        (portrait) => portrait.category === this.selectedCategory
      );
    }

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (portrait) =>
          portrait.title.toLowerCase().includes(query) ||
          portrait.description.toLowerCase().includes(query) ||
          portrait.category.toLowerCase().includes(query)
      );
    }

    filtered = this.sortPortraits(filtered);

    this.filteredPortraits = filtered;
    this.updatePagination();
  }

  sortPortraits(portraits: Portrait[]): Portrait[] {
    return portraits.sort((a, b) => {
      switch (this.sortBy) {
        case 'newest':
          return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
        case 'oldest':
          return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'popular':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 1;
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }

  hasActiveFilters(): boolean {
    return this.selectedCategory !== 'All' || this.searchQuery.trim() !== '';
  }

  clearCategoryFilter(): void {
    this.selectedCategory = 'All';
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.applyFilters();
  }

  clearAllFilters(): void {
    this.selectedCategory = 'All';
    this.searchQuery = '';
    this.sortBy = 'newest';
    this.currentPage = 1;
    this.applyFilters();
  }

  getResultsText(): string {
    return this.hasActiveFilters()
      ? `Filtered from ${this.allPortraits.length} total portraits`
      : 'Showing all available portraits';
  }

  getCategoryBadgeClass(category: string): string {
    const classes = {
      Portrait: 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30',
      Family: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
      Wedding: 'bg-pink-500/20 text-pink-400 border border-pink-500/30',
      Corporate: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      Fashion: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      Artistic: 'bg-red-500/20 text-red-400 border border-red-500/30',
      Children: 'bg-green-500/20 text-green-400 border border-green-500/30'
    };
    return classes[category as keyof typeof classes] || 'bg-slate-600/20 text-slate-400 border border-slate-600/30';
  }

  viewPortrait(portrait: Portrait): void {
    this.router.navigate(['/portrait', portrait.id]);
  }

  addToWishlist(portrait: Portrait, event: Event): void {
    event.stopPropagation();
    portrait.isInWishlist = !portrait.isInWishlist;
    const action = portrait.isInWishlist ? 'added to' : 'removed from';
    alert(`${portrait.title} ${action} your wishlist!`);
  }

  addToCart(portrait: Portrait): void {
    const product: Product = {
      id: portrait.id,
      title: portrait.title,
      description: portrait.description,
      price: portrait.price,
      category: portrait.category,
      featuredImage: portrait.imageUrl,
      images: [],
      medium: portrait.medium,
      widthInInches: 0,
      heightInInches: 0,
      depthInInches: 0,
      isFramed: false,
      isSigned: true,
      yearCreated: '',
      quantityAvailable: 1,
      shippingWeightKg: 0,
      shippingFromCountry: '',
      isAvailable: true,
      isSold: false,
      isFeatured: false,
      tags: [],
      createdAt: new Date().toISOString(),
      originalPrice: undefined,
      style: '',
      slug: '',
      surface: ''
    };

    this.cartService.addToCart(product).subscribe((success) => {
      alert(success
        ? `${portrait.title} added to cart!`
        : 'Failed to add item to cart. Please try again.');
    });
  }

  trackByPortraitId(index: number, portrait: Portrait): number {
    return portrait.id;
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredPortraits.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = 1;
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  get paginatedPortraits(): Portrait[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredPortraits.slice(start, start + this.itemsPerPage);
  }
}
