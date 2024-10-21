import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  // Handle form submission
  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    // Here, you would send the user data to the backend for registration
    console.log('User registered:', {
      username: this.username,
      email: this.email,
      password: this.password
    });

    alert('Registration successful!');
  }
}
