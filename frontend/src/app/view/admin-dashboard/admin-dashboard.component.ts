import { Component, type OnInit } from "@angular/core"
import { GalleryManagementComponent } from "../../components/gallery-management/gallery-management.component";
import { DashboardOverviewComponent } from "../../components/dashboard-overview/dashboard-overview.component";
import { AddPortraitFormComponent } from "../../components/add-portrait-form/add-portrait-form.component";
import { ClientsManagementComponent } from "../../components/clients-management/clients-management.component";
import { CommonModule } from "@angular/common";

interface RevenueData {
  month: string
  value: number
}

interface Activity {
  type: "booking" | "payment" | "gallery"
  title: string
  time: string
}

interface GalleryItem {
  id: number
  src: string
  title: string
  category: string
  status: "published" | "draft"
  date: string
}

interface Client {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  status: "active" | "inactive" | "vip"
  totalSessions: number
  joinedDate: Date
}

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"],
  standalone: true,
  imports: [GalleryManagementComponent, DashboardOverviewComponent, AddPortraitFormComponent, ClientsManagementComponent, CommonModule],
})
export class AdminDashboardComponent implements OnInit {
  activeTab = "dashboard"

  // Dashboard Stats
  totalRevenue = 125000
  activeBookings = 24
  pendingBookings = 8
  totalClients = 342
  galleryCount = 156

  // Client Stats
  activeClientsThisMonth = 28
  newClientsThisWeek = 5
  vipClients = 12

  // Chart Data
  revenueData: RevenueData[] = [
    { month: "Jan", value: 8500 },
    { month: "Feb", value: 12000 },
    { month: "Mar", value: 9800 },
    { month: "Apr", value: 15200 },
    { month: "May", value: 11400 },
    { month: "Jun", value: 18600 },
    { month: "Jul", value: 16800 },
    { month: "Aug", value: 21000 },
    { month: "Sep", value: 19200 },
    { month: "Oct", value: 23400 },
    { month: "Nov", value: 20800 },
    { month: "Dec", value: 25000 },
  ]

  // Recent Activities
  recentActivities: Activity[] = [
    {
      type: "booking",
      title: "New portrait session booked by Sarah Johnson",
      time: "2 minutes ago",
    },
    {
      type: "payment",
      title: "Payment received for family portrait package",
      time: "15 minutes ago",
    },
    {
      type: "gallery",
      title: "New portrait added to Professional collection",
      time: "1 hour ago",
    },
    {
      type: "booking",
      title: "Wedding portrait consultation scheduled",
      time: "2 hours ago",
    },
    {
      type: "payment",
      title: "Invoice sent for corporate headshots",
      time: "3 hours ago",
    },
  ]

  // Gallery Items
  galleryItems: GalleryItem[] = [
    {
      id: 1,
      src: "/placeholder.svg?height=400&width=300",
      title: "Professional Headshot",
      category: "Corporate",
      status: "published",
      date: "2024-01-15",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=400&width=300",
      title: "Family Portrait",
      category: "Family",
      status: "published",
      date: "2024-01-14",
    },
    {
      id: 3,
      src: "/placeholder.svg?height=400&width=300",
      title: "Artistic Portrait",
      category: "Creative",
      status: "draft",
      date: "2024-01-13",
    },
    {
      id: 4,
      src: "/placeholder.svg?height=400&width=300",
      title: "Wedding Portrait",
      category: "Wedding",
      status: "published",
      date: "2024-01-12",
    },
    {
      id: 5,
      src: "/placeholder.svg?height=400&width=300",
      title: "Senior Portrait",
      category: "Senior",
      status: "published",
      date: "2024-01-11",
    },
    {
      id: 6,
      src: "/placeholder.svg?height=400&width=300",
      title: "Maternity Portrait",
      category: "Maternity",
      status: "draft",
      date: "2024-01-10",
    },
    {
      id: 7,
      src: "/placeholder.svg?height=400&width=300",
      title: "Business Portrait",
      category: "Corporate",
      status: "published",
      date: "2024-01-09",
    },
    {
      id: 8,
      src: "/placeholder.svg?height=400&width=300",
      title: "Children Portrait",
      category: "Children",
      status: "published",
      date: "2024-01-08",
    },
  ]

  // Clients
  clients: Client[] = [
    {
      id: "CL001",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      avatar: "/placeholder.svg?height=48&width=48",
      status: "active",
      totalSessions: 8,
      joinedDate: new Date("2023-01-15"),
    },
    {
      id: "CL002",
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+1 (555) 234-5678",
      avatar: "/placeholder.svg?height=48&width=48",
      status: "vip",
      totalSessions: 15,
      joinedDate: new Date("2022-11-20"),
    },
    {
      id: "CL003",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      phone: "+1 (555) 345-6789",
      avatar: "/placeholder.svg?height=48&width=48",
      status: "active",
      totalSessions: 3,
      joinedDate: new Date("2024-01-08"),
    },
    {
      id: "CL004",
      name: "David Thompson",
      email: "david.thompson@email.com",
      phone: "+1 (555) 456-7890",
      avatar: "/placeholder.svg?height=48&width=48",
      status: "inactive",
      totalSessions: 12,
      joinedDate: new Date("2023-06-10"),
    },
    {
      id: "CL005",
      name: "Lisa Wang",
      email: "lisa.wang@email.com",
      phone: "+1 (555) 567-8901",
      avatar: "/placeholder.svg?height=48&width=48",
      status: "vip",
      totalSessions: 22,
      joinedDate: new Date("2022-08-03"),
    },
    {
      id: "CL006",
      name: "James Wilson",
      email: "james.wilson@email.com",
      phone: "+1 (555) 678-9012",
      avatar: "/placeholder.svg?height=48&width=48",
      status: "active",
      totalSessions: 6,
      joinedDate: new Date("2023-12-22"),
    },
    {
      id: "CL007",
      name: "Maria Garcia",
      email: "maria.garcia@email.com",
      phone: "+1 (555) 789-0123",
      avatar: "/placeholder.svg?height=48&width=48",
      status: "active",
      totalSessions: 4,
      joinedDate: new Date("2024-01-12"),
    },
    {
      id: "CL008",
      name: "Robert Kim",
      email: "robert.kim@email.com",
      phone: "+1 (555) 890-1234",
      avatar: "/placeholder.svg?height=48&width=48",
      status: "vip",
      totalSessions: 18,
      joinedDate: new Date("2022-12-15"),
    },
  ]

  ngOnInit(): void {
    // Component initialization
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab
  }

  onUploadNew(): void {
    this.setActiveTab("add-portrait")
  }

  onBackToGallery(): void {
    this.setActiveTab("gallery")
  }

  onSubmitPortrait(portraitData: any): void {
    // Simulate upload progress and add to gallery
    const newPortrait = {
      id: this.galleryItems.length + 1,
      src: "/placeholder.svg?height=400&width=300",
      title: portraitData.title,
      category: portraitData.typeOfArt,
      status: portraitData.status,
      date: new Date().toISOString().split("T")[0],
    }

    this.galleryItems.unshift(newPortrait)
    this.galleryCount = this.galleryItems.length
    this.setActiveTab("gallery")
  }
}
