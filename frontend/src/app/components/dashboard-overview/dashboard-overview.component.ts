import { CommonModule } from "@angular/common"
import { Component, Input } from "@angular/core"
import { FormsModule } from "@angular/forms"

interface RevenueData {
  month: string
  value: number
}

interface Activity {
  type: "booking" | "payment" | "gallery"
  title: string
  time: string
}

@Component({
  selector: "app-dashboard-overview",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./dashboard-overview.component.html",
  styleUrls: ["./dashboard-overview.component.css"],
})
export class DashboardOverviewComponent {
  @Input() totalRevenue = 0
  @Input() activeBookings = 0
  @Input() pendingBookings = 0
  @Input() totalClients = 0
  @Input() galleryCount = 0
  @Input() revenueData: RevenueData[] = []
  @Input() recentActivities: Activity[] = []

  get maxRevenue(): number {
    return Math.max(...this.revenueData.map((d) => d.value))
  }
}
