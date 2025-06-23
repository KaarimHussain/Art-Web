import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink, RouterModule } from "@angular/router"
import type CartItem from "../../models/CartItems"

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
