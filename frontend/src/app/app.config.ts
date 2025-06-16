import { type ApplicationConfig, importProvidersFrom } from "@angular/core"
import { provideRouter } from "@angular/router"
import { ReactiveFormsModule, FormsModule } from "@angular/forms"
import { BrowserModule } from "@angular/platform-browser"

import { routes } from "./app.routes"

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(BrowserModule, ReactiveFormsModule, FormsModule)],
}
