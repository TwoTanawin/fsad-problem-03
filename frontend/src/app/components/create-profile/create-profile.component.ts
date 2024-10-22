import { Component } from '@angular/core';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent {
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

  cancelEdit() {
    // Logic to cancel the profile editing and maybe reset form values
  }

  saveProfile() {
    // Logic to save profile, including handling default image if no image is uploaded
    if (!this.selectedImage) {
      this.selectedImage = '/assets/images/brocode.png';
    }
    console.log('Profile saved:', this.profile, 'Image:', this.selectedImage);
  }
}
