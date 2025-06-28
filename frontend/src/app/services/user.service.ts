import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import type { Observable } from "rxjs"
import type { User } from "../view/user-dashboard/user-dashboard.component"

@Injectable({
    providedIn: "root",
})
export class UserService {
    private apiUrl = "http://localhost:5263"

    constructor(private http: HttpClient) { }

    getAllUsers(): Observable<any> {
        return this.http.get<[]>(`${this.apiUrl}/api/user`)
    }

    deleteUser(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/api/user/${id}`)
    }

    addUser(user: User): Observable<any> {
        return this.http.post(`${this.apiUrl}/api/user`, user)
    }

    updateUser(id: number, user: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/api/user/${id}`, user)
    }
}
