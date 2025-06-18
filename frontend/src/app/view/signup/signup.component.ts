import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  // Form visibility toggles
  showPassword = false;
  showConfirmPassword = false;

  // Form data
  signupForm = {
    accountType: 'individual',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    newsletter: false,
    termsAccepted: false,
  };

  // Loading state
  isLoading = false;

  constructor(private router: Router) {}

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Toggle confirm password visibility
   */
  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  /**
   * Handle form submission
   */
  onSignup(event: Event): void {
    event.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;

    // Simulate API call
    setTimeout(() => {
      console.log('Signup form submitted:', this.signupForm);

      // Show success message
      this.showSuccessMessage();

      // Redirect to login or dashboard
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);

      this.isLoading = false;
    }, 1500);
  }

  /**
   * Validate form data
   */
  private validateForm(): boolean {
    // Check required fields
    if (!this.signupForm.firstName.trim()) {
      this.showErrorMessage('First name is required');
      return false;
    }

    if (!this.signupForm.lastName.trim()) {
      this.showErrorMessage('Last name is required');
      return false;
    }

    if (!this.signupForm.email.trim()) {
      this.showErrorMessage('Email is required');
      return false;
    }

    if (!this.isValidEmail(this.signupForm.email)) {
      this.showErrorMessage('Please enter a valid email address');
      return false;
    }

    if (!this.signupForm.phone.trim()) {
      this.showErrorMessage('Phone number is required');
      return false;
    }

    if (!this.signupForm.password) {
      this.showErrorMessage('Password is required');
      return false;
    }

    if (this.signupForm.password.length < 8) {
      this.showErrorMessage('Password must be at least 8 characters long');
      return false;
    }

    if (this.signupForm.password !== this.signupForm.confirmPassword) {
      this.showErrorMessage('Passwords do not match');
      return false;
    }

    if (!this.signupForm.termsAccepted) {
      this.showErrorMessage(
        'You must accept the Terms of Service and Privacy Policy'
      );
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
   * Show success message
   */
  private showSuccessMessage(): void {
    // You can implement a toast notification service here
    console.log('Account created successfully! Redirecting to login...');

    // Example of showing a simple alert (replace with proper notification)
    alert(
      'Account created successfully! You will be redirected to the login page.'
    );
  }

  /**
   * Show error message
   */
  private showErrorMessage(message: string): void {
    // You can implement a toast notification service here
    console.error('Signup error:', message);

    // Example of showing a simple alert (replace with proper notification)
    alert(message);
  }

  /**
   * Handle social signup (Google)
   */
  onGoogleSignup(): void {
    console.log('Google signup initiated');
    // Implement Google OAuth integration
    // Example: this.authService.signupWithGoogle()
  }

  /**
   * Handle social signup (Facebook)
   */
  onFacebookSignup(): void {
    console.log('Facebook signup initiated');
    // Implement Facebook OAuth integration
    // Example: this.authService.signupWithFacebook()
  }

  /**
   * Navigate to login page
   */
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Navigate to home page
   */
  goToHome(): void {
    this.router.navigate(['/']);
  }

  /**
   * Handle account type selection
   */
  onAccountTypeChange(type: 'individual' | 'business'): void {
    this.signupForm.accountType = type;
    console.log('Account type changed to:', type);
  }

  /**
   * Handle newsletter subscription toggle
   */
  onNewsletterToggle(): void {
    this.signupForm.newsletter = !this.signupForm.newsletter;
    console.log('Newsletter subscription:', this.signupForm.newsletter);
  }

  /**
   * Handle terms acceptance toggle
   */
  onTermsToggle(): void {
    this.signupForm.termsAccepted = !this.signupForm.termsAccepted;
    console.log('Terms accepted:', this.signupForm.termsAccepted);
  }

  /**
   * Format phone number as user types
   */
  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove non-digits

    // Format as (XXX) XXX-XXXX
    if (value.length >= 6) {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(
        6,
        10
      )}`;
    } else if (value.length >= 3) {
      value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    }

    this.signupForm.phone = value;
    input.value = value;
  }

  /**
   * Check password strength
   */
  getPasswordStrength(): string {
    const password = this.signupForm.password;

    if (password.length === 0) return '';
    if (password.length < 6) return 'weak';
    if (password.length < 10) return 'medium';

    // Check for uppercase, lowercase, numbers, and special characters
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const strengthCount = [hasUpper, hasLower, hasNumber, hasSpecial].filter(
      Boolean
    ).length;

    if (strengthCount >= 3 && password.length >= 10) return 'strong';
    if (strengthCount >= 2 && password.length >= 8) return 'medium';
    return 'weak';
  }

  /**
   * Get password strength color class
   */
  getPasswordStrengthClass(): string {
    const strength = this.getPasswordStrength();
    switch (strength) {
      case 'strong':
        return 'text-emerald-400';
      case 'medium':
        return 'text-amber-400';
      case 'weak':
        return 'text-red-400';
      default:
        return 'text-slate-400';
    }
  }
}
