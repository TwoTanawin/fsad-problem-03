import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/signup';  // Your Rails backend signup endpoint

  constructor(private http: HttpClient) { }

  register(user: { username: string, email: string, password: string }): Observable<any> {
    const payload = {
      user: {
        username: user.username,
        email: user.email,
        password: user.password
      }
    };
  
    return this.http.post<any>(this.baseUrl, payload);
  }  
}
