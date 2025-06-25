import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { LoginCredentials } from '../../models/Login';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // Form visibility toggles
  showPassword = false;

  // Form data - FIXED: Using different variable name to avoid conflict
  loginFormData = {
    email: '',
    password: '',
  };

  // Loading state
  isLoading = false;

  // Error handling
  errorMessage = '';

  constructor(
    private router: Router,
    private auth: AuthService,
    private notificationService: NotificationService
  ) { }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Handle form submission - FIXED
   */
  onLogin(event: Event): void {
    event.preventDefault();

    if (!this.validateForm()) {
      console.log('Form validation failed');
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';

    const loginData: LoginCredentials = {
      email: this.loginFormData.email,
      password: this.loginFormData.password,
    };

    this.auth.login(loginData).subscribe({
      next: (response) => {
        console.log('Login response:', response);

        if (response.token) {
          this.notificationService.success('Welcome!', 'Login successful!');
          this.isLoading = false;

          // Force update auth state to ensure navbar updates
          this.auth.updateAuthState();
          if (this.auth.checkIfAdmin()) {
            this.router.navigate(['/admin-dashboard']);
          }
          this.router.navigate(['/user-dashboard']);
        } else {
          this.notificationService.error('Login Failed', 'No token received from server');
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        this.isLoading = false;
        console.error(error.status);

        if (error.status === 401) {
          this.notificationService.error('Login Failed', 'Invalid credentials. Please try again.');
        } else if (error.status === 500) {
          this.notificationService.error('Server Error', 'Something went wrong on our end. Please try again.');
        } else if (error.status === 400) {
          this.notificationService.error('Bad Request', 'Unable to handle the request. Please try again later!');
        } else {
          this.notificationService.error('Network Error', 'Please check your connection and try again.');
        }
      },
    });
  }

  /**
   * Validate form data - UPDATED
   */
  private validateForm(): boolean {
    // Reset error message
    this.errorMessage = '';

    // Check required fields
    if (!this.loginFormData.email.trim()) {
      this.showErrorMessage('Email is required');
      return false;
    }

    if (!this.isValidEmail(this.loginFormData.email)) {
      this.showErrorMessage('Please enter a valid email address');
      return false;
    }

    if (!this.loginFormData.password) {
      this.showErrorMessage('Password is required');
      return false;
    }

    if (this.loginFormData.password.length < 6) {
      this.showErrorMessage('Password must be at least 6 characters long');
      return false;
    }

    return true;
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Show error message
   */
  private showErrorMessage(message: string): void {
    this.errorMessage = message;
    this.notificationService.error('Login Failed', message);
  }

  /**
   * Handle social login (Google)
   */
  onGoogleLogin(): void {
    console.log('Google login initiated');
    // Implement Google OAuth integration
    // Example: this.authService.loginWithGoogle()
  }

  /**
   * Handle social login (Facebook)
   */
  onFacebookLogin(): void {
    console.log('Facebook login initiated');
    // Implement Facebook OAuth integration
    // Example: this.authService.loginWithFacebook()
  }

  /**
   * Navigate to signup page
   */
  goToSignup(): void {
    this.router.navigate(['/signup']);
  }

  /**
   * Navigate to home page
   */
  goToHome(): void {
    this.router.navigate(['/']);
  }

  /**
   * Navigate to forgot password page
   */
  goToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }


  /**
   * Handle enter key press in form
   */
  onEnterKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onLogin(event);
    }
  }

  /**
   * Clear form data
   */
  clearForm(): void {
    this.loginFormData = {
      email: '',
      password: '',
    };
    this.errorMessage = '';
  }

  /**
   * Auto-fill demo credentials for testing
   */
  fillDemoCredentials(): void {
    this.loginFormData.email = 'demo@portrait.com';
    this.loginFormData.password = 'password123';
  }

  /**
   * Check if form is valid - UPDATED
   */
  get isFormValid(): boolean {
    return (
      this.loginFormData.email.trim() !== '' &&
      this.loginFormData.password !== '' &&
      this.loginFormData.password.length >= 6 &&
      this.isValidEmail(this.loginFormData.email)
    );
  }

  /**
   * Get button text based on loading state
   */
  get buttonText(): string {
    return this.isLoading ? 'Signing In...' : 'Sign In';
  }

  /**
   * Check if button should be disabled
   */
  get isButtonDisabled(): boolean {
    return this.isLoading || !this.isFormValid;
  }
}