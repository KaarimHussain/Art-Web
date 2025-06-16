import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from "@angular/forms"

interface ContactInfo {
  icon: string
  title: string
  details: string[]
  link?: string
}

interface FormSubmissionResponse {
  success: boolean
  message: string
}

@Component({
  selector: "app-contact",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent {
  contactForm!: FormGroup
  isSubmitting = false
  submissionResponse: FormSubmissionResponse | null = null
  showSuccessMessage = false

  constructor(private fb: FormBuilder) {
    this.contactForm = this.createContactForm()
  }

  contactInfo: ContactInfo[] = [
    {
      icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
      title: "Phone",
      details: ["(555) 123-4567", "Mon-Fri 9AM-6PM"],
      link: "tel:+15551234567",
    },
    {
      icon: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      title: "Email",
      details: ["info@portrait.com", "We respond within 24 hours"],
      link: "mailto:info@portrait.com",
    },
    {
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
      title: "Studio Location",
      details: ["123 Portrait Lane", "New York, NY 10001"],
      link: "https://maps.google.com/?q=123+Portrait+Lane+New+York+NY+10001",
    },
    {
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "Studio Hours",
      details: ["Mon-Fri: 9AM-6PM", "Sat: 10AM-4PM", "Sun: By Appointment"],
    },
  ]

  subjectOptions = [
    "Portrait Session Inquiry",
    "Wedding Photography",
    "Corporate Headshots",
    "Family Portraits",
    "Print Orders",
    "General Question",
    "Other",
  ]

  private createContactForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[+]?[1-9][\d]{0,15}$/)]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      preferredContact: ['email'],
      newsletter: [false]
    })
  }

  // Getter methods for form controls with null safety
  get name(): FormControl {
    return this.contactForm.get('name') as FormControl
  }

  get email(): FormControl {
    return this.contactForm.get('email') as FormControl
  }

  get phone(): FormControl {
    return this.contactForm.get('phone') as FormControl
  }

  get subject(): FormControl {
    return this.contactForm.get('subject') as FormControl
  }

  get message(): FormControl {
    return this.contactForm.get('message') as FormControl
  }

  get preferredContact(): FormControl {
    return this.contactForm.get('preferredContact') as FormControl
  }

  get newsletter(): FormControl {
    return this.contactForm.get('newsletter') as FormControl
  }

  onSubmit(): void {
    if (!this.contactForm) {
      console.error("Contact form is not initialized")
      return
    }

    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true
      this.submissionResponse = null

      // Simulate API call
      this.submitForm(this.contactForm.value)
        .then((response) => {
          this.submissionResponse = response
          if (response?.success) {
            this.showSuccessMessage = true
            this.contactForm?.reset()
            this.contactForm?.patchValue({
              preferredContact: "email",
              newsletter: false,
            })

            // Hide success message after 5 seconds
            setTimeout(() => {
              this.showSuccessMessage = false
            }, 5000)
          }
        })
        .catch((error) => {
          this.submissionResponse = {
            success: false,
            message: "An error occurred while sending your message. Please try again.",
          }
        })
        .finally(() => {
          this.isSubmitting = false
        })
    } else {
      // Mark all fields as touched to show validation errors
      if (this.contactForm) {
        Object.keys(this.contactForm.controls).forEach((key) => {
          this.contactForm?.get(key)?.markAsTouched()
        })
      }
    }
  }

  private async submitForm(formData: any): Promise<FormSubmissionResponse> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate successful submission (replace with actual API call)
    console.log("Form submitted:", formData)

    return {
      success: true,
      message: "Thank you for your message! We'll get back to you within 24 hours.",
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm?.get(fieldName)
    if (field?.errors && field.touched) {
      if (field.errors["required"]) return `${this.getFieldDisplayName(fieldName)} is required`
      if (field.errors["email"]) return "Please enter a valid email address"
      if (field.errors["minlength"])
        return `${this.getFieldDisplayName(fieldName)} must be at least ${field.errors["minlength"].requiredLength} characters`
      if (field.errors["maxlength"])
        return `${this.getFieldDisplayName(fieldName)} must not exceed ${field.errors["maxlength"].requiredLength} characters`
      if (field.errors["pattern"]) return "Please enter a valid phone number"
    }
    return ""
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      name: "Name",
      email: "Email",
      phone: "Phone",
      subject: "Subject",
      message: "Message",
    }
    return displayNames[fieldName] || fieldName
  }

  hasFieldError(fieldName: string): boolean {
    const field = this.contactForm?.get(fieldName)
    return !!(field?.errors && field.touched)
  }

  trackByIndex(index: number): number {
    return index
  }

  openExternalLink(link: string | undefined): void {
    if (link && link.trim()) {
      try {
        window.open(link, "_blank")
      } catch (error) {
        console.warn("Could not open external link:", error)
      }
    }
  }
}
