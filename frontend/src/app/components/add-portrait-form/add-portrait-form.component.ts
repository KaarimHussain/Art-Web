import { CommonModule } from "@angular/common"
import { Component, Output, EventEmitter, type OnInit } from "@angular/core"
import { FormsModule } from "@angular/forms"
import type { ProductImage } from "../../models/ProductImage"
import type { Tag } from "../../models/Tag"
import { ProductService } from '../../services/product.service';

interface ProductForm {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  isAvailable: boolean;
  quantityAvailable: number;
  medium: string;
  surface: string;
  style: string;
  widthInInches: number;
  heightInInches: number;
  depthInInches: number;
  isFramed: boolean;
  isSigned: boolean;
  yearCreated: string;
  featuredImage: string;
  images: ProductImage[];
  tags: Tag[];
  category: string;
  shippingWeightKg: number;
  shippingFromCountry: string;
  isSold: boolean;
  isFeatured: boolean;
  createdAt?: string;
}

@Component({
  selector: "app-add-portrait-form",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./add-portrait-form.component.html",
  styleUrls: ["./add-portrait-form.component.css"],
})
export class AddPortraitFormComponent {
  // @Output() backToGallery = new EventEmitter<void>()
  // @Output() submitPortrait = new EventEmitter<{ form: ProductForm; featuredImage: File; additionalImages: File[] }>()

  // // Featured Image
  // featuredImageFile: File | null = null
  // featuredImagePreview: string | null = null

  // // Additional Images
  // additionalImageFiles: File[] = []
  // additionalImagePreviews: string[] = []

  // // Form and UI state
  // uploadProgress = 0
  // currentYear = new Date().getFullYear()
  // tagsInput = ""

  // productForm: ProductForm = {
  //   id: 0,
  //   title: "",
  //   slug: "",
  //   description: "",
  //   price: 0,
  //   originalPrice: undefined,
  //   isAvailable: true,
  //   quantityAvailable: 1,
  //   medium: "",
  //   surface: "",
  //   style: "",
  //   widthInInches: 0,
  //   heightInInches: 0,
  //   depthInInches: 0,
  //   isFramed: false,
  //   isSigned: false,
  //   yearCreated: this.currentYear.toString(),
  //   featuredImage: "",
  //   images: [],
  //   tags: [],
  //   category: "",
  //   shippingWeightKg: 0,
  //   shippingFromCountry: "",
  //   isSold: false,
  //   isFeatured: false,
  //   createdAt: Date.now().toString()
  // }

  // // Dropdown options
  // artCategories = [
  //   "painting",
  //   "drawing",
  //   "sculpture",
  //   "photography",
  //   "digital-art",
  //   "mixed-media",
  //   "printmaking",
  //   "textile",
  // ]

  // countries = [
  //   { code: "US", name: "United States" },
  //   { code: "CA", name: "Canada" },
  //   { code: "UK", name: "United Kingdom" },
  //   { code: "DE", name: "Germany" },
  //   { code: "FR", name: "France" },
  //   { code: "IT", name: "Italy" },
  //   { code: "ES", name: "Spain" },
  //   { code: "AU", name: "Australia" },
  //   { code: "JP", name: "Japan" },
  //   { code: "PK", name: "Pakistan" },
  //   { code: "IN", name: "India" },
  //   { code: "CN", name: "China" },
  //   { code: "BR", name: "Brazil" },
  //   { code: "MX", name: "Mexico" },
  //   { code: "OTHER", name: "Other" },
  // ]

  // constructor(private productService: ProductService) { }

  // ngOnInit(): void {
  //   this.productForm.yearCreated = this.currentYear.toString()
  //   this.productForm.shippingFromCountry = "PK" // Default to Pakistan as mentioned in original
  // }

  // // Featured Image Handling
  // onFeaturedImageSelect(event: any): void {
  //   const file = event.target.files[0]
  //   if (file) {
  //     this.handleFeaturedImage(file)
  //   }
  // }

  // onDropFeatured(event: DragEvent): void {
  //   event.preventDefault()
  //   const files = event.dataTransfer?.files
  //   if (files && files.length > 0) {
  //     this.handleFeaturedImage(files[0])
  //   }
  // }

  // handleFeaturedImage(file: File): void {
  //   if (file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024) {
  //     // 10MB limit
  //     this.featuredImageFile = file
  //     const reader = new FileReader()
  //     reader.onload = (e) => {
  //       this.featuredImagePreview = e.target?.result as string
  //     }
  //     reader.readAsDataURL(file)
  //   } else {
  //     alert("Please select a valid image file under 10MB.")
  //   }
  // }

  // removeFeaturedImage(): void {
  //   this.featuredImageFile = null
  //   this.featuredImagePreview = null
  // }

  // // Additional Images Handling
  // onAdditionalImagesSelect(event: any): void {
  //   const files = Array.from(event.target.files) as File[]
  //   this.handleAdditionalImages(files)
  // }

  // handleAdditionalImages(files: File[]): void {
  //   files.forEach((file) => {
  //     if (file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024) {
  //       this.additionalImageFiles.push(file)

  //       const reader = new FileReader()
  //       reader.onload = (e) => {
  //         this.additionalImagePreviews.push(e.target?.result as string)
  //       }
  //       reader.readAsDataURL(file)
  //     }
  //   })
  // }

  // removeAdditionalImage(index: number): void {
  //   this.additionalImageFiles.splice(index, 1)
  //   this.additionalImagePreviews.splice(index, 1)
  // }

  // // General drag and drop
  // onDragOver(event: DragEvent): void {
  //   event.preventDefault()
  // }

  // // Slug generation
  // generateSlug(): void {
  //   if (this.productForm.title) {
  //     this.productForm.slug = this.productForm.title
  //       .toLowerCase()
  //       .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
  //       .replace(/\s+/g, "-") // Replace spaces with hyphens
  //       .replace(/-+/g, "-") // Replace multiple hyphens with single
  //       .trim()
  //   }
  // }

  // // Watch title changes to auto-generate slug
  // onTitleChange(): void {
  //   // Add a small delay to prevent conflicts with other form operations
  //   setTimeout(() => {
  //     this.generateSlug()
  //   }, 0)
  // }

  // // Tag Management
  // addTag(event?: KeyboardEvent): void {
  //   // Prevent form submission when Enter is pressed
  //   if (event) {
  //     event.preventDefault()
  //     event.stopPropagation()
  //   }

  //   const tagName = this.tagsInput.trim()
  //   if (tagName && !this.productForm.tags.some((tag) => tag.name === tagName)) {
  //     const newTag: Tag = {
  //       id: Date.now(), // Temporary ID, should be handled by backend
  //       name: tagName,
  //     }
  //     this.productForm.tags.push(newTag)
  //     this.tagsInput = ""
  //   }
  // }

  // removeTag(index: number): void {
  //   this.productForm.tags.splice(index, 1)
  // }

  // // Form Validation
  // isFormValid(): boolean {
  //   return !!(
  //     this.productForm.title &&
  //     this.productForm.slug &&
  //     this.productForm.description &&
  //     this.productForm.category &&
  //     this.productForm.price > 0 &&
  //     this.productForm.quantityAvailable > 0 &&
  //     this.productForm.medium &&
  //     this.productForm.surface &&
  //     this.productForm.style &&
  //     this.productForm.widthInInches > 0 &&
  //     this.productForm.heightInInches > 0 &&
  //     this.productForm.yearCreated &&
  //     this.productForm.shippingWeightKg >= 0 &&
  //     this.productForm.shippingFromCountry &&
  //     this.featuredImageFile
  //   )
  // }

  // // Form Submission
  // onSubmitPortrait(): void {
  //   if (!this.isFormValid() || !this.featuredImageFile) {
  //     alert('Please fill all required fields and upload a featured image.');
  //     return;
  //   }
  //   this.productService.create(this.productForm, this.featuredImageFile, this.additionalImageFiles).subscribe({
  //     next: (res) => {
  //       alert('Portrait added successfully!');
  //       this.resetForm();
  //       this.backToGallery.emit();
  //     },
  //     error: (err) => {
  //       alert('Failed to add portrait.');
  //     }
  //   });
  // }

  // // Form Reset
  // resetForm(): void {
  //   this.productForm = {
  //     id: 0,
  //     title: "",
  //     slug: "",
  //     description: "",
  //     price: 0,
  //     originalPrice: undefined,
  //     isAvailable: true,
  //     quantityAvailable: 1,
  //     medium: "",
  //     surface: "",
  //     style: "",
  //     widthInInches: 0,
  //     heightInInches: 0,
  //     depthInInches: 0,
  //     isFramed: false,
  //     isSigned: false,
  //     yearCreated: this.currentYear.toString(),
  //     featuredImage: "",
  //     images: [],
  //     tags: [],
  //     category: "",
  //     shippingWeightKg: 0,
  //     shippingFromCountry: "PK",
  //     isSold: false,
  //     isFeatured: false,
  //   }

  //   // Reset images
  //   this.removeFeaturedImage()
  //   this.additionalImageFiles = []
  //   this.additionalImagePreviews = []
  //   this.tagsInput = ""
  //   this.uploadProgress = 0
  // }

  // // Preview Functionality
  // previewArtwork(): void {
  //   if (this.isFormValid()) {
  //     console.log("Preview artwork:", {
  //       form: this.productForm,
  //       featuredImage: this.featuredImageFile,
  //       additionalImages: this.additionalImageFiles,
  //     })

  //     // You could open a modal or navigate to a preview page here
  //     alert("Preview functionality - check console for details")
  //   } else {
  //     alert("Please complete the form before previewing.")
  //   }
  // }

  // // Utility Methods
  // formatFileSize(bytes: number): string {
  //   if (bytes === 0) return "0 Bytes"
  //   const k = 1024
  //   const sizes = ["Bytes", "KB", "MB", "GB"]
  //   const i = Math.floor(Math.log(bytes) / Math.log(k))
  //   return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  // }

  // // Calculate discount percentage
  // getDiscountPercentage(): number {
  //   if (
  //     this.productForm.originalPrice &&
  //     this.productForm.price &&
  //     this.productForm.originalPrice > this.productForm.price
  //   ) {
  //     return Math.round(
  //       ((this.productForm.originalPrice - this.productForm.price) / this.productForm.originalPrice) * 100,
  //     )
  //   }
  //   return 0
  // }

  // // Validate price fields
  // onPriceChange(): void {
  //   if (this.productForm.originalPrice && this.productForm.originalPrice <= this.productForm.price) {
  //     this.productForm.originalPrice = undefined
  //   }
  // }

  // // Auto-calculate shipping weight based on dimensions (optional helper)
  // calculateEstimatedWeight(): void {
  //   if (this.productForm.widthInInches && this.productForm.heightInInches) {
  //     // Simple estimation: larger artworks typically weigh more
  //     const area = this.productForm.widthInInches * this.productForm.heightInInches
  //     let estimatedWeight = 0

  //     if (this.productForm.medium.toLowerCase().includes("canvas")) {
  //       estimatedWeight = (area / 144) * 0.5 // Rough estimate for canvas
  //     } else if (this.productForm.medium.toLowerCase().includes("paper")) {
  //       estimatedWeight = (area / 144) * 0.1 // Lighter for paper
  //     } else {
  //       estimatedWeight = (area / 144) * 0.3 // Default estimate
  //     }

  //     // Add frame weight if framed
  //     if (this.productForm.isFramed) {
  //       estimatedWeight += 1 // Add 1kg for frame
  //     }

  //     // Only set if current weight is 0 (don't override user input)
  //     if (this.productForm.shippingWeightKg === 0) {
  //       this.productForm.shippingWeightKg = Math.max(0.1, Math.round(estimatedWeight * 10) / 10)
  //     }
  //   }
  // }

  // // Trigger weight calculation when dimensions change
  // onDimensionsChange(): void {
  //   this.calculateEstimatedWeight()
  // }

  // onTagInputKeydown(event: KeyboardEvent): void {
  //   if (event.key === "Enter") {
  //     event.preventDefault()
  //     event.stopPropagation()
  //     this.addTag(event)
  //   }
  // }
}
