import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { ApiService } from './api.service';
import CartItem from '../models/CartItems';
import Product from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  
  private cartTotalSubject = new BehaviorSubject<number>(0);
  cartTotal$ = this.cartTotalSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.loadCart();
  }

  private loadCart(): void {
    this.apiService.getCartItems().pipe(
      catchError(error => {
        console.error('Error loading cart:', error);
        return of([]);
      })
    ).subscribe(items => {
      this.cartItemsSubject.next(items);
      this.updateCartTotal();
    });
  }

  private updateCartTotal(): void {
    const total = this.cartItemsSubject.value.reduce(
      (sum, item) => sum + (item.price * item.quantity), 
      0
    );
    this.cartTotalSubject.next(total);
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems$;
  }

  getCartTotal(): Observable<number> {
    return this.cartTotal$;
  }

  addToCart(product: Product, quantity: number = 1): Observable<boolean> {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image
    };

    return this.apiService.addToCart(cartItem).pipe(
      tap(() => {
        // Check if item already exists in cart
        const currentItems = this.cartItemsSubject.value;
        const existingItemIndex = currentItems.findIndex(item => item.id === cartItem.id);
        
        if (existingItemIndex > -1) {
          // Update quantity
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity += quantity;
          this.cartItemsSubject.next(updatedItems);
        } else {
          // Add new item
          this.cartItemsSubject.next([...currentItems, cartItem]);
        }
        
        this.updateCartTotal();
      }),
      map(() => true),
      catchError(error => {
        console.error('Error adding item to cart:', error);
        return of(false);
      })
    );
  }

  updateQuantity(id: number, quantity: number): Observable<boolean> {
    return this.apiService.updateCartItemQuantity(id, quantity).pipe(
      tap(() => {
        const items = this.cartItemsSubject.value;
        const itemIndex = items.findIndex(item => item.id === id);
        
        if (itemIndex > -1) {
          const updatedItems = [...items];
          updatedItems[itemIndex].quantity = quantity;
          this.cartItemsSubject.next(updatedItems);
          this.updateCartTotal();
        }
      }),
      map(() => true),
      catchError(error => {
        console.error('Error updating cart item quantity:', error);
        return of(false);
      })
    );
  }

  removeFromCart(id: number): Observable<boolean> {
    return this.apiService.removeFromCart(id).pipe(
      tap(() => {
        const items = this.cartItemsSubject.value;
        const updatedItems = items.filter(item => item.id !== id);
        this.cartItemsSubject.next(updatedItems);
        this.updateCartTotal();
      }),
      map(() => true),
      catchError(error => {
        console.error('Error removing item from cart:', error);
        return of(false);
      })
    );
  }

  clearCart(): Observable<boolean> {
    return this.apiService.clearCart().pipe(
      tap(() => {
        this.cartItemsSubject.next([]);
        this.cartTotalSubject.next(0);
      }),
      map(() => true),
      catchError(error => {
        console.error('Error clearing cart:', error);
        return of(false);
      })
    );
  }
}