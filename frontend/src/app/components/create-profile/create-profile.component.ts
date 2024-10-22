import { Component } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';  // Import your service
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent {
  selectedImage: string | ArrayBuffer | null = null;  // Add this property

  profile = {  // Add this object to hold profile details
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
    private userProfileService: UserProfileService,  // Inject the user profile service
    private router: Router  // Inject the router
  ) {}

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
    this.router.navigate(['/posts']);  // Example: Redirect to posts page
  }

  // Method to save profile data
  saveProfile() {
    if (!this.selectedImage) {
      this.selectedImage = '/assets/images/brocode.png';  // Use default image if no image is selected
    }

    const profileData = {
      ...this.profile,
      profile_picture: this.selectedImage  // Include selected image
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
