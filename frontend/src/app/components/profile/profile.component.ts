import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  isEditing = false;

  // Profile data
  profilePicture: string = 'https://flowbite.com/application-ui/demo/images/users/jese-leos-2x.png'; 
  username: string = 'Jese Leos';
  bio: string = 'Dedicated, passionate, and accomplished Full Stack Developer.';
  fitnessGoals: string = 'Lose 10 kg and gain muscle tone.';
  weight: number = 70;
  height: number = 175;
  age: number = 29;
  gender: string = 'Male';
  email: string = 'yourname@flowbite.com';
  phoneNumber: string = '+00 123 456 789';

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
