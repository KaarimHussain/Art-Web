import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface ArtworkDetail {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  artistImage: string;
  artistLocation: string;
  price: number;
  originalPrice?: number;
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
  reviewList: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  dateTime: string;
  images?: string[];
  helpful: number;
  verified: boolean;
}

export interface RelatedArtwork {
  id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
  rating: number;
}

@Component({
  selector: 'app-artwork-detail',
  templateUrl: './artwork-detail.component.html',
  styleUrls: ['./artwork-detail.component.css']
})
export class ArtworkDetailComponent implements OnInit, OnDestroy {
  // Main Data Properties
  artwork: ArtworkDetail | null = null;
  relatedArtworks: RelatedArtwork[] = [];
  
  // Image Gallery Properties
  selectedImageIndex: number = 0;
  showZoomModal: boolean = false;

  // Review Properties
  currentReviewPage: number = 1;
  reviewsPerPage: number = 5;
  totalReviewPages: number = 0;

  // Form Properties
  newsletterEmail: string = '';

  // Loading and Error States
  isLoading: boolean = false;
  error: string | null = null;

  // Reactive Properties
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      const artworkId = params['id'];
      if (artworkId) {
        this.loadArtworkDetails(artworkId);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Data Loading Methods
  private loadArtworkDetails(artworkId: string): void {
    this.isLoading = true;
    this.error = null;

    // Mock data loading - replace with actual service call
    setTimeout(() => {
      this.artwork = this.getMockArtworkDetail(artworkId);
      if (this.artwork) {
        this.loadRelatedArtworks();
        this.updateReviewPagination();
      } else {
        this.error = 'Artwork not found';
      }
      this.isLoading = false;
    }, 1000);
  }

  private getMockArtworkDetail(id: string): ArtworkDetail {
    return {
      id: id,
      title: 'Sunset Dreams',
      artist: 'Elena Rodriguez',
      artistId: 'artist-1',
      artistImage: '/placeholder.svg?height=100&width=100',
      artistLocation: 'Barcelona, Spain',
      price: 1250,
      originalPrice: 1500,
      images: [
        '/placeholder.svg?height=600&width=800',
        '/placeholder.svg?height=600&width=800',
        '/placeholder.svg?height=600&width=800',
        '/placeholder.svg?height=600&width=800'
      ],
      category: 'painting',
      medium: 'Oil on Canvas',
      dimensions: '24" x 36"',
      year: 2023,
      style: 'Contemporary',
      description: 'A vibrant sunset painting that captures the essence of golden hour with masterful brushwork and rich, warm colors. This piece evokes feelings of tranquility and wonder, making it perfect for any space that needs a touch of natural beauty and serenity.',
      rating: 4.8,
      reviews: 24,
      sold: 156,
      inWishlist: false,
      tags: ['sunset', 'landscape', 'contemporary'],
      featured: true,
      createdAt: new Date('2023-12-01'),
      reviewList: this.getMockReviews()
    };
  }

  private getMockReviews(): Review[] {
    return [
      {
        id: 'review-1',
        userId: 'user-1',
        userName: 'Sarah Johnson',
        userImage: '/placeholder.svg?height=50&width=50',
        rating: 5,
        title: 'Absolutely Beautiful!',
        comment: 'This artwork exceeded my expectations. The colors are vibrant and the quality is outstanding. It looks perfect in my living room.',
        date: 'December 15, 2023',
        dateTime: '2023-12-15T10:30:00Z',
        images: ['/placeholder.svg?height=100&width=100'],
        helpful: 12,
        verified: true
      },
      {
        id: 'review-2',
        userId: 'user-2',
        userName: 'Michael Chen',
        userImage: '/placeholder.svg?height=50&width=50',
        rating: 4,
        title: 'Great Quality',
        comment: 'The painting arrived well-packaged and in perfect condition. The artist\'s technique is impressive.',
        date: 'December 10, 2023',
        dateTime: '2023-12-10T14:20:00Z',
        helpful: 8,
        verified: true
      },
      {
        id: 'review-3',
        userId: 'user-3',
        userName: 'Emma Wilson',
        userImage: '/placeholder.svg?height=50&width=50',
        rating: 5,
        title: 'Love it!',
        comment: 'This piece brings so much warmth to my home. Elena\'s work is truly exceptional.',
        date: 'December 5, 2023',
        dateTime: '2023-12-05T16:45:00Z',
        helpful: 15,
        verified: true
      }
    ];
  }

  private loadRelatedArtworks(): void {
    // Mock related artworks - replace with actual service call
    this.relatedArtworks = [
      {
        id: '2',
        title: 'Morning Mist',
        artist: 'Elena Rodriguez',
        price: 980,
        image: '/placeholder.svg?height=300&width=400',
        rating: 4.7
      },
      {
        id: '3',
        title: 'Golden Fields',
        artist: 'Elena Rodriguez',
        price: 1100,
        image: '/placeholder.svg?height=300&width=400',
        rating: 4.9
      },
      {
        id: '4',
        title: 'Ocean Breeze',
        artist: 'Marcus Chen',
        price: 850,
        image: '/placeholder.svg?height=300&width=400',
        rating: 4.6
      },
      {
        id: '5',
        title: 'Urban Lights',
        artist: 'Sofia Andersson',
        price: 1350,
        image: '/placeholder.svg?height=300&width=400',
        rating: 4.8
      }
    ];
  }

  // Image Gallery Methods
  selectImage(index: number): void {
    if (index >= 0 && this.artwork && index < this.artwork.images.length) {
      this.selectedImageIndex = index;
    }
  }

  openZoomView(): void {
    this.showZoomModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeZoomView(): void {
    this.showZoomModal = false;
    document.body.style.overflow = 'auto';
  }

  // Interaction Methods
  toggleWishlist(artworkId: string): void {
    if (this.artwork && this.artwork.id === artworkId) {
      this.artwork.inWishlist = !this.artwork.inWishlist;
      // Here you would typically call a service to update the wishlist
      console.log(`${this.artwork.inWishlist ? 'Added to' : 'Removed from'} wishlist:`, this.artwork.title);
      this.showNotification(`${this.artwork.inWishlist ? 'Added to' : 'Removed from'} wishlist!`);
    }
  }

  addToCart(artwork: ArtworkDetail): void {
    // Here you would typically call a cart service
    console.log('Added to cart:', artwork.title);
    this.showNotification(`${artwork.title} added to cart!`);
  }

  openCart(): void {
    this.router.navigate(['/cart']);
  }

  requestCommission(): void {
    if (this.artwork) {
      this.router.navigate(['/commission/request'], {
        queryParams: { artistId: this.artwork.artistId }
      });
    }
  }

  // Review Methods
  writeReview(): void {
    if (this.artwork) {
      this.router.navigate(['/review/write'], {
        queryParams: { artworkId: this.artwork.id }
      });
    }
  }

  private updateReviewPagination(): void {
    if (this.artwork) {
      this.totalReviewPages = Math.ceil(this.artwork.reviewList.length / this.reviewsPerPage);
    }
  }

  getReviewPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(1, this.currentReviewPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(this.totalReviewPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToReviewPage(page: number): void {
    if (page >= 1 && page <= this.totalReviewPages) {
      this.currentReviewPage = page;
    }
  }

  previousReviewPage(): void {
    if (this.currentReviewPage > 1) {
      this.currentReviewPage--;
    }
  }

  nextReviewPage(): void {
    if (this.currentReviewPage < this.totalReviewPages) {
      this.currentReviewPage++;
    }
  }

  // Newsletter Methods
  subscribeNewsletter(event: Event): void {
    event.preventDefault();
    
    if (this.newsletterEmail && this.isValidEmail(this.newsletterEmail)) {
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
    console.log(`${type.toUpperCase()}: ${message}`);
  }

  // TrackBy Functions for Performance
  trackByImageIndex(index: number, image: string): number {
    return index;
  }

  trackByStarIndex(index: number, star: number): number {
    return index;
  }

  trackByReviewId(index: number, review: Review): string {
    return review.id;
  }

  trackByReviewImageIndex(index: number, image: string): number {
    return index;
  }

  trackByPageNumber(index: number, page: number): number {
    return page;
  }

  trackByArtworkId(index: number, artwork: RelatedArtwork): string {
    return artwork.id;
  }

  // Navigation Methods
  navigateToArtist(artistId: string): void {
    this.router.navigate(['/artist', artistId]);
  }

  navigateToArtwork(artworkId: string): void {
    this.router.navigate(['/artwork', artworkId]);
  }

  // Keyboard Event Handlers
  onKeyDown(event: KeyboardEvent): void {
    if (this.showZoomModal) {
      switch (event.key) {
        case 'Escape':
          this.closeZoomView();
          break;
        case 'ArrowLeft':
          this.previousImage();
          break;
        case 'ArrowRight':
          this.nextImage();
          break;
      }
    }
  }

  private previousImage(): void {
    if (this.artwork && this.selectedImageIndex > 0) {
      this.selectedImageIndex--;
    }
  }

  private nextImage(): void {
    if (this.artwork && this.selectedImageIndex < this.artwork.images.length - 1) {
      this.selectedImageIndex++;
    }
  }
}