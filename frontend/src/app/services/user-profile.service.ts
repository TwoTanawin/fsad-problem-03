import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private apiUrl = 'http://localhost:3000/user_profiles';  // API endpoint for profiles
  private userInfoUrl = 'http://localhost:3000/user_info'; // API endpoint for user info

  constructor(private http: HttpClient) {}

  // Fetch user profile
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.apiUrl, { headers });
  }

  // Fetch user info (username and email)
  getUserData(): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      return throwError('No token found. Please log in first.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get(this.userInfoUrl, { headers });  // Ensure userInfoUrl points to your /user_info endpoint
  }

  

  // Create or update user profile
  createUserProfile(profileData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.apiUrl, profileData, { headers });
  }
}
