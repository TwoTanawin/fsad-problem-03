import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { UserPostComponent } from './components/user-post/user-post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'signin', component: SignInComponent }, // Route for sign-in page
  { path: 'posts', component: UserPostComponent }, // Route for posts page
  { path: '', redirectTo: '/signin', pathMatch: 'full' }, // Default route redirecting to sign-in
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
