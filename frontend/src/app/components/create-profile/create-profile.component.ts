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
  ) { }

  ngOnInit(): void {
    // Fetch user data and populate profile
    this.userProfileService.getUserData().subscribe({
      next: (user) => {
        this.profile.username = user.username;
        this.profile.email = user.email;
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
        alert('Failed to fetch user data');
      }
    });
  }

  // Method to handle image selection and Base64 encoding
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;  // This should give the Base64 string
        console.log('Selected Image:', this.selectedImage);  // Debugging log
      };
      reader.readAsDataURL(file);  // Converts the file to Base64
    }
  }


  saveProfile() {
    console.log('Current profile data:', this.profile);
  
    // Ensure required fields are filled
    if (!this.profile.username || !this.profile.email || this.profile.age == null ||
        this.profile.weight == null || this.profile.height == null || !this.profile.gender) {
      alert('Please fill in all required fields.');
      return;
    }
  
    const profileData = {
      ...this.profile,
      user_id: 1, // Replace with the actual user ID from your authentication service
      profile_picture: this.selectedImage || '/assets/images/brocode.png',
      gender: this.profile.gender.toLowerCase() // Ensure gender is lowercase
    };
  
    // Call the profile creation service
    this.userProfileService.createUserProfile(profileData).subscribe({
      next: (response: any) => {
        console.log('Profile created successfully:', response);
        this.router.navigate(['/posts']); // Navigate to the posts page after success
      },
      error: (error: any) => {
        console.error('Error creating profile:', error);
        alert('Failed to create profile: ' + error.error.message); // Show specific error message
      }
    });
  }
  


  cancelEdit() {
    this.router.navigate(['/posts']);
  }
}
