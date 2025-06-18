import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { HomeComponent } from "./view/home/home.component"
import { UserDashboardComponent } from "./view/user-dashboard/user-dashboard.component";
import { ArtworkListingComponent } from "./view/artwork-listing/artwork-listing.component";


@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, HomeComponent, UserDashboardComponent, ArtworkListingComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Portrait E-commerce"
}
