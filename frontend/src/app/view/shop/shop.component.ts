import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Portrait {
  id: number;
  title: string;
  artist: string;
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
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  // Filter and search properties
  searchQuery = '';
  selectedCategory = 'All';
  sortBy = 'newest';
  viewMode: 'grid' | 'list' = 'grid';

  // Pagination
  currentPage = 1;
  itemsPerPage = 12;
  totalPages = 1;

  // Loading state
  isLoading = false;

  // Categories for filtering
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

  // All portraits data
  allPortraits: Portrait[] = [
    {
      id: 1,
      title: 'Elegant Evening Portrait',
      artist: 'Sarah Johnson',
      price: 299,
      imageUrl: '/placeholder.svg?height=400&width=300',
      category: 'Portrait',
      description:
        "A stunning evening portrait capturing the subject's natural elegance and grace in soft, warm lighting.",
      rating: 4.8,
      isPopular: true,
      isInWishlist: false,
      dimensions: '24x36 inches',
      medium: 'Digital Print',
      dateCreated: '2024-01-15',
    },
    {
      id: 2,
      title: 'Family Harmony',
      artist: 'Michael Chen',
      price: 450,
      imageUrl: '/placeholder.svg?height=400&width=300',
      category: 'Family',
      description:
        'A heartwarming family portrait showcasing the beautiful bond between loved ones in a natural outdoor setting.',
      rating: 4.9,
      isPopular: true,
      isInWishlist: false,
      dimensions: '30x40 inches',
      medium: 'Canvas Print',
      dateCreated: '2024-01-10',
    },
    {
      id: 3,
      title: 'Wedding Bliss',
      artist: 'Emma Rodriguez',
      price: 599,
      imageUrl: '/placeholder.svg?height=400&width=300',
      category: 'Wedding',
      description:
        'A romantic wedding portrait capturing the pure joy and love of the couple on their special day.',
      rating: 5.0,
      isPopular: true,
      isInWishlist: false,
      dimensions: '20x30 inches',
      medium: 'Fine Art Print',
      dateCreated: '2024-01-08',
    },
    {
      id: 4,
      title: 'Executive Profile',
      artist: 'David Kim',
      price: 199,
      imageUrl: '/placeholder.svg?height=400&width=300',
      category: 'Corporate',
      description:
        'A professional corporate headshot that conveys confidence and approachability for business use.',
      rating: 4.7,
      isPopular: false,
      isInWishlist: false,
      dimensions: '16x20 inches',
      medium: 'Digital Print',
      dateCreated: '2024-01-05',
    },
    {
      id: 5,
      title: 'Fashion Forward',
      artist: 'Lisa Thompson',
      price: 399,
      imageUrl: '/placeholder.svg?height=400&width=300',
      category: 'Fashion',
      description:
        'A bold fashion portrait featuring dramatic lighting and contemporary styling that makes a statement.',
      rating: 4.6,
      isPopular: false,
      isInWishlist: false,
      dimensions: '24x32 inches',
      medium: 'Metallic Print',
      dateCreated: '2024-01-03',
    },
    {
      id: 6,
      title: 'Artistic Vision',
      artist: 'Robert Martinez',
      price: 799,
      imageUrl: '/placeholder.svg?height=400&width=300',
      category: 'Artistic',
      description:
        'An avant-garde artistic portrait that pushes creative boundaries with unique composition and lighting.',
      rating: 4.9,
      isPopular: true,
      isInWishlist: false,
      dimensions: '36x48 inches',
      medium: 'Gallery Canvas',
      dateCreated: '2024-01-01',
    },
    {
      id: 7,
      title: 'Childhood Wonder',
      artist: 'Jennifer Lee',
      price: 249,
      imageUrl: '/placeholder.svg?height=400&width=300',
      category: 'Children',
      description:
        "A delightful children's portrait capturing the innocence and joy of childhood in natural light.",
      rating: 4.8,
      isPopular: false,
      isInWishlist: false,
      dimensions: '16x24 inches',
      medium: 'Lustre Print',
      dateCreated: '2023-12-28',
    },
    {
      id: 8,
      title: 'Timeless Beauty',
      artist: 'Alexander Brown',
      price: 349,
      imageUrl: '/placeholder.svg?height=400&width=300',
      category: 'Portrait',
      description:
        'A classic portrait emphasizing timeless beauty with elegant composition and masterful lighting techniques.',
      rating: 4.7,
      isPopular: false,
      isInWishlist: false,
      dimensions: '20x24 inches',
      medium: 'Fine Art Print',
      dateCreated: '2023-12-25',
    },
  ];

  // Filtered portraits based on current filters
  filteredPortraits: Portrait[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadPortraits();
  }

  /**
   * Load and filter portraits
   */
  loadPortraits(): void {
    this.isLoading = true;

    // Simulate API call delay
    setTimeout(() => {
      this.applyFilters();
      this.isLoading = false;
    }, 500);
  }

  /**
   * Apply all active filters
   */
  applyFilters(): void {
    let filtered = [...this.allPortraits];

    // Apply category filter
    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter(
        (portrait) => portrait.category === this.selectedCategory
      );
    }

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (portrait) =>
          portrait.title.toLowerCase().includes(query) ||
          portrait.artist.toLowerCase().includes(query) ||
          portrait.description.toLowerCase().includes(query) ||
          portrait.category.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered = this.sortPortraits(filtered);

    this.filteredPortraits = filtered;
    this.updatePagination();

    // Debug logging
    console.log('Filtered portraits:', this.filteredPortraits.length);
    console.log('Current page:', this.currentPage);
    console.log('Paginated portraits:', this.paginatedPortraits.length);
  }

  /**
   * Sort portraits based on selected criteria
   */
  sortPortraits(portraits: Portrait[]): Portrait[] {
    return portraits.sort((a, b) => {
      switch (this.sortBy) {
        case 'newest':
          return (
            new Date(b.dateCreated).getTime() -
            new Date(a.dateCreated).getTime()
          );
        case 'oldest':
          return (
            new Date(a.dateCreated).getTime() -
            new Date(b.dateCreated).getTime()
          );
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

  /**
   * Handle search input
   */
  onSearch(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  /**
   * Select category filter
   */
  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 1;
    this.applyFilters();
  }

  /**
   * Handle sort change
   */
  onSortChange(): void {
    this.applyFilters();
  }

  /**
   * Set view mode
   */
  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }

  /**
   * Check if there are active filters
   */
  hasActiveFilters(): boolean {
    return this.selectedCategory !== 'All' || this.searchQuery.trim() !== '';
  }

  /**
   * Clear category filter
   */
  clearCategoryFilter(): void {
    this.selectedCategory = 'All';
    this.applyFilters();
  }

  /**
   * Clear search filter
   */
  clearSearch(): void {
    this.searchQuery = '';
    this.applyFilters();
  }

  /**
   * Clear all filters
   */
  clearAllFilters(): void {
    this.selectedCategory = 'All';
    this.searchQuery = '';
    this.sortBy = 'newest';
    this.currentPage = 1;
    this.applyFilters();
  }

  /**
   * Get results text
   */
  getResultsText(): string {
    if (this.hasActiveFilters()) {
      return `Filtered from ${this.allPortraits.length} total portraits`;
    }
    return 'Showing all available portraits';
  }

  /**
   * Get category badge class
   */
  getCategoryBadgeClass(category: string): string {
    const classes = {
      Portrait:
        'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30',
      Family: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
      Wedding: 'bg-pink-500/20 text-pink-400 border border-pink-500/30',
      Corporate: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      Fashion: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      Artistic: 'bg-red-500/20 text-red-400 border border-red-500/30',
      Children: 'bg-green-500/20 text-green-400 border border-green-500/30',
    };
    return (
      classes[category as keyof typeof classes] ||
      'bg-slate-600/20 text-slate-400 border border-slate-600/30'
    );
  }

  /**
   * View portrait details
   */
  viewPortrait(portrait: Portrait): void {
    this.router.navigate(['/portrait', portrait.id]);
  }

  /**
   * Add to wishlist
   */
  addToWishlist(portrait: Portrait, event: Event): void {
    event.stopPropagation();
    portrait.isInWishlist = !portrait.isInWishlist;

    // Show feedback
    const action = portrait.isInWishlist ? 'added to' : 'removed from';
    console.log(`${portrait.title} ${action} wishlist`);

    // You can implement a toast notification here
    alert(`${portrait.title} ${action} your wishlist!`);
  }

  /**
   * Add to cart
   */
  addToCart(portrait: Portrait): void {
    console.log('Adding to cart:', portrait);

    // You can implement cart service here
    alert(`${portrait.title} added to cart!`);
  }

  /**
   * Track by function for ngFor
   */
  trackByPortraitId(index: number, portrait: Portrait): number {
    return portrait.id;
  }

  // Pagination methods
  updatePagination(): void {
    this.totalPages = Math.ceil(
      this.filteredPortraits.length / this.itemsPerPage
    );
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
    const end = start + this.itemsPerPage;
    return this.filteredPortraits.slice(start, end);
  }
}
