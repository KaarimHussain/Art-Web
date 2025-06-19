import { Component, type OnInit } from "@angular/core"

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  teamMembers = [
    {
      name: "Alexandra Chen",
      role: "Lead Portrait Artist",
      bio: "With over 12 years of experience, Alexandra specializes in capturing the soul behind every portrait.",
      image: "/api/placeholder/300/400",
      specialties: ["Portrait Photography", "Studio Lighting", "Creative Direction"],
      social: {
        instagram: "https://instagram.com/alexandra_portraits",
        linkedin: "https://linkedin.com/in/alexandra-chen",
        behance: "https://behance.net/alexandra_chen",
      },
    },
    {
      name: "Marcus Rodriguez",
      role: "Creative Director",
      bio: "Marcus brings artistic vision and technical expertise to every project, ensuring stunning results.",
      image: "/api/placeholder/300/400",
      specialties: ["Art Direction", "Post-Processing", "Concept Development"],
      social: {
        instagram: "https://instagram.com/marcus_creative",
        linkedin: "https://linkedin.com/in/marcus-rodriguez",
        behance: "https://behance.net/marcus_rodriguez",
      },
    },
    {
      name: "Sarah Williams",
      role: "Senior Photographer",
      bio: "Sarah's keen eye for detail and natural lighting creates breathtaking environmental portraits.",
      image: "/api/placeholder/300/400",
      specialties: ["Natural Light", "Environmental Portraits", "Family Photography"],
      social: {
        instagram: "https://instagram.com/sarah_captures",
        linkedin: "https://linkedin.com/in/sarah-williams",
        behance: "https://behance.net/sarah_williams",
      },
    },
  ]

  milestones = [
    {
      year: "2009",
      title: "Studio Founded",
      description: "Started our journey with a small studio and big dreams to revolutionize portrait photography.",
      achievements: ["First Studio", "100 Clients", "Local Recognition"],
      image: "/api/placeholder/400/300",
    },
    {
      year: "2012",
      title: "Award Recognition",
      description: "Received our first major photography award, establishing our reputation in the industry.",
      achievements: ["Photography Award", "1K Clients", "Team Expansion"],
      image: "/api/placeholder/400/300",
    },
    {
      year: "2016",
      title: "Digital Innovation",
      description: "Launched our online platform, making professional portraits accessible to everyone.",
      achievements: ["Online Platform", "5K Clients", "Digital Collections"],
      image: "/api/placeholder/400/300",
    },
    {
      year: "2020",
      title: "Global Reach",
      description: "Expanded internationally, bringing our unique portrait style to clients worldwide.",
      achievements: ["Global Expansion", "10K Clients", "International Awards"],
      image: "/api/placeholder/400/300",
    },
  ]

  awards = [
    {
      title: "Portrait Photographer of the Year",
      organization: "International Photography Awards",
      year: "2023",
      icon: "fas fa-trophy",
    },
    {
      title: "Excellence in Creative Photography",
      organization: "Creative Arts Society",
      year: "2022",
      icon: "fas fa-medal",
    },
    {
      title: "Best Studio Photography",
      organization: "Professional Photographers Guild",
      year: "2021",
      icon: "fas fa-award",
    },
    {
      title: "Innovation in Digital Art",
      organization: "Digital Arts Foundation",
      year: "2020",
      icon: "fas fa-star",
    },
  ]

  constructor() { }

  ngOnInit(): void {
    // Initialize component
  }
}
