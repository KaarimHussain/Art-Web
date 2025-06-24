import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

interface TermsSection {
  id: string
  title: string
  content: string[]
  subsections?: { title: string; content: string[] }[]
}

@Component({
  selector: 'app-terms-of-service',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './terms-of-service.component.html',
  styleUrl: './terms-of-service.component.css'
})
export class TermsOfServiceComponent implements OnInit {
  lastUpdated = "January 15, 2024"
  effectiveDate = "January 1, 2024"

  termsSection: TermsSection[] = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      content: [
        "By accessing and using PORTRAIT's photography services and website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.",
        "These terms constitute a legally binding agreement between you and PORTRAIT. If you do not agree to these terms, please do not use our services.",
        "We reserve the right to modify these terms at any time. Your continued use of our services after changes constitutes acceptance of the new terms.",
      ],
    },
    {
      id: "services",
      title: "Photography Services",
      content: [
        "PORTRAIT provides professional photography services including but not limited to portrait sessions, family photography, professional headshots, and artistic portraits.",
        "All photography sessions are subject to availability and must be scheduled in advance through our booking system.",
      ],
      subsections: [
        {
          title: "Session Booking",
          content: [
            "A non-refundable deposit of 50% is required to secure your booking.",
            "The remaining balance is due on the day of the photography session.",
            "Rescheduling is permitted with at least 48 hours notice, subject to availability.",
          ],
        },
        {
          title: "Session Conduct",
          content: [
            "Clients are expected to arrive on time for scheduled sessions.",
            "Late arrivals may result in shortened session time without refund.",
            "We reserve the right to terminate sessions for inappropriate behavior.",
          ],
        },
      ],
    },
    {
      id: "payment",
      title: "Payment Terms",
      content: [
        "All prices are quoted in USD and are subject to applicable taxes.",
        "Payment can be made via credit card, bank transfer, or other approved methods.",
        "Additional services requested during or after the session may incur extra charges.",
      ],
      subsections: [
        {
          title: "Refund Policy",
          content: [
            "Deposits are non-refundable except in cases of photographer cancellation.",
            "Full refunds may be provided for cancellations made more than 7 days in advance.",
            "Weather-related cancellations for outdoor sessions will be rescheduled without penalty.",
          ],
        },
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property Rights",
      content: [
        "PORTRAIT retains all copyrights to photographs taken during sessions.",
        "Clients receive usage rights as specified in their service agreement.",
        "Unauthorized reproduction, distribution, or commercial use of photographs is prohibited.",
      ],
      subsections: [
        {
          title: "Usage Rights",
          content: [
            "Personal use rights are granted for all purchased photographs.",
            "Commercial usage requires separate licensing agreement.",
            "Social media sharing is permitted with proper photographer credit.",
          ],
        },
        {
          title: "Portfolio Usage",
          content: [
            "PORTRAIT reserves the right to use photographs for portfolio and marketing purposes.",
            "Clients may opt-out of portfolio usage by written request.",
            "No additional compensation is provided for portfolio usage.",
          ],
        },
      ],
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      content: [
        "PORTRAIT's liability is limited to the total amount paid for services.",
        "We are not responsible for events beyond our control that may affect service delivery.",
        "Clients participate in photography sessions at their own risk.",
      ],
    },
    {
      id: "privacy",
      title: "Privacy and Data Protection",
      content: [
        "We collect and process personal information in accordance with our Privacy Policy.",
        "Client information is kept confidential and secure.",
        "We do not sell or share personal information with third parties without consent.",
      ],
    },
  ]

  activeSection = ""

  ngOnInit(): void {
    // Scroll to top when component loads
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  scrollToSection(sectionId: string): void {
    this.activeSection = sectionId
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 100 // Account for fixed header
      const elementPosition = element.offsetTop - offset
      window.scrollTo({ top: elementPosition, behavior: "smooth" })
    }
  }

  downloadPDF(): void {
    // Implement PDF download functionality
    console.log("Downloading Terms of Service PDF...")
  }
}
