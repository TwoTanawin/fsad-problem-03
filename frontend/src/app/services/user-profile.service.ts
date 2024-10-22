import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private apiUrl = 'http://localhost:3000/user_profiles';  // Update with your API endpoint

  constructor(private http: HttpClient) {}

  // Fetch user profile (assuming you need an authorization header with token)
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.apiUrl, { headers });
  }

  // Create user profile method
  createUserProfile(profileData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.apiUrl, profileData, { headers });
  }
}
