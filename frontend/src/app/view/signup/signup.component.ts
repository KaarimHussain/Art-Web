import { Component } from "@angular/core"
import { Router, RouterLink } from "@angular/router"
import { FormsModule } from "@angular/forms" // Add this import
import { AuthService } from "../../services/auth.service"
import { CommonModule } from "@angular/common"
import { NotificationService } from "../../services/notification.service"

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.css",
})
export class SignupComponent {
  // Form visibility toggles
  showPassword = false
  showConfirmPassword = false

  // Form data
  signupForm = {
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    newsletter: false,
    termsAccepted: false,
  }

  // Loading state
  isLoading = false

  constructor(
    private router: Router,
    private auth: AuthService,
    private notificationService: NotificationService,
  ) { }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword
  }

  /**
   * Toggle confirm password visibility
   */
  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword
  }

  /**
   * Handle form submission
   */
  /**
   * Handle form submission
   */
  onSignup(event: Event): void {
    console.log("Called")
    console.log("Form data:", this.signupForm)

    event.preventDefault()

    if (!this.validateForm()) {
      return
    }

    this.isLoading = true

    const newData = {
      username: this.signupForm.username,
      email: this.signupForm.email,
      password: this.signupForm.password,
      phone: this.signupForm.phone,
    }

    console.log("Sending data to API:", newData)

    this.auth.signup(newData).subscribe({
      next: (response) => {
        console.log("Signup response:", response)

        // Handle successful signup - your backend returns { token, message }
        if (response.token) {
          // The AuthService should handle this automatically via the tap operator
          this.notificationService.success("Welcome!", response.message || "Account created successfully!")
          this.isLoading = false

          // Force update auth state to ensure navbar updates
          this.auth.updateAuthState()

          // Delay navigation to show the success message and allow state to update
          this.router.navigate(["/"]);
        } else {
          this.notificationService.error("Signup Failed", "No token received from server")
          this.isLoading = false
        }
      },
      error: (error) => {
        console.error("Signup error:", error)
        this.isLoading = false

        // Handle different error scenarios
        if (error.status === 400) {
          this.notificationService.error("Signup Failed", error.error?.message || "User already exists or invalid data")
        } else if (error.status === 500) {
          this.notificationService.error("Server Error", "Something went wrong on our end. Please try again.")
        } else {
          this.notificationService.error("Network Error", "Please check your connection and try again.")
        }
      },
    })
  }

  /**
   * Validate form data
   */
  private validateForm(): boolean {
    // Check required fields
    if (!this.signupForm.username.trim()) {
      this.showErrorMessage("Username is required")
      return false
    }

    if (!this.signupForm.email.trim()) {
      this.showErrorMessage("Email is required")
      return false
    }

    if (!this.isValidEmail(this.signupForm.email)) {
      this.showErrorMessage("Please enter a valid email address")
      return false
    }

    if (!this.signupForm.phone.trim()) {
      this.showErrorMessage("Phone number is required")
      return false
    }

    if (!this.signupForm.password) {
      this.showErrorMessage("Password is required")
      return false
    }

    if (this.signupForm.password.length < 8) {
      this.showErrorMessage("Password must be at least 8 characters long")
      return false
    }

    if (this.signupForm.password !== this.signupForm.confirmPassword) {
      this.showErrorMessage("Passwords do not match")
      return false
    }

    if (!this.signupForm.termsAccepted) {
      this.showErrorMessage("You must accept the Terms of Service and Privacy Policy")
      return false
    }

    return true
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Show error message
   */
  private showErrorMessage(message: string): void {
    this.notificationService.error("Signup Failed", message)
  }

  /**
   * Handle social signup (Google)
   */
  onGoogleSignup(): void {
    console.log("Google signup initiated")
  }

  /**
   * Handle social signup (Facebook)
   */
  onFacebookSignup(): void {
    console.log("Facebook signup initiated")
  }

  /**
   * Navigate to login page
   */
  goToLogin(): void {
    this.router.navigate(["/login"])
  }

  /**
   * Navigate to home page
   */
  goToHome(): void {
    this.router.navigate(["/"])
  }

  /**
   * Handle newsletter subscription toggle
   */
  onNewsletterToggle(): void {
    this.signupForm.newsletter = !this.signupForm.newsletter
    console.log("Newsletter subscription:", this.signupForm.newsletter)
  }

  /**
   * Handle terms acceptance toggle
   */
  onTermsToggle(): void {
    this.signupForm.termsAccepted = !this.signupForm.termsAccepted
    console.log("Terms accepted:", this.signupForm.termsAccepted)
  }

  /**
   * Format phone number as user types
   */
  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement
    let value = input.value.replace(/\D/g, "")

    if (value.length >= 6) {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`
    } else if (value.length >= 3) {
      value = `(${value.slice(0, 3)}) ${value.slice(3)}`
    }

    this.signupForm.phone = value
    input.value = value
  }

  /**
   * Check password strength
   */
  getPasswordStrength(): string {
    const password = this.signupForm.password

    if (password.length === 0) return ""
    if (password.length < 6) return "weak"
    if (password.length < 10) return "medium"

    const hasUpper = /[A-Z]/.test(password)
    const hasLower = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    const strengthCount = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length

    if (strengthCount >= 3 && password.length >= 10) return "strong"
    if (strengthCount >= 2 && password.length >= 8) return "medium"
    return "weak"
  }

  /**
   * Get password strength color class
   */
  getPasswordStrengthClass(): string {
    const strength = this.getPasswordStrength()
    switch (strength) {
      case "strong":
        return "text-emerald-400"
      case "medium":
        return "text-amber-400"
      case "weak":
        return "text-red-400"
      default:
        return "text-slate-400"
    }
  }
}
