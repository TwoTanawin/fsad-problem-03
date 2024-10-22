import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router) {}
  
  title = 'frontend';
  isSignInPage(): boolean {
    return this.router.url === '/signin' || this.router.url === '/register';
  }
}