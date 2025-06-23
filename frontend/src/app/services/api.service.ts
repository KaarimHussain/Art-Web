import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Product from '../models/Product';
import CartItem from '../models/CartItems';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5263/api';

  constructor(private http: HttpClient) { }

  // Products API
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/category/${category}`);
  }

  getPopularProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/popular`);
  }

  // Cart API
  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/cart`);
  }

  addToCart(item: CartItem): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart`, item);
  }

  updateCartItemQuantity(id: number, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/cart/${id}`, quantity);
  }

  removeFromCart(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart/${id}`);
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart`);
  }
}