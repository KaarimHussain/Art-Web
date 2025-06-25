import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable } from "rxjs"
import { tap } from "rxjs/operators"
import type LoginResponse from "../dtos/loginResponse"
import type SignupModel from "../models/Signup"
import { jwtDecode } from "jwt-decode"
import { LoginCredentials } from "../models/Login";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:5263/api"
  private authStateSubject = new BehaviorSubject<boolean>(this.hasValidToken())
  public authState$ = this.authStateSubject.asObservable()

  constructor(private http: HttpClient) {
    // Check token validity on service initialization
    this.checkTokenValidity()
  }

  private hasValidToken(): boolean {
    const token = localStorage.getItem("jwt")
    if (!token) return false

    try {
      // Basic token validation - you might want to add expiration check
      const payload = JSON.parse(atob(token.split(".")[1]))
      const currentTime = Math.floor(Date.now() / 1000)

      // Check if token is expired
      if (payload.exp && payload.exp < currentTime) {
        this.removeToken()
        return false
      }

      return true
    } catch (error) {
      console.error("Invalid token format:", error)
      this.removeToken()
      return false
    }
  }

  private checkTokenValidity(): void {
    const isValid = this.hasValidToken()
    this.authStateSubject.next(isValid)
  }

  private removeToken(): void {
    localStorage.removeItem("jwt")
  }

  login(login: LoginCredentials): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, login).pipe(
      tap((response: any) => {
        if (response.success && response.token) {
          localStorage.setItem("jwt", response.token)
          this.authStateSubject.next(true)
        }
      }),
    )
  }

  signup(signup: SignupModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup`, signup).pipe(
      tap((response: any) => {
        if (response.success && response.token) {
          localStorage.setItem("jwt", response.token)
          this.authStateSubject.next(true)
        }
      }),
    )
  }

  checkIfAdmin() {
    const token = this.getToken()
    if (!token) return false

    try {
      const payload: any = jwtDecode(token)
      console.log(payload);


      return payload.role === "Admin"
    } catch (error) {
      console.error("Error decoding token:", error)
      return false
    }
  }

  logout(): void {
    this.removeToken()
    this.authStateSubject.next(false)
    console.log("User logged out successfully")
  }

  isAuthenticated(): boolean {
    return this.authStateSubject.value
  }

  getToken(): string | null {
    return localStorage.getItem("jwt")
  }

  // Get user info from token using jwt-decode

  getUserInfo(): any {
    const token = this.getToken()
    if (!token) return null

    try {
      const payload: any = jwtDecode(token)
      console.log(payload);

      return {
        name: payload.name,
        email: payload.email,
        role: payload.role,
      }
    } catch (error) {
      console.error("Error decoding token:", error)
      return null
    }
  }
  updateAuthState(): void {
    const isAuthenticated = this.hasValidToken()
    this.authStateSubject.next(isAuthenticated)
    console.log("Auth state manually updated:", isAuthenticated)
  }
}
