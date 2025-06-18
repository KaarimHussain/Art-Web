import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import CartItem from '../../models/CartItems';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isCartOpen = false;
  isLoggedIn = false;
  // Static Data Cart
  cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Standard Portrait Session',
      price: 199,
      quantity: 1,
      image: '/placeholder.svg?height=100&width=100',
    },
    {
      id: 4,
      name: '8x10 Print',
      price: 25,
      quantity: 2,
      image: '/placeholder.svg?height=100&width=100',
    },
  ];

  openCart(): void {
    this.isCartOpen = true;
  }

  closeCart(): void {
    this.isCartOpen = false;
  }

  isLogged(): void {
    this.isLoggedIn = this.isLoggedIn ? true : false;
  }
}
