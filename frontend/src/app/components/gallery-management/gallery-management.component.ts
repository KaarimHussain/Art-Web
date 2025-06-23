import { CommonModule } from "@angular/common"
import { Component, Input, Output, EventEmitter } from "@angular/core"
import { FormsModule } from "@angular/forms"

interface GalleryItem {
  id: number
  src: string
  title: string
  category: string
  status: "published" | "draft"
  date: string
}

@Component({
  selector: "app-gallery-management",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./gallery-management.component.html",
  styleUrls: ["./gallery-management.component.css"],
})
export class GalleryManagementComponent {
  @Input() galleryItems: GalleryItem[] = []
  @Output() uploadNew = new EventEmitter<void>()
}
