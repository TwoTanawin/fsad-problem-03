import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private apiUrl = 'http://localhost:3000/user_profiles';  // API endpoint for profiles
  private userInfoUrl = 'http://localhost:3000/user_info'; // API endpoint for user info
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Common method to get headers with token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Please log in first.');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Fetch user profile
  getUserProfile(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(this.apiUrl, { headers }).pipe(
      catchError(err => throwError(err))
    );
  }

  // Method to fetch user profile by email and token
  getUserProfileByEmail(email: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/user_profiles?email=${email}`, { headers }).pipe(
      catchError(err => throwError(err))
    );
  }

  // Fetch user info (username and email)
  getUserData(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(this.userInfoUrl, { headers }).pipe(
      catchError(err => throwError(err))
    );
  }

  // Create or update user profile
  createUserProfile(profileData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(this.apiUrl, profileData, { headers }).pipe(
      catchError(err => throwError(err))
    );
  }
}
