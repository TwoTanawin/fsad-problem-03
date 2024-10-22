import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';  // Base URL for your API

  constructor(private http: HttpClient) { }

  register(user: { username: string, email: string, password: string }): Observable<any> {
    const payload = {
      user: {
        username: user.username,
        email: user.email,
        password: user.password
      }
    };
    return this.http.post<any>(`${this.baseUrl}/signup`, payload);
  }

  // Define the login method
  login(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, userData);
  }

  // Method to get the logged-in user's info (username and email)
  getUserInfo(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.baseUrl}/user_info`, { headers });
  }
}
