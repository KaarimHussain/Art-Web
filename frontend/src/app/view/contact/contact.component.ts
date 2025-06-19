import { CommonModule } from "@angular/common"
import { Component, type OnInit } from "@angular/core"
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"

@Component({
  selector: "app-contact",
  standalone: true,  // Make sure this is set to true for standalone components
  imports: [CommonModule, ReactiveFormsModule],  // Add ReactiveFormsModule here
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup
  isSubmitting = false
  showSuccessMessage = false

  faqs = [
    {
      question: "How far in advance should I book a session?",
      answer:
        "We recommend booking at least 2-3 weeks in advance, especially during peak seasons (spring and fall). However, we sometimes have last-minute availability.",
      isOpen: false,
    },
    {
      question: "What should I wear for my portrait session?",
      answer:
        "We provide a detailed style guide after booking, but generally recommend solid colors, avoiding busy patterns, and bringing multiple outfit options.",
      isOpen: false,
    },
    {
      question: "How long does a typical session last?",
      answer:
        "Portrait sessions typically last 1-2 hours, depending on the package you choose. This allows time for multiple looks and locations if desired.",
      isOpen: false,
    },
    {
      question: "When will I receive my photos?",
      answer:
        "You'll receive a preview gallery within 48 hours, and your final edited images within 1-2 weeks of your session.",
      isOpen: false,
    },
    {
      question: "Do you offer payment plans?",
      answer:
        "Yes, we offer flexible payment plans for sessions over $500. A 50% deposit is required to secure your booking, with the balance due on the session day.",
      isOpen: false,
    },
    {
      question: "Can I bring props or have specific requests?",
      answer:
        "We encourage you to bring meaningful props and share your vision. We'll work together to create portraits that reflect your personality.",
      isOpen: false,
    },
  ]

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: [""],
      subject: ["", Validators.required],
      budget: [""],
      message: ["", Validators.required],
      newsletter: [false],
    })
  }

  ngOnInit(): void {
    // Initialize component
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName)
    return !!(field && field.invalid && (field.dirty || field.touched))
  }

  toggleFaq(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true

      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false
        this.showSuccessMessage = true
        this.contactForm.reset()

        // Hide success message after 5 seconds
        setTimeout(() => {
          this.showSuccessMessage = false
        }, 5000)
      }, 2000)
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach((key) => {
        this.contactForm.get(key)?.markAsTouched()
      })
    }
  }
}
