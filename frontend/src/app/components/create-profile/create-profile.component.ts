import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {
  selectedImage: string | ArrayBuffer | null = null;

  profile = {
    username: '',
    bio: '',
    fitnessGoals: '',
    age: null,
    gender: '',
    weight: null,
    height: null,
    email: '',
    phoneNumber: ''
  };

  constructor(
    private userProfileService: UserProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userProfileService.getUserData().subscribe({
      next: (user) => {
        this.profile.username = user.username; // Automatically fill in the username
        this.profile.email = user.email;       // Automatically fill in the email
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
        alert('Failed to fetch user data');
      }
    });
  }
  

  // Method to handle image selection from file input
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Method to handle cancelling profile creation
  cancelEdit() {
    this.router.navigate(['/posts']);  // Redirect to posts page
  }

  // Method to save profile data
  saveProfile() {
    if (!this.selectedImage) {
      this.selectedImage = '/assets/images/brocode.png';  // Use default image if none selected
    }

    const profileData = {
      ...this.profile,
      profile_picture: this.selectedImage
    };

    this.userProfileService.createUserProfile(profileData).subscribe({
      next: (response: any) => {
        console.log('Profile created successfully:', response);
        this.router.navigate(['/posts']);  // Redirect to posts page after success
      },
      error: (error: any) => {
        console.error('Error creating profile:', error);
        alert('Failed to create profile');
      }
    });
  }
}
