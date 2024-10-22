import { Component } from '@angular/core';
import { AuthService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private userProfileService: UserProfileService
  ) { }

  onSubmit() {
    const userData = {
      email: this.email,
      password: this.password
    };

    // Perform login
    this.authService.login(userData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);

        // Check the structure of the response to see if email is there
        console.log('Full response:', response);

        // Store token for authenticated requests
        localStorage.setItem('token', response.token);  

        // Check if the response contains the email, if not, log an error
        if (response.email) {
          this.checkUserProfile(response.token, response.email); // Pass both token and email
        } else if (response.user && response.user.email) {
          // In case the email is inside a user object
          this.checkUserProfile(response.token, response.user.email);
        } else {
          console.error('Email not found in login response.');
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Invalid email or password');
      }
    });
  }

  checkUserProfile(token: string, email: string) {
    this.userProfileService.getUserProfileByEmail(email, token).subscribe({
      next: (profile) => {
        console.log('Profile data:', profile); // Inspect the profile data
        if (profile) {
          // If profile exists, navigate to the /posts page
          this.router.navigate(['/posts']);
        } else {
          // If no profile exists, navigate to /create-profile
          this.router.navigate(['/create-profile']);
        }
      },
      error: (error) => {
        console.error('Error fetching user profile:', error); // Log error for debugging
        this.router.navigate(['/create-profile']);
      }
    });
  }  
}
