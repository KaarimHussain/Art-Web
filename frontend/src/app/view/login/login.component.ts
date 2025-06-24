import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // Form visibility toggles
  showPassword = false;

  // Form data
  loginForm = {
    email: '',
    password: '',
    rememberMe: false,
  };

  // Loading state
  isLoading = false;

  // Error handling
  errorMessage = '';

  constructor(private router: Router) {}

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Handle form submission
   */
  onLogin(event: Event): void {
    event.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Simulate API call
    setTimeout(() => {
      console.log('Login form submitted:', this.loginForm);

      // Simulate login logic
      if (this.simulateLogin()) {
        this.showSuccessMessage();

        // Redirect to dashboard
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      } else {
        this.showErrorMessage('Invalid email or password. Please try again.');
      }

      this.isLoading = false;
    }, 1500);
  }

  /**
   * Validate form data
   */
  private validateForm(): boolean {
    // Reset error message
    this.errorMessage = '';

    // Check required fields
    if (!this.loginForm.email.trim()) {
      this.showErrorMessage('Email is required');
      return false;
    }

    if (!this.isValidEmail(this.loginForm.email)) {
      this.showErrorMessage('Please enter a valid email address');
      return false;
    }

    if (!this.loginForm.password) {
      this.showErrorMessage('Password is required');
      return false;
    }

    if (this.loginForm.password.length < 6) {
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
   * Simulate login process
   */
  private simulateLogin(): boolean {
    // For demo purposes, accept any valid email/password combination
    // In real app, this would make an API call to your authentication service

    // Demo credentials for testing
    const demoCredentials = [
      { email: 'demo@portrait.com', password: 'password123' },
      { email: 'user@example.com', password: 'password' },
      { email: 'test@test.com', password: 'test123' },
    ];

    // Check if credentials match demo accounts
    const isValidCredentials = demoCredentials.some(
      (cred) =>
        cred.email === this.loginForm.email &&
        cred.password === this.loginForm.password
    );

    // For demo, also accept any email with password length >= 6
    return isValidCredentials || this.loginForm.password.length >= 6;
  }

  /**
   * Show success message
   */
  private showSuccessMessage(): void {
    console.log('Login successful! Redirecting to dashboard...');

    // You can implement a toast notification service here
    alert('Login successful! Welcome back!');
  }

  /**
   * Show error message
   */
  private showErrorMessage(message: string): void {
    this.errorMessage = message;
    console.error('Login error:', message);

    // Clear error message after 5 seconds
    setTimeout(() => {
      this.errorMessage = '';
    }, 5000);
  }

  /**
   * Handle social login (Google)
   */
  onGoogleLogin(): void {
    console.log('Google login initiated');
    // Implement Google OAuth integration
    // Example: this.authService.loginWithGoogle()

    // For demo purposes
    setTimeout(() => {
      this.showSuccessMessage();
      this.router.navigate(['/dashboard']);
    }, 1000);
  }

  /**
   * Handle social login (Facebook)
   */
  onFacebookLogin(): void {
    console.log('Facebook login initiated');
    // Implement Facebook OAuth integration
    // Example: this.authService.loginWithFacebook()

    // For demo purposes
    setTimeout(() => {
      this.showSuccessMessage();
      this.router.navigate(['/dashboard']);
    }, 1000);
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
   * Handle remember me toggle
   */
  onRememberMeToggle(): void {
    this.loginForm.rememberMe = !this.loginForm.rememberMe;
    console.log('Remember me:', this.loginForm.rememberMe);
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
    this.loginForm = {
      email: '',
      password: '',
      rememberMe: false,
    };
    this.errorMessage = '';
  }

  /**
   * Auto-fill demo credentials for testing
   */
  fillDemoCredentials(): void {
    this.loginForm.email = 'demo@portrait.com';
    this.loginForm.password = 'password123';
  }

  /**
   * Check if form is valid
   */
  get isFormValid(): boolean {
    return (
      this.loginForm.email.trim() !== '' &&
      this.loginForm.password !== '' &&
      this.isValidEmail(this.loginForm.email)
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
