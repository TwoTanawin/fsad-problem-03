import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication.service';  // Updated import path

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
    phoneNumber: '',
    activityLevel: ''  // Add the missing field
  };

  userId: number | null = null;  // Variable to store the userId

  constructor(
    private userProfileService: UserProfileService,
    private authService: AuthService,  // Use the updated AuthService
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe({
      next: (user) => {
        this.userId = user.id;
        console.log('User ID:', this.userId);  // Debugging log to ensure userId is correct
        this.profile.username = user.username;
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
        this.selectedImage = e.target.result;  // This should give the Base64 string
        console.log('Selected Image:', this.selectedImage);  // Debugging log
      };
      reader.readAsDataURL(file);  // Converts the file to Base64
    }
  }

  saveProfile() {
    console.log('Current profile data:', this.profile);
  
    if (!this.profile.username || !this.profile.email || this.profile.age == null ||
        this.profile.weight == null || this.profile.height == null || !this.profile.gender) {
      alert('Please fill in all required fields.');
      return;
    }
  
    const profileData = {
      ...this.profile,
      user_id: this.userId,  // Ensure userId is correctly set
      profile_picture: this.selectedImage || '/assets/images/brocode.png',
      gender: this.profile.gender.toLowerCase(),
      activity_level: this.profile.activityLevel || 'default'
    };
  
    console.log('Profile Data being sent:', profileData);  // Log to ensure user_id is present
  
    this.userProfileService.createUserProfile(profileData).subscribe({
      next: (response: any) => {
        console.log('Profile created successfully:', response);
        this.router.navigate(['/posts']);
      },
      error: (error: any) => {
        console.error('Error creating profile:', error);
        alert(`Failed to create profile: ${error.error.message || 'Unknown error'}`);
      }
    });
  }
  

  cancelEdit() {
    this.router.navigate(['/posts']);
  }
}

