import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/api/v1/posts'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Helper function to get the authorization header
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Fetch all posts
  getPosts(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(this.apiUrl, { headers });
  }

  // Create a new post
  createPost(postData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    const body = { post: postData }; // Wrap the post data inside a 'post' object
    return this.http.post<any>(this.apiUrl, body, { headers });
  }

  // Update an existing post
  updatePost(postId: number, postData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    const body = { post: postData }; // Wrap the post data inside a 'post' object
    return this.http.put<any>(`${this.apiUrl}/${postId}`, body, { headers });
  }

  // Delete a post
  deletePost(postId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${postId}`, { headers });
  }
}

