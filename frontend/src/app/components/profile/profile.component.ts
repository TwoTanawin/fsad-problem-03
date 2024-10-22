import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isEditing = false;

  // Profile data
  profilePicture: string = 'https://flowbite.com/application-ui/demo/images/users/jese-leos-2x.png'; 
  username: string = '';
  bio: string = '';
  fitnessGoals: string = '';
  weight: number = 0;
  height: number = 0;
  age: number = 0;
  gender: string = '';
  email: string = '';
  phoneNumber: string = '';

  constructor(private userProfileService: UserProfileService) {}  // Inject UserProfileService

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  // Method to fetch profile data using the service for the current user
  fetchUserProfile() {
    this.userProfileService.getUserProfile().subscribe(
      (data) => {
        this.updateProfileData(data);
      },
      (error) => {
        console.error('Failed to fetch profile:', error);
      }
    );
  }

  // Method to update the component's profile data with the fetched data
  updateProfileData(profileData: any) {
    this.profilePicture = this.decodeBase64Image(profileData.profile_picture);
    this.username = profileData.username || '';  // Use empty string as fallback
    this.bio = profileData.bio || '';
    this.fitnessGoals = profileData.fitness_goals || '';
    this.weight = profileData.weight || 0;
    this.height = profileData.height || 0;
    this.age = profileData.age || 0;
    this.gender = profileData.gender || '';
    this.email = profileData.email || '';
    this.phoneNumber = profileData.phone_number || '';  // Adjust based on actual backend response
  }

  // Method to decode Base64 image
  decodeBase64Image(base64String: string): string {
    return `data:image/png;base64,${base64String}`;
  }

  // Method to toggle edit mode
  toggleEditMode() {
    this.isEditing = !this.isEditing;
  }

  // Method to save changes
  saveProfile() {
    this.isEditing = false;
    // Here you would typically send the updated profile data to the backend API
    console.log('Profile saved:', this.username, this.bio, this.fitnessGoals, this.weight, this.height, this.age, this.gender, this.email, this.phoneNumber);
  }
}
