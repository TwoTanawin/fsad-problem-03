import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { UserPostComponent } from './components/user-post/user-post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'signin', component: SignInComponent }, 
  { path: 'posts', component: UserPostComponent }, 
  { path: 'create-profile', component: CreateProfileComponent },
  { path: '', redirectTo: '/signin', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
