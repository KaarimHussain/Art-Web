import { CommonModule } from "@angular/common"
import { Component, Output, EventEmitter, type OnInit } from "@angular/core"
import { FormsModule } from "@angular/forms"

interface PortraitForm {
  title: string
  typeOfArt: string
  sizes: string
  shipsInTube: boolean
  price: number
  shippingIncluded: boolean
  satisfactionGuarantee: number
  description: string
  yearCreated: number
  subject: string
  styles: string[]
  mediums: string[]
  rarity: string
  size: string
  readyToHang: boolean
  frame: string
  authenticity: string
  packaging: string
  deliveryCost: number
  deliveryTime: string
  returns: string
  handling: string
  shipsFrom: string
  customs: string
  rating: number
  likes: number
  views: number
  status: "draft" | "published"
}

@Component({
  selector: "app-add-portrait-form",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./add-portrait-form.component.html",
  styleUrls: ["./add-portrait-form.component.css"],
})
export class AddPortraitFormComponent implements OnInit {
  @Output() backToGallery = new EventEmitter<void>()
  @Output() submitPortrait = new EventEmitter<PortraitForm>()

  selectedFile: File | null = null
  previewUrl: string | null = null
  uploadProgress = 0
  currentYear = new Date().getFullYear()

  portraitForm: PortraitForm = {
    title: "",
    typeOfArt: "",
    sizes: "",
    shipsInTube: false,
    price: 0,
    shippingIncluded: false,
    satisfactionGuarantee: 30,
    description: "",
    yearCreated: 0,
    subject: "",
    styles: [],
    mediums: [],
    rarity: "",
    size: "",
    readyToHang: false,
    frame: "",
    authenticity: "",
    packaging: "",
    deliveryCost: 0,
    deliveryTime: "",
    returns: "",
    handling: "",
    shipsFrom: "",
    customs: "",
    rating: 0,
    likes: 0,
    views: 0,
    status: "draft",
  }

  artTypes = [
    "Painting",
    "Photography",
    "Sculpture",
    "Drawing",
    "Print",
    "Mixed Media",
    "Digital Art",
    "Collage",
    "Textile Art",
    "Ceramic",
    "Glass Art",
  ]

  artSubjects = [
    "Abstract",
    "Portrait",
    "Landscape",
    "Still Life",
    "Nature",
    "Animals",
    "Architecture",
    "People",
    "Fantasy",
    "Religious",
    "Historical",
  ]

  artStyles = [
    "Abstract",
    "Realism",
    "Impressionism",
    "Modern",
    "Contemporary",
    "Pop Art",
    "Minimalism",
    "Expressionism",
    "Surrealism",
    "Cubism",
  ]

  artMediums = [
    "Oil on Canvas",
    "Acrylic on Canvas",
    "Watercolor",
    "Charcoal",
    "Pencil",
    "Digital",
    "Mixed Media",
    "Ink",
    "Pastel",
    "Gouache",
  ]

  rarityOptions = ["Original", "Limited Edition", "Open Edition", "Artist Proof", "Unique"]
  frameOptions = ["Unframed", "Black Frame", "White Frame", "Natural Wood", "Gold Frame", "Custom Frame"]
  authenticityOptions = [
    "Certificate of Authenticity",
    "Artist Signature",
    "Gallery Certificate",
    "Provenance Documentation",
  ]
  packagingOptions = ["Standard Packaging", "Premium Packaging", "Museum Quality", "Custom Crating"]

  ngOnInit(): void {
    this.portraitForm.yearCreated = this.currentYear
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0]
    if (file) {
      this.handleFile(file)
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault()
  }

  onDrop(event: DragEvent): void {
    event.preventDefault()
    const files = event.dataTransfer?.files
    if (files && files.length > 0) {
      this.handleFile(files[0])
    }
  }

  handleFile(file: File): void {
    if (file.type.startsWith("image/")) {
      this.selectedFile = file
      const reader = new FileReader()
      reader.onload = (e) => {
        this.previewUrl = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  removeFile(): void {
    this.selectedFile = null
    this.previewUrl = null
    this.uploadProgress = 0
  }

  onSubmitPortrait(): void {
    if (this.selectedFile && this.portraitForm.title && this.portraitForm.typeOfArt) {
      this.submitPortrait.emit(this.portraitForm)
    }
  }

  resetForm(): void {
    this.portraitForm = {
      title: "",
      typeOfArt: "",
      sizes: "",
      shipsInTube: false,
      price: 0,
      shippingIncluded: false,
      satisfactionGuarantee: 30,
      description: "",
      yearCreated: this.currentYear,
      subject: "",
      styles: [],
      mediums: [],
      rarity: "",
      size: "",
      readyToHang: false,
      frame: "",
      authenticity: "",
      packaging: "",
      deliveryCost: 0,
      deliveryTime: "",
      returns: "",
      handling: "",
      shipsFrom: "",
      customs: "",
      rating: 0,
      likes: 0,
      views: 0,
      status: "draft",
    }
    this.removeFile()
  }

  toggleArrayItem(array: string[], item: string): void {
    const index = array.indexOf(item)
    if (index > -1) {
      array.splice(index, 1)
    } else {
      array.push(item)
    }
  }

  previewArtwork(): void {
    console.log("Preview artwork:", this.portraitForm)
  }
}
