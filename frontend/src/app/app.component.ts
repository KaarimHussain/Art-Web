import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { HeaderComponent } from "./components/header/header.component"
import { HeroComponent } from "./components/hero/hero.component"
import { AboutComponent } from "./components/about/about.component"
import { ContactComponent } from "./components/contact/contact.component"
import { FooterComponent } from "./components/footer/footer.component"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, HeaderComponent, HeroComponent, AboutComponent, ContactComponent, FooterComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Portrait E-commerce"

  scrollToSection(sectionId: string): void {
    try {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } catch (error) {
      console.warn("Could not scroll to section:", error)
    }
  }
}
