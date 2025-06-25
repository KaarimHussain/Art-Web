import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    const userInfo = this.authService.getUserInfo()

    // Check if user is authenticated
    if (!userInfo) {
      return this.router.createUrlTree(['/login']) // redirect to login if not logged in
    }

    // If admin tries to access user dashboard, block & redirect
    if (userInfo.role === 'Admin') {
      return this.router.createUrlTree(['/admin-dashboard'])
    }

    return true // Allow access for non-admins
  }
}
