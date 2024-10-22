import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/api/v1/posts';  // API endpoint for posts
  private baseUrl = 'http://localhost:3000';  // Base API URL

  constructor(private http: HttpClient) {}

  // Common method to get headers with token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Please log in first.');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Fetch all posts
  getAllPosts(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(this.apiUrl, { headers }).pipe(
      catchError(err => throwError(err))
    );
  }

  // Create a new post with optional caption and image
  createPost(postData: any): Observable<any> {
    const headers = this.getAuthHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.apiUrl, postData, { headers }).pipe(
      catchError(err => throwError(err))
    );
  }

  // Update an existing post
  updatePost(postId: string, postData: any): Observable<any> {
    const headers = this.getAuthHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.apiUrl}/${postId}`, postData, { headers }).pipe(
      catchError(err => throwError(err))
    );
  }

  // Delete a post by ID
  deletePost(postId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${postId}`, { headers }).pipe(
      catchError(err => throwError(err))
    );
  }

  // Fetch a single post by ID
  getPostById(postId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/${postId}`, { headers }).pipe(
      catchError(err => throwError(err))
    );
  }
}
