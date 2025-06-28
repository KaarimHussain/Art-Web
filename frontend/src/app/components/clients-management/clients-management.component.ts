import { CommonModule } from "@angular/common"
import { Component, type OnInit } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { UserService } from "../../services/user.service"
import { tap } from "rxjs"
import { NotificationService } from "../../services/notification.service"

interface Client {
  id: number
  username: string
  email: string
  phoneNumber: string
  createdAt: Date
}

interface ValidationErrors {
  username: string[]
  phoneNumber: string[]
}

@Component({
  selector: "app-clients-management",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./clients-management.component.html",
  styleUrls: ["./clients-management.component.css"],
})
export class ClientsManagementComponent implements OnInit {
  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
  ) { }

  clients: Client[] = []
  totalClients = 0
  newClientsThisMonth = 0

  clientSearchTerm = ""
  currentPage = 1
  itemsPerPage = 10
  totalPages = 1
  filteredClients: Client[] = []

  Math = Math

  // Flags
  isDeletingLoading = false
  isEditModalOpen = false
  isUpdatingLoading = false

  // Edit client data
  selectedClient: Client | null = null
  editClientForm = {
    id: 0,
    username: "",
    email: "",
    phoneNumber: "",
  }

  // Validation
  validationErrors: ValidationErrors = {
    username: [],
    phoneNumber: [],
  }

  ngOnInit(): void {
    this.fetchUsers()
  }

  filterClients(): void {
    if (!this.clientSearchTerm) {
      this.filteredClients = [...this.clients]
    } else {
      this.filteredClients = this.clients.filter(
        (client) =>
          client.username.toLowerCase().includes(this.clientSearchTerm.toLowerCase()) ||
          client.email.toLowerCase().includes(this.clientSearchTerm.toLowerCase()) ||
          client.phoneNumber.includes(this.clientSearchTerm),
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

  fetchUsers() {
    this.userService
      .getAllUsers()
      .pipe(
        tap((response: any[]) => {
          this.clients = response.map((user) => ({
            ...user,
            createdAt: new Date(user.createdAt),
          }))

          this.totalClients = this.clients.length
          this.newClientsThisMonth = this.countClientsJoinedThisMonth()

          this.filterClients() // ✅ call after setting clients
        }),
      )
      .subscribe({
        error: (err) => {
          this.notificationService.error(`Failed to Fetch users`, err, 5)
        },
      })
  }

  countClientsJoinedThisMonth(): number {
    const now = new Date()
    return this.clients.filter((client) => {
      const joined = new Date(client.createdAt)
      return joined.getFullYear() === now.getFullYear() && joined.getMonth() === now.getMonth()
    }).length
  }

  deleteClient(id: number) {
    if (!confirm("Are you sure you want to delete this client?")) return
    this.isDeletingLoading = true
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.notificationService.success("User deleted successfully!", `${id}`)

        // Remove from local arrays
        this.clients = this.clients.filter((client) => client.id !== id)
        this.filterClients() // Refresh filtered list
        this.isDeletingLoading = false
      },
      error: (err) => {
        this.notificationService.error("Failed to delete user", err.message, 5)
        this.isDeletingLoading = false
      },
    })
  }

  // Validation methods
  validateUsername(username: string): string[] {
    const errors: string[] = []

    if (!username || username.trim().length === 0) {
      errors.push("Username is required")
    } else {
      if (username.length < 3) {
        errors.push("Username must be at least 3 characters long")
      }
      if (username.length > 50) {
        errors.push("Username must be less than 50 characters")
      }
      if (!/^[a-zA-Z0-9 _-]+$/.test(username)) {
        errors.push("Username can only contain letters, numbers, hyphens, and underscores")
      }
      if (/^\d+$/.test(username)) {
        errors.push("Username cannot be only numbers")
      }
    }

    return errors
  }

  validatePhoneNumber(phoneNumber: string): string[] {
    const errors: string[] = []

    if (!phoneNumber || phoneNumber.trim().length === 0) {
      errors.push("Phone number is required")
    } else {
      // Remove all non-digit characters for validation
      const digitsOnly = phoneNumber.replace(/\D/g, "")

      if (digitsOnly.length < 11) {
        errors.push("Phone number must be at least 11 digits")
      }
      if (digitsOnly.length > 15) {
        errors.push("Phone number must be less than 15 digits")
      }

      // Allow common phone number formats
      const phoneRegex = /^[+]?[1-9][\d]{0,15}$|^[+]?[(]?[\d\s\-()]{10,}$/
      if (!phoneRegex.test(phoneNumber.replace(/\s/g, ""))) {
        errors.push("Please enter a valid phone number")
      }
    }

    return errors
  }

  validateForm(): boolean {
    this.validationErrors = {
      username: this.validateUsername(this.editClientForm.username),
      phoneNumber: this.validatePhoneNumber(this.editClientForm.phoneNumber),
    }

    return this.validationErrors.username.length === 0 && this.validationErrors.phoneNumber.length === 0
  }

  onFieldChange(fieldName: keyof ValidationErrors): void {
    // Clear errors for the specific field when user starts typing
    this.validationErrors[fieldName] = []
  }

  // Edit client methods
  openEditModal(client: Client): void {
    this.selectedClient = client
    this.editClientForm = {
      id: client.id,
      username: client.username,
      email: client.email,
      phoneNumber: client.phoneNumber,
    }
    // Clear validation errors when opening modal
    this.validationErrors = {
      username: [],
      phoneNumber: [],
    }
    this.isEditModalOpen = true
  }

  closeEditModal(): void {
    this.isEditModalOpen = false
    this.selectedClient = null
    this.editClientForm = {
      id: 0,
      username: "",
      email: "",
      phoneNumber: "",
    }
    // Clear validation errors when closing modal
    this.validationErrors = {
      username: [],
      phoneNumber: [],
    }
  }

  updateClient(): void {
    // Validate form before submission
    if (!this.validateForm()) {
      this.notificationService.error("Please fix the validation errors before submitting", "", 4)
      return
    }

    this.isUpdatingLoading = true

    const updateData = {
      id: this.editClientForm.id,
      username: this.editClientForm.username.trim(),
      email: this.editClientForm.email,
      phoneNumber: this.editClientForm.phoneNumber.trim(),
    }

    console.info("Updating client with data:", updateData)

    this.userService.updateUser(updateData.id, updateData).subscribe({
      next: (response) => {
        this.notificationService.success("Client updated successfully!", "", 3)

        // Update the client in the local array
        const clientIndex = this.clients.findIndex((c) => c.id === updateData.id)
        if (clientIndex !== -1) {
          this.clients[clientIndex] = {
            ...this.clients[clientIndex],
            username: updateData.username,
            email: updateData.email,
            phoneNumber: updateData.phoneNumber,
          }
          this.filterClients() // Refresh filtered list
        }

        this.closeEditModal()
        this.isUpdatingLoading = false
      },
      error: (err) => {
        this.notificationService.error("Failed to update client", err.message, 5)
        this.isUpdatingLoading = false
      },
    })
  }

  // Helper method to check if a field has errors
  hasFieldError(fieldName: keyof ValidationErrors): boolean {
    return this.validationErrors[fieldName].length > 0
  }

  // Helper method to get field error class
  getFieldErrorClass(fieldName: keyof ValidationErrors): string {
    return this.hasFieldError(fieldName)
      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
      : "border-slate-600/50 focus:ring-amber-500 focus:border-transparent"
  }
}
