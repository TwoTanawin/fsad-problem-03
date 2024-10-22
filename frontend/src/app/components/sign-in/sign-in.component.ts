import { Component } from '@angular/core';
import { AuthService } from '../../services/authentication.service';
import { Router } from '@angular/router';  
import { UserProfileService } from '../../services/user-profile.service';  // Import UserProfileService

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
    private userProfileService: UserProfileService  // Inject UserProfileService
  ) {}

  // Handle form submission
  onSubmit() {
    const userData = {
      email: this.email,
      password: this.password
    };

    this.authService.login(userData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);

        // Store the token for future use in API requests
        localStorage.setItem('token', response.token);

        console.log(response.token)

        // Check if the user has already created a profile
        this.checkUserProfile();
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Invalid email or password');
      }
    });
  }

  // Function to check if the user has created a profile
  checkUserProfile() {
    this.userProfileService.getUserProfile().subscribe({
      next: (profile) => {
        if (profile) {
          // If profile exists, navigate to the /profile page
          this.router.navigate(['/profile']);
        } else {
          // If no profile exists, navigate to /create-profile
          this.router.navigate(['/create-profile']);
        }
      },
      error: (error) => {
        // Handle error, assume profile doesn't exist if we receive an error
        console.error('Error fetching user profile:', error);
        this.router.navigate(['/create-profile']);
      }
    });
  }
}
