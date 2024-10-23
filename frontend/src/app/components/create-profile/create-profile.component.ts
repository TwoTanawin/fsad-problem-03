import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {
  selectedImage: string | ArrayBuffer | null = null;  // For image upload and Base64 conversion

  // Profile model aligned with the Rails migration
  profile = {
    bio: '',
    fitnessGoals: '',
    age: null,
    gender: '',
    weight: null,
    height: null,
    activityLevel: '',  // Added activity level field
    email: '',
  };

  userId: number | null = null;  // To store the userId from the authentication service

  constructor(
    private userProfileService: UserProfileService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Fetch user info to prefill some profile fields like username and email
    this.authService.getUserInfo().subscribe({
      next: (user) => {
        this.userId = user.id;
        this.profile.email = user.email;
      },
      error: (error) => {
        console.error('Error fetching user info:', error);
        alert('Failed to fetch user info');
      }
    });
  }

  // Method to handle image selection and Base64 encoding
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;  // Base64 encoded image
        console.log('Selected Image (Base64):', this.selectedImage);
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile() {
    if (!this.profile.email || this.profile.age === null || 
        this.profile.weight === null || this.profile.height === null || 
        !this.profile.gender) {
      alert('Please fill in all required fields.');
      return;
    }
  
    // Convert gender to lowercase to match Rails validation
    this.profile.gender = this.profile.gender.toLowerCase(); 
  
    // Prepare profile data consistent with the Rails model
    const profileData = {
      ...this.profile,
      user_id: this.userId,
      profile_picture: this.selectedImage || '/assets/images/brocode.png',  // Default image if none is selected
      activity_level: this.profile.activityLevel || 'default',  // Default activity level if none is provided
    };
  
    console.log('Profile data being sent:', profileData);

    console.log('Selected Image (Base64):', this.selectedImage);  // Ensure this is a complete and valid Base64 string
  
    // Make API call to save the profile
    this.userProfileService.createUserProfile(profileData).subscribe({
      next: (response: any) => {
        console.log('Profile created successfully:', response);
        this.router.navigate(['/posts']);  // Navigate to posts page after successful profile creation
      },
      error: (error: any) => {
        console.error('Error creating profile:', error);
        alert('Failed to create profile: ' + (error.error.message || 'Unknown error'));
      }
    });
  }
  

  cancelEdit() {
    this.router.navigate(['/posts']);  // Navigate back to posts without saving
  }
}
