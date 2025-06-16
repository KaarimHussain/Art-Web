import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { HomeComponent } from "./view/home/home.component"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule,HomeComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Portrait E-commerce"
}
