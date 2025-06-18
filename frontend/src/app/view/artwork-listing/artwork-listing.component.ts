import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: 'painting' | 'digital' | 'sculpture' | 'photography';
  medium: string;
  dimensions: string;
  year: number;
  style: string;
  description: string;
  rating: number;
  reviews: number;
  sold: number;
  inWishlist: boolean;
  tags: string[];
  featured: boolean;
  createdAt: Date;
}

export interface FilterOptions {
  category: string;
  priceRange: [number, number];
  rating: number;
  style: string[];
  medium: string[];
}

@Component({
  selector: 'app-artwork-listing',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './artwork-listing.component.html',
  styleUrl: './artwork-listing.component.css'
})

export class ArtworkListingComponent implements OnInit, OnDestroy {
  // Search and Filter Properties
  searchQuery: string = '';
  activeFilter: string = 'all';
  sortBy: string = 'newest';
  viewMode: 'grid' | 'list' = 'grid';

  // Data Properties
  artworks: Artwork[] = [];
  filteredArtworks: Artwork[] = [];
  
  // Pagination Properties
  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalPages: number = 0;
  totalItems: number = 0;

  // Newsletter
  newsletterEmail: string = '';

  // Loading and Error States
  isLoading: boolean = false;
  error: string | null = null;

  // Reactive Properties
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  constructor(
    private router: Router
  ) {
    // Setup search debouncing
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(query => {
      this.performSearch(query);
    });
  }

  ngOnInit(): void {
    this.loadArtworks();
    this.initializeFilters();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Data Loading Methods
  private loadArtworks(): void {
    this.isLoading = true;
    
    // Mock data - replace with actual service call
    setTimeout(() => {
      this.artworks = this.getMockArtworks();
      this.filteredArtworks = [...this.artworks];
      this.updatePagination();
      this.isLoading = false;
    }, 1000);
  }

  private getMockArtworks(): Artwork[] {
    return [
      {
        id: '1',
        title: 'Sunset Dreams',
        artist: 'Elena Rodriguez',
        artistId: 'artist-1',
        price: 1250,
        originalPrice: 1500,
        image: '/placeholder.svg?height=400&width=300',
        images: [
          '/placeholder.svg?height=400&width=300',
          '/placeholder.svg?height=400&width=300'
        ],
        category: 'painting',
        medium: 'Oil on Canvas',
        dimensions: '24" x 36"',
        year: 2023,
        style: 'Contemporary',
        description: 'A vibrant sunset painting capturing the essence of golden hour.',
        rating: 4.8,
        reviews: 24,
        sold: 156,
        inWishlist: false,
        tags: ['sunset', 'landscape', 'contemporary'],
        featured: true,
        createdAt: new Date('2023-12-01')
      },
      {
        id: '2',
        title: 'Digital Harmony',
        artist: 'Marcus Chen',
        artistId: 'artist-2',
        price: 850,
        image: '/placeholder.svg?height=400&width=300',
        images: [
          '/placeholder.svg?height=400&width=300',
          '/placeholder.svg?height=400&width=300'
        ],
        category: 'digital',
        medium: 'Digital Art',
        dimensions: '1920 x 1080 pixels',
        year: 2023,
        style: 'Abstract',
        description: 'A mesmerizing digital composition exploring color and form.',
        rating: 4.6,
        reviews: 18,
        sold: 89,
        inWishlist: true,
        tags: ['digital', 'abstract', 'modern'],
        featured: false,
        createdAt: new Date('2023-11-15')
      },
      {
        id: '3',
        title: 'Marble Elegance',
        artist: 'Sofia Andersson',
        artistId: 'artist-3',
        price: 2200,
        image: '/placeholder.svg?height=400&width=300',
        images: [
          '/placeholder.svg?height=400&width=300',
          '/placeholder.svg?height=400&width=300'
        ],
        category: 'sculpture',
        medium: 'Marble',
        dimensions: '12" x 8" x 6"',
        year: 2023,
        style: 'Classical',
        description: 'An elegant marble sculpture showcasing timeless beauty.',
        rating: 4.9,
        reviews: 31,
        sold: 45,
        inWishlist: false,
        tags: ['sculpture', 'marble', 'classical'],
        featured: true,
        createdAt: new Date('2023-10-20')
      }
      // Add more mock artworks as needed
    ];
  }

  // Search Methods
  onSearchChange(): void {
    this.searchSubject.next(this.searchQuery);
  }

  private performSearch(query: string): void {
    if (!query.trim()) {
      this.filteredArtworks = this.applyFilters(this.artworks);
    } else {
      const searchResults = this.artworks.filter(artwork =>
        artwork.title.toLowerCase().includes(query.toLowerCase()) ||
        artwork.artist.toLowerCase().includes(query.toLowerCase()) ||
        artwork.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        artwork.style.toLowerCase().includes(query.toLowerCase())
      );
      this.filteredArtworks = this.applyFilters(searchResults);
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  // Filter Methods
  setFilter(filter: string): void {
    this.activeFilter = filter;
    this.applyAllFilters();
  }

  onSortChange(): void {
    this.applyAllFilters();
  }

  private initializeFilters(): void {
    this.applyAllFilters();
  }

  private applyAllFilters(): void {
    let filtered = [...this.artworks];

    // Apply search filter
    if (this.searchQuery.trim()) {
      filtered = filtered.filter(artwork =>
        artwork.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        artwork.artist.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        artwork.tags.some(tag => tag.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    filtered = this.applyFilters(filtered);

    // Apply sorting
    filtered = this.applySorting(filtered);

    this.filteredArtworks = filtered;
    this.currentPage = 1;
    this.updatePagination();
  }

  private applyFilters(artworks: Artwork[]): Artwork[] {
    if (this.activeFilter === 'all') {
      return artworks;
    }
    return artworks.filter(artwork => artwork.category === this.activeFilter);
  }

  private applySorting(artworks: Artwork[]): Artwork[] {
    return artworks.sort((a, b) => {
      switch (this.sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'popular':
          return b.sold - a.sold;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }

  // View Methods
  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }

  // Pagination Methods
  private updatePagination(): void {
    this.totalItems = this.filteredArtworks.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.scrollToTop();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.scrollToTop();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.scrollToTop();
    }
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Interaction Methods
  toggleWishlist(artworkId: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    const artwork = this.artworks.find(art => art.id === artworkId);
    if (artwork) {
      artwork.inWishlist = !artwork.inWishlist;
      // Here you would typically call a service to update the wishlist
      console.log(`${artwork.inWishlist ? 'Added to' : 'Removed from'} wishlist:`, artwork.title);
    }
  }

  addToCart(artwork: Artwork, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    // Here you would typically call a cart service
    console.log('Added to cart:', artwork.title);
    
    // Show success message or notification
    this.showNotification(`${artwork.title} added to cart!`);
  }

  openCart(): void {
    // Navigate to cart or open cart modal
    this.router.navigate(['/cart']);
  }

  // Newsletter Methods
  subscribeNewsletter(event: Event): void {
    event.preventDefault();
    
    if (this.newsletterEmail && this.isValidEmail(this.newsletterEmail)) {
      // Here you would typically call a newsletter service
      console.log('Newsletter subscription:', this.newsletterEmail);
      this.showNotification('Successfully subscribed to newsletter!');
      this.newsletterEmail = '';
    } else {
      this.showNotification('Please enter a valid email address.', 'error');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Utility Methods
  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  private showNotification(message: string, type: 'success' | 'error' = 'success'): void {
    // Here you would typically use a notification service
    console.log(`${type.toUpperCase()}: ${message}`);
  }

  // TrackBy Functions for Performance
  trackByArtworkId(index: number, artwork: Artwork): string {
    return artwork.id;
  }

  trackByPageNumber(index: number, page: number): number {
    return page;
  }

  // Navigation Methods
  navigateToArtwork(artworkId: string): void {
    this.router.navigate(['/artwork', artworkId]);
  }

  navigateToArtist(artistId: string): void {
    this.router.navigate(['/artist', artistId]);
  }
}