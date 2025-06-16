import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"

interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  image: string
  experience: number
  specialties: string[]
}

interface CompanyValue {
  icon: string
  title: string
  description: string
}

interface Statistic {
  value: string
  label: string
  description: string
}

@Component({
  selector: "app-about",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  currentYear = new Date().getFullYear()
  foundedYear = 2010
  yearsOfExperience = this.currentYear - this.foundedYear

  companyMission = `At PORTRAIT, we believe that every face tells a story. Our mission is to capture the essence of who you are in a single, timeless image that you'll cherish forever. We specialize in creating authentic, artistic portraits that reflect the unique personality and character of each individual.`

  companyValues: CompanyValue[] = [
    {
      icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
      title: "Artistic Vision",
      description:
        "We see beyond the surface to capture the true essence and personality of our subjects through creative composition and lighting.",
    },
    {
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      title: "Passion & Care",
      description:
        "Every portrait session is approached with genuine care and attention to detail, ensuring a comfortable and memorable experience.",
    },
    {
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "Excellence",
      description:
        "We maintain the highest standards in photography, from initial consultation to final delivery of your timeless portraits.",
    },
    {
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "Timeless Quality",
      description:
        "Our portraits are crafted to stand the test of time, using classic techniques and premium materials that last generations.",
    },
  ]

  statistics: Statistic[] = [
    {
      value: "2500+",
      label: "Portraits Created",
      description: "Beautiful memories captured for families and individuals",
    },
    {
      value: "98%",
      label: "Client Satisfaction",
      description: "Consistently exceeding expectations with every session",
    },
    {
      value: "15+",
      label: "Awards Won",
      description: "Recognition for excellence in portrait photography",
    },
    {
      value: `${this.yearsOfExperience}+`,
      label: "Years Experience",
      description: "Dedicated to perfecting the art of portrait photography",
    },
  ]

  teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Jane Doe",
      role: "Founder & Lead Photographer",
      bio: "Award-winning photographer with over 15 years of experience in portrait photography. Jane founded PORTRAIT with a vision to create timeless, artistic portraits that capture the essence of her subjects.",
      image: "/placeholder.svg?height=400&width=300",
      experience: 15,
      specialties: ["Portrait Photography", "Black & White", "Studio Lighting", "Family Portraits"],
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Senior Portrait Photographer",
      bio: "Specializing in corporate headshots and professional portraits, Michael brings a keen eye for detail and a passion for capturing authentic expressions in every shot.",
      image: "/placeholder.svg?height=400&width=300",
      experience: 8,
      specialties: [
        "Corporate Headshots",
        "Professional Portraits",
        "Environmental Portraits",
        "Executive Photography",
      ],
    },
    {
      id: 3,
      name: "Sarah Williams",
      role: "Creative Director & Photographer",
      bio: "With a background in fine arts, Sarah brings an artistic flair to portrait photography, creating unique and creative compositions that tell compelling stories.",
      image: "/placeholder.svg?height=400&width=300",
      experience: 10,
      specialties: ["Artistic Portraits", "Creative Composition", "Fine Art Photography", "Conceptual Portraits"],
    },
    {
      id: 4,
      name: "David Rodriguez",
      role: "Family Portrait Specialist",
      bio: "David excels at working with families and children, creating comfortable environments that result in natural, joyful portraits that families treasure for generations.",
      image: "/placeholder.svg?height=400&width=300",
      experience: 6,
      specialties: ["Family Portraits", "Children Photography", "Lifestyle Photography", "Outdoor Sessions"],
    },
  ]

  selectedTeamMember: TeamMember | null = null

  constructor() {}

  ngOnInit(): void {
    // Ensure arrays are initialized
    if (!this.statistics) this.statistics = []
    if (!this.companyValues) this.companyValues = []
    if (!this.teamMembers) this.teamMembers = []
  }

  selectTeamMember(member: TeamMember | null): void {
    if (!member) return
    this.selectedTeamMember = this.selectedTeamMember?.id === member.id ? null : member
  }

  trackByTeamMemberId(index: number, member: TeamMember): number {
    return member?.id || index
  }

  trackByValueIndex(index: number, value: CompanyValue): number {
    return index
  }

  trackByStatIndex(index: number, stat: Statistic): number {
    return index
  }

  scrollToContact(): void {
    try {
      const contactElement = document.getElementById("contact")
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: "smooth" })
      }
    } catch (error) {
      console.warn("Could not scroll to contact section:", error)
    }
  }
}
