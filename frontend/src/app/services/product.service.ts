import { Injectable } from '@angular/core';
import { Observable, of, catchError } from 'rxjs';
import { ApiService } from './api.service';
import Product from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private apiService: ApiService) { }

  getAllProducts(): Observable<Product[]> {
    return this.apiService.getAllProducts().pipe(
      catchError(error => {
        console.error('Error fetching products:', error);
        return of([]);
      })
    );
  }

  getProductById(id: number): Observable<Product | null> {
    return this.apiService.getProductById(id).pipe(
      catchError(error => {
        console.error(`Error fetching product with id ${id}:`, error);
        return of(null);
      })
    );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.apiService.getProductsByCategory(category).pipe(
      catchError(error => {
        console.error(`Error fetching products in category ${category}:`, error);
        return of([]);
      })
    );
  }

  getPopularProducts(): Observable<Product[]> {
    return this.apiService.getPopularProducts().pipe(
      catchError(error => {
        console.error('Error fetching popular products:', error);
        return of([]);
      })
    );
  }
}