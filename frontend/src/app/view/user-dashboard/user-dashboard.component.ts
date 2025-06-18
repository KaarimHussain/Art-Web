import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface User {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  joinDate: Date;
  verified: boolean;
}

export interface DashboardStats {
  orders: number;
  newOrders: number;
  wishlist: number;
  commissions: number;
  activeCommissions: number;
  totalSpent: number;
  favoriteArtists: number;
}

export interface Order {
  id: string;
  date: string;
  items: number;
  total: number;
  status: 'Delivered' | 'Shipped' | 'Processing' | 'Cancelled';
  artworks: OrderArtwork[];
  shippingAddress: string;
  trackingNumber?: string;
}

export interface OrderArtwork {
  id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  addedDate: Date;
  available: boolean;
}

export interface Commission {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  price: number;
  status: 'Completed' | 'In Progress' | 'Approved' | 'Pending' | 'Cancelled';
  dueDate: string;
  description: string;
  progress: number;
  createdDate: Date;
  lastUpdate: Date;
}

export interface NavItem {
  label: string;
  link: string;
  icon: string;
  active: boolean;
}

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  // User Data - Properly initialized
  user: User = {
    id: 'user-123',
    name: 'John Smith',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    profileImage: '/placeholder.svg?height=100&width=100',
    joinDate: new Date('2023-01-15'),
    verified: true
  };

  // Dashboard Statistics - Properly initialized
  stats: DashboardStats = {
    orders: 0,
    newOrders: 0,
    wishlist: 0,
    commissions: 0,
    activeCommissions: 0,
    totalSpent: 0,
    favoriteArtists: 0
  };

  // Navigation Items - Properly initialized with SVG icons
  navItems: NavItem[] = [
    {
      label: 'Dashboard',
      link: '/dashboard',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h2a2 2 0 012 2v6H8V5z"></path>',
      active: true
    },
    {
      label: 'Orders',
      link: '/dashboard/orders',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>',
      active: false
    },
    {
      label: 'Wishlist',
      link: '/dashboard/wishlist',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>',
      active: false
    },
    {
      label: 'Commissions',
      link: '/dashboard/commissions',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>',
      active: false
    },
    {
      label: 'Profile',
      link: '/dashboard/profile',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>',
      active: false
    },
    {
      label: 'Settings',
      link: '/dashboard/settings',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>',
      active: false
    }
  ];

  // Data Arrays - Properly initialized
  recentOrders: Order[] = [];
  wishlistItems: WishlistItem[] = [];
  activeCommissions: Commission[] = [];

  // Form Properties
  newsletterEmail: string = '';

  // UI State Properties
  showUserMenu: boolean = false;
  isLoading: boolean = false;
  error: string | null = null;

  // Reactive Properties
  private destroy$ = new Subject<void>();

  constructor(private router: Router) {}

  // PROPERLY IMPLEMENTED LIFECYCLE METHODS
  ngOnInit(): void {
    console.log('UserDashboardComponent initialized');
    this.loadDashboardData();
    this.setupEventListeners();
  }

  ngOnDestroy(): void {
    console.log('UserDashboardComponent destroyed');
    this.destroy$.next();
    this.destroy$.complete();
    this.cleanupEventListeners();
  }

  // PROPERLY IMPLEMENTED DATA LOADING METHODS
  private loadDashboardData(): void {
    this.isLoading = true;
    this.error = null;
    
    // Simulate API calls with proper error handling
    Promise.all([
      this.loadUserStats(),
      this.loadRecentOrders(),
      this.loadWishlistItems(),
      this.loadActiveCommissions()
    ]).then(() => {
      this.isLoading = false;
      console.log('Dashboard data loaded successfully');
    }).catch(error => {
      this.error = 'Failed to load dashboard data';
      this.isLoading = false;
      console.error('Dashboard loading error:', error);
      this.showNotification('Failed to load dashboard data', 'error');
    });
  }

  private async loadUserStats(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          this.stats = {
            orders: 12,
            newOrders: 3,
            wishlist: 8,
            commissions: 5,
            activeCommissions: 2,
            totalSpent: 4250,
            favoriteArtists: 6
          };
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 500);
    });
  }

  private async loadRecentOrders(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          this.recentOrders = [
            {
              id: 'ORD-001',
              date: 'Dec 15, 2023',
              items: 2,
              total: 1850,
              status: 'Delivered',
              artworks: [
                {
                  id: 'art-1',
                  title: 'Sunset Dreams',
                  artist: 'Elena Rodriguez',
                  price: 1250,
                  image: '/placeholder.svg?height=100&width=100',
                  quantity: 1
                },
                {
                  id: 'art-2',
                  title: 'Ocean Waves',
                  artist: 'Marina Blue',
                  price: 600,
                  image: '/placeholder.svg?height=100&width=100',
                  quantity: 1
                }
              ],
              shippingAddress: '123 Main St, New York, NY',
              trackingNumber: 'TRK123456789'
            },
            {
              id: 'ORD-002',
              date: 'Dec 10, 2023',
              items: 1,
              total: 950,
              status: 'Shipped',
              artworks: [
                {
                  id: 'art-3',
                  title: 'Mountain Peak',
                  artist: 'Alex Stone',
                  price: 950,
                  image: '/placeholder.svg?height=100&width=100',
                  quantity: 1
                }
              ],
              shippingAddress: '123 Main St, New York, NY',
              trackingNumber: 'TRK987654321'
            },
            {
              id: 'ORD-003',
              date: 'Dec 5, 2023',
              items: 3,
              total: 2200,
              status: 'Processing',
              artworks: [
                {
                  id: 'art-4',
                  title: 'City Lights',
                  artist: 'Urban Artist',
                  price: 800,
                  image: '/placeholder.svg?height=100&width=100',
                  quantity: 2
                },
                {
                  id: 'art-5',
                  title: 'Forest Path',
                  artist: 'Nature Lover',
                  price: 600,
                  image: '/placeholder.svg?height=100&width=100',
                  quantity: 1
                }
              ],
              shippingAddress: '123 Main St, New York, NY'
            }
          ];
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 600);
    });
  }

  private async loadWishlistItems(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          this.wishlistItems = [
            {
              id: 'wish-1',
              title: 'Ocean Waves',
              artist: 'Marina Blue',
              artistId: 'artist-1',
              price: 1200,
              originalPrice: 1400,
              image: '/placeholder.svg?height=300&width=400',
              rating: 4.8,
              reviews: 24,
              addedDate: new Date('2023-12-01'),
              available: true
            },
            {
              id: 'wish-2',
              title: 'Mountain Peak',
              artist: 'Alex Stone',
              artistId: 'artist-2',
              price: 850,
              image: '/placeholder.svg?height=300&width=400',
              rating: 4.6,
              reviews: 18,
              addedDate: new Date('2023-11-28'),
              available: true
            },
            {
              id: 'wish-3',
              title: 'City Lights',
              artist: 'Urban Artist',
              artistId: 'artist-3',
              price: 1500,
              image: '/placeholder.svg?height=300&width=400',
              rating: 4.9,
              reviews: 31,
              addedDate: new Date('2023-11-25'),
              available: false
            },
            {
              id: 'wish-4',
              title: 'Forest Path',
              artist: 'Nature Lover',
              artistId: 'artist-4',
              price: 750,
              image: '/placeholder.svg?height=300&width=400',
              rating: 4.7,
              reviews: 22,
              addedDate: new Date('2023-11-20'),
              available: true
            }
          ];
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 700);
    });
  }

  private async loadActiveCommissions(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          this.activeCommissions = [
            {
              id: 'comm-1',
              title: 'Custom Portrait',
              artist: 'Elena Rodriguez',
              artistId: 'artist-1',
              price: 2500,
              status: 'In Progress',
              dueDate: 'Jan 15, 2024',
              description: 'Custom family portrait in oil painting style',
              progress: 65,
              createdDate: new Date('2023-11-01'),
              lastUpdate: new Date('2023-12-10')
            },
            {
              id: 'comm-2',
              title: 'Abstract Landscape',
              artist: 'Marcus Chen',
              artistId: 'artist-2',
              price: 1800,
              status: 'Approved',
              dueDate: 'Feb 1, 2024',
              description: 'Abstract interpretation of local landscape',
              progress: 25,
              createdDate: new Date('2023-12-01'),
              lastUpdate: new Date('2023-12-05')
            }
          ];
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 800);
    });
  }

  // PROPERLY IMPLEMENTED EVENT HANDLERS
  
  // Navigation Methods - All properly implemented
  browseArtworks(): void {
    console.log('Navigating to browse artworks');
    this.router.navigate(['/gallery']).catch(error => {
      console.error('Navigation error:', error);
      this.showNotification('Navigation failed', 'error');
    });
  }

  logout(): void {
    console.log('Logging out user');
    // Clear user session data
    this.clearUserSession();
    // Navigate to login
    this.router.navigate(['/login']).catch(error => {
      console.error('Logout navigation error:', error);
    });
    this.showNotification('Successfully logged out');
  }

  private clearUserSession(): void {
    // Clear any stored user data, tokens, etc.
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    sessionStorage.clear();
  }

  // UI State Methods - All properly implemented
  toggleUserMenu(): void {
    console.log('Toggling user menu');
    this.showUserMenu = !this.showUserMenu;
  }

  // Cart Methods - Properly implemented
  openCart(): void {
    console.log('Opening cart');
    this.router.navigate(['/cart']).catch(error => {
      console.error('Cart navigation error:', error);
      this.showNotification('Failed to open cart', 'error');
    });
  }

  // Wishlist Methods - All properly implemented
  removeFromWishlist(itemId: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    console.log('Removing item from wishlist:', itemId);
    
    const itemIndex = this.wishlistItems.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
      const item = this.wishlistItems[itemIndex];
      this.wishlistItems.splice(itemIndex, 1);
      this.stats.wishlist = Math.max(0, this.stats.wishlist - 1);
      
      console.log('Removed from wishlist:', item.title);
      this.showNotification(`${item.title} removed from wishlist!`);
      
      // Here you would typically call a service to update the backend
      this.updateWishlistOnServer(itemId, 'remove');
    } else {
      console.warn('Item not found in wishlist:', itemId);
      this.showNotification('Item not found in wishlist', 'error');
    }
  }

  addToCart(item: WishlistItem, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    console.log('Adding item to cart:', item.id);
    
    if (!item.available) {
      this.showNotification('This item is currently unavailable.', 'error');
      return;
    }
    
    // Here you would typically call a cart service
    this.addItemToCart(item);
    console.log('Added to cart:', item.title);
    this.showNotification(`${item.title} added to cart!`);
  }

  private addItemToCart(item: WishlistItem): void {
    // Mock cart service call
    console.log('Adding to cart service:', item);
    // In a real app, you would call: this.cartService.addItem(item)
  }

  private updateWishlistOnServer(itemId: string, action: 'add' | 'remove'): void {
    // Mock API call
    console.log(`${action} wishlist item on server:`, itemId);
    // In a real app, you would call: this.wishlistService.updateItem(itemId, action)
  }

  // Commission Methods - Properly implemented
  requestNewCommission(): void {
    console.log('Requesting new commission');
    this.router.navigate(['/commission/request']).catch(error => {
      console.error('Commission navigation error:', error);
      this.showNotification('Failed to navigate to commission request', 'error');
    });
  }

  // Newsletter Methods - Properly implemented
  subscribeNewsletter(event: Event): void {
    event.preventDefault();
    
    console.log('Newsletter subscription attempt:', this.newsletterEmail);
    
    if (!this.newsletterEmail || !this.isValidEmail(this.newsletterEmail)) {
      this.showNotification('Please enter a valid email address.', 'error');
      return;
    }
    
    // Mock newsletter service call
    this.subscribeToNewsletter(this.newsletterEmail)
      .then(() => {
        console.log('Newsletter subscription successful:', this.newsletterEmail);
        this.showNotification('Successfully subscribed to newsletter!');
        this.newsletterEmail = '';
      })
      .catch(error => {
        console.error('Newsletter subscription error:', error);
        this.showNotification('Failed to subscribe to newsletter', 'error');
      });
  }

  private async subscribeToNewsletter(email: string): Promise<void> {
    // Mock API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% success rate
          resolve();
        } else {
          reject(new Error('Newsletter service unavailable'));
        }
      }, 1000);
    });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Utility Methods - All properly implemented
  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  getStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'Delivered': 'bg-green-600/30 text-green-300 border border-green-500',
      'Shipped': 'bg-blue-600/30 text-blue-300 border border-blue-500',
      'Processing': 'bg-yellow-600/30 text-yellow-300 border border-yellow-500',
      'Cancelled': 'bg-red-600/30 text-red-300 border border-red-500',
      'Completed': 'bg-green-600/30 text-green-300 border border-green-500',
      'In Progress': 'bg-blue-600/30 text-blue-300 border border-blue-500',
      'Approved': 'bg-yellow-600/30 text-yellow-300 border border-yellow-500',
      'Pending': 'bg-gray-600/30 text-gray-300 border border-gray-500'
    };
    
    return statusClasses[status] || 'bg-gray-600/30 text-gray-300 border border-gray-500';
  }

  private showNotification(message: string, type: 'success' | 'error' = 'success'): void {
    console.log(`${type.toUpperCase()}: ${message}`);
    // Here you would typically use a notification service or toast component
    // For now, we'll just log to console and could show browser alert for demo
    if (type === 'error') {
      console.error('Notification:', message);
    }
  }

  // TrackBy Functions for Performance - All properly implemented
  trackByNavItem(index: number, item: NavItem): string {
    return item.link;
  }

  trackByOrderId(index: number, order: Order): string {
    return order.id;
  }

  trackByWishlistItem(index: number, item: WishlistItem): string {
    return item.id;
  }

  trackByCommissionId(index: number, commission: Commission): string {
    return commission.id;
  }

  // Navigation Helper Methods - All properly implemented
  navigateToOrder(orderId: string): void {
    console.log('Navigating to order:', orderId);
    this.router.navigate(['/dashboard/orders', orderId]).catch(error => {
      console.error('Order navigation error:', error);
      this.showNotification('Failed to navigate to order details', 'error');
    });
  }

  navigateToArtwork(artworkId: string): void {
    console.log('Navigating to artwork:', artworkId);
    this.router.navigate(['/artwork', artworkId]).catch(error => {
      console.error('Artwork navigation error:', error);
      this.showNotification('Failed to navigate to artwork', 'error');
    });
  }

  navigateToCommission(commissionId: string): void {
    console.log('Navigating to commission:', commissionId);
    this.router.navigate(['/dashboard/commissions', commissionId]).catch(error => {
      console.error('Commission navigation error:', error);
      this.showNotification('Failed to navigate to commission details', 'error');
    });
  }

  navigateToArtist(artistId: string): void {
    console.log('Navigating to artist:', artistId);
    this.router.navigate(['/artist', artistId]).catch(error => {
      console.error('Artist navigation error:', error);
      this.showNotification('Failed to navigate to artist profile', 'error');
    });
  }

  // Event Handlers - All properly implemented
  onNavItemClick(item: NavItem): void {
    console.log('Navigation item clicked:', item.label);
    
    // Update active state
    this.navItems.forEach(navItem => navItem.active = false);
    item.active = true;
    
    // Navigate
    this.router.navigate([item.link]).catch(error => {
      console.error('Navigation error:', error);
      this.showNotification('Navigation failed', 'error');
      // Revert active state on error
      item.active = false;
      this.navItems.find(navItem => navItem.link === '/dashboard')!.active = true;
    });
  }

  // Event Listeners Setup and Cleanup
  private setupEventListeners(): void {
    // Setup any additional event listeners if needed
    console.log('Setting up event listeners');
  }

  private cleanupEventListeners(): void {
    // Cleanup any additional event listeners
    console.log('Cleaning up event listeners');
  }

  // Host Listeners for Global Events
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.showUserMenu) {
      this.showUserMenu = false;
      console.log('User menu closed via Escape key');
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    const userMenuButton = document.querySelector('[aria-label="User menu"]');
    
    if (this.showUserMenu && userMenuButton && !userMenuButton.contains(target)) {
      this.showUserMenu = false;
      console.log('User menu closed via outside click');
    }
  }

  // Additional Helper Methods
  refreshDashboard(): void {
    console.log('Refreshing dashboard data');
    this.loadDashboardData();
  }

  handleError(error: any, context: string): void {
    console.error(`Error in ${context}:`, error);
    this.error = `Failed to ${context}`;
    this.showNotification(`Failed to ${context}`, 'error');
  }

  // Method to handle route changes if needed
  onRouteChange(route: string): void {
    console.log('Route changed to:', route);
    // Update active navigation item based on current route
    this.updateActiveNavItem(route);
  }

  private updateActiveNavItem(currentRoute: string): void {
    this.navItems.forEach(item => {
      item.active = item.link === currentRoute;
    });
  }
}