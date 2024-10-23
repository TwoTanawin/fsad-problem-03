import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';
import { AuthService } from '../../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isEditing = false;

  // Declare profile data properties consistent with Rails model
  profilePicture: string = 'https://flowbite.com/application-ui/demo/images/users/jese-leos-2x.png'; 
  bio: string = '';       
  fitnessGoals: string = ''; 
  weight: number = 0;
  height: number = 0;
  age: number = 0;
  gender: string = '';
  activityLevel: string = '';  // Matches Rails migration field

  userId: number | null = null;  // Variable to store the userId (references :user)
  email: string = '';     

  constructor(
    private userProfileService: UserProfileService, 
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchUserProfile();
    this.authService.getUserInfo().subscribe({
      next: (user) => {
        this.userId = user.id;
        console.log('User ID:', this.userId);  
        this.email = user.email;  // Assuming this comes from a different API than UserProfile 
      },
      error: (error) => {
        console.error('Error fetching user info:', error);
        alert('Failed to fetch user info');
      }
    });
  }

  // Fetch the user profile data from the backend
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

  // Update component's profile data to match Rails model structure
  updateProfileData(profileData: any) {
    this.profilePicture = this.decodeBase64Image(profileData.profile_picture);
    this.bio = profileData.bio || '';
    this.fitnessGoals = profileData.fitness_goals || '';
    this.weight = profileData.weight || 0;
    this.height = profileData.height || 0;
    this.age = profileData.age || 0;
    this.gender = profileData.gender || '';
    this.activityLevel = profileData.activity_level || '';
  }

  // Decode Base64 image (Rails stores image in Base64 format in DB)
  decodeBase64Image(base64String: string): string {
    return `data:image/png;base64,${base64String}`;
  }

  // Toggle between view and edit mode
  toggleEditMode() {
    this.isEditing = !this.isEditing;
  }

  // Save the updated profile to the backend
  saveProfile() {
    this.isEditing = false;
    const updatedProfile = {
      profile_picture: this.profilePicture,
      bio: this.bio,
      fitness_goals: this.fitnessGoals,
      weight: this.weight,
      height: this.height,
      age: this.age,
      gender: this.gender,
      activity_level: this.activityLevel,
    };
    console.log('Profile saved:', updatedProfile);
    // Logic to send updated profile data to backend API
  }
}
