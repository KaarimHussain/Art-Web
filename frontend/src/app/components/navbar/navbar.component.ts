import { Component, type OnInit, type OnDestroy } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router, RouterLink, RouterModule } from "@angular/router"
import { AuthService } from "../../services/auth.service"
import { NotificationService } from "../../services/notification.service"
import { Subscription } from "rxjs"

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen = false
  isLoggedIn = false
  isAdmin = false;
  private authSubscription: Subscription = new Subscription()

  constructor(
    private auth: AuthService,
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    // Subscribe to authentication state changes
    this.authSubscription = this.auth.authState$.subscribe((isAuthenticated) => {
      console.log("Navbar: Auth state changed to:", isAuthenticated)
      this.isLoggedIn = isAuthenticated
      this.isAdmin = this.auth.checkIfAdmin()
    })

    // Set initial state
    this.isLoggedIn = this.auth.isAuthenticated()
    this.isAdmin = this.auth.checkIfAdmin()

  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe()
    }
  }

  private checkAuthState() {
    this.isLoggedIn = this.auth.isAuthenticated()
  }

  logout() {
    console.log("Logout called")

    try {
      // Call the auth service logout method
      this.auth.logout()

      // Update local state
      this.isLoggedIn = false

      // Close mobile menu if open
      this.closeMenu()

      // Show success notification
      this.notificationService.success("Logged Out", "You have been successfully logged out.")

      this.router.navigate(["/"]);
    } catch (error) {
      console.error("Logout error:", error)
      this.notificationService.error("Logout Failed", "An error occurred while logging out.")
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }

  closeMenu() {
    this.isMenuOpen = false
  }

  // Navigation methods for buttons
  navigateToCart() {
    this.router.navigate(["/cart"])
    this.closeMenu()
  }

  navigateToDashboard() {
    this.router.navigate(["/user-dashboard"])
    this.closeMenu()
  }

  navigateToLogin() {
    this.router.navigate(["/login"])
    this.closeMenu()
  }

  navigateToSignup() {
    this.router.navigate(["/signup"])
    this.closeMenu()
  }
}
