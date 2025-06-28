import { Component, type OnInit } from "@angular/core"
import { GalleryManagementComponent } from "../../components/gallery-management/gallery-management.component";
import { DashboardOverviewComponent } from "../../components/dashboard-overview/dashboard-overview.component";
import { AddPortraitFormComponent } from "../../components/add-portrait-form/add-portrait-form.component";
import { ClientsManagementComponent } from "../../components/clients-management/clients-management.component";
import { CommonModule } from "@angular/common";
import { ProductService } from "../../services/product.service";

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
  createdAt: Date
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
  galleryItems: GalleryItem[] = []


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe((products) => {
      this.galleryItems = products.map(p => ({
        id: p.id,
        src: p.featuredImage,
        title: p.title,
        category: p.category,
        status: p.isAvailable ? "published" : "draft",
        date: p.createdAt
      }));
      this.galleryCount = this.galleryItems.length;
    });
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
