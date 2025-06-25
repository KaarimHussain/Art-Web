import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // You should have a service for auth logic

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean {
    const user = this.auth.getUserInfo();

    if (user && user.role === 'Admin') {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
