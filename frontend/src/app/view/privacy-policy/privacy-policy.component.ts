import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

interface PrivacySection {
  id: string
  title: string
  content: string[]
  subsections?: { title: string; content: string[] }[]
}

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css'
})
export class PrivacyPolicyComponent implements OnInit {
  lastUpdated = "January 15, 2024"
  effectiveDate = "January 1, 2024"

  privacySections: PrivacySection[] = [
    {
      id: "introduction",
      title: "Introduction",
      content: [
        "At PORTRAIT, we are committed to protecting your privacy and ensuring the security of your personal information.",
        "This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our photography services and website.",
        "By using our services, you consent to the data practices described in this policy.",
      ],
    },
    {
      id: "information-collection",
      title: "Information We Collect",
      content: [
        "We collect information you provide directly to us and information we obtain automatically when you use our services.",
      ],
      subsections: [
        {
          title: "Personal Information",
          content: [
            "Name, email address, phone number, and mailing address",
            "Payment information including credit card details",
            "Photography preferences and session requirements",
            "Communication records and correspondence",
          ],
        },
        {
          title: "Automatically Collected Information",
          content: [
            "IP address, browser type, and device information",
            "Website usage data and analytics",
            "Cookies and similar tracking technologies",
            "Location data when using mobile services",
          ],
        },
        {
          title: "Photography Content",
          content: [
            "Photographs taken during sessions",
            "Image metadata and technical information",
            "Client preferences and editing instructions",
          ],
        },
      ],
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      content: [
        "We use your personal information for legitimate business purposes including service delivery, communication, and business operations.",
      ],
      subsections: [
        {
          title: "Service Delivery",
          content: [
            "Scheduling and conducting photography sessions",
            "Processing payments and managing bookings",
            "Delivering final photographs and products",
            "Providing customer support and assistance",
          ],
        },
        {
          title: "Communication",
          content: [
            "Sending appointment confirmations and reminders",
            "Providing updates on session status and delivery",
            "Responding to inquiries and support requests",
            "Sending promotional materials (with consent)",
          ],
        },
        {
          title: "Business Operations",
          content: [
            "Improving our services and website functionality",
            "Analyzing usage patterns and customer preferences",
            "Maintaining security and preventing fraud",
            "Complying with legal obligations",
          ],
        },
      ],
    },
    {
      id: "information-sharing",
      title: "Information Sharing and Disclosure",
      content: [
        "We do not sell, trade, or rent your personal information to third parties. We may share your information only in specific circumstances outlined below.",
      ],
      subsections: [
        {
          title: "Service Providers",
          content: [
            "Payment processors for transaction handling",
            "Cloud storage providers for secure data backup",
            "Email service providers for communication",
            "Analytics providers for website improvement",
          ],
        },
        {
          title: "Legal Requirements",
          content: [
            "When required by law or legal process",
            "To protect our rights and property",
            "To ensure safety and security",
            "In connection with business transfers",
          ],
        },
        {
          title: "With Your Consent",
          content: [
            "Portfolio and marketing usage (with explicit consent)",
            "Social media sharing (when authorized)",
            "Referral programs and testimonials",
          ],
        },
      ],
    },
    {
      id: "data-security",
      title: "Data Security",
      content: [
        "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
      ],
      subsections: [
        {
          title: "Technical Safeguards",
          content: [
            "SSL encryption for data transmission",
            "Secure cloud storage with encryption at rest",
            "Regular security audits and updates",
            "Access controls and authentication systems",
          ],
        },
        {
          title: "Organizational Measures",
          content: [
            "Staff training on privacy and security practices",
            "Limited access to personal information on need-to-know basis",
            "Regular review and update of security policies",
            "Incident response procedures",
          ],
        },
      ],
    },
    {
      id: "your-rights",
      title: "Your Privacy Rights",
      content: [
        "You have certain rights regarding your personal information, subject to applicable laws and regulations.",
      ],
      subsections: [
        {
          title: "Access and Correction",
          content: [
            "Request access to your personal information",
            "Correct inaccurate or incomplete information",
            "Update your contact preferences",
            "Request information about data processing activities",
          ],
        },
        {
          title: "Data Control",
          content: [
            "Request deletion of your personal information",
            "Opt-out of marketing communications",
            "Withdraw consent for specific data uses",
            "Request data portability where applicable",
          ],
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies and Tracking",
      content: ["We use cookies and similar technologies to enhance your experience and analyze website usage."],
      subsections: [
        {
          title: "Types of Cookies",
          content: [
            "Essential cookies for website functionality",
            "Analytics cookies for usage statistics",
            "Preference cookies for personalization",
            "Marketing cookies for targeted advertising",
          ],
        },
        {
          title: "Cookie Management",
          content: [
            "You can control cookies through browser settings",
            "Opt-out options for non-essential cookies",
            "Third-party cookie policies apply",
            "Some features may not work without cookies",
          ],
        },
      ],
    },
    {
      id: "children-privacy",
      title: "Children's Privacy",
      content: [
        "Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13.",
        "If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.",
        "Parents and guardians have the right to review and request deletion of their child's information.",
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
    console.log("Downloading Privacy Policy PDF...")
  }
}
