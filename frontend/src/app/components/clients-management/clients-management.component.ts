import { CommonModule } from "@angular/common"
import { Component, Input, type OnInit } from "@angular/core"
import { FormsModule } from "@angular/forms"

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
  selector: "app-clients-management",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./clients-management.component.html",
  styleUrls: ["./clients-management.component.css"],
})
export class ClientsManagementComponent implements OnInit {
  @Input() clients: Client[] = []
  @Input() totalClients = 0
  @Input() activeClientsThisMonth = 0
  @Input() newClientsThisWeek = 0
  @Input() vipClients = 0

  clientSearchTerm = ""
  currentPage = 1
  itemsPerPage = 10
  totalPages = 1
  filteredClients: Client[] = []

  Math = Math

  ngOnInit(): void {
    this.filteredClients = [...this.clients]
    this.updatePagination()
  }

  filterClients(): void {
    if (!this.clientSearchTerm) {
      this.filteredClients = [...this.clients]
    } else {
      this.filteredClients = this.clients.filter(
        (client) =>
          client.name.toLowerCase().includes(this.clientSearchTerm.toLowerCase()) ||
          client.email.toLowerCase().includes(this.clientSearchTerm.toLowerCase()) ||
          client.phone.includes(this.clientSearchTerm),
      )
    }
    this.currentPage = 1
    this.updatePagination()
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredClients.length / this.itemsPerPage)
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++
    }
  }
}
