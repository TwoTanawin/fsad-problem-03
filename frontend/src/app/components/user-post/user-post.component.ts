import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service'; 
import { AuthService } from '../../services/authentication.service'; 

interface Post {
  content: string;
  owner: string;
  profileImage: string;
  image?: string | null; 
  timestamp: string;
  comments: Comment[]; // Array to hold comments
}

interface Comment {
  username: string;
  profileImage: string;
  text: string;
}

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
})
export class UserPostComponent implements OnInit {
  isExpanded = false;
  newPostContent = '';
  newPostImage: string | null = null;
  posts: Post[] = [];
  newCommentContent = '';

  // User Profile Info
  userProfileImage = 'https://randomuser.me/api/portraits/men/32.jpg'; // Default profile picture
  userName = 'Loading...';

  constructor(
    private userProfileService: UserProfileService, 
    private authService: AuthService  
  ) {}

  ngOnInit(): void {
    this.fetchUserProfile(); 
    this.authService.getUserInfo().subscribe({
      next: (user) => {
        this.userName = user.username;  
      },
      error: (error) => {
        console.error('Error fetching user info:', error);
      }
    });
  }

  fetchUserProfile() {
    this.userProfileService.getUserProfile().subscribe({
      next: (profileData) => {
        if (profileData) {
          this.userProfileImage = this.decodeBase64Image(profileData.profile_picture); // Set user's profile picture
        }
      },
      error: (error) => {
        console.error('Failed to fetch profile:', error);
      }
    });
  }

  decodeBase64Image(base64String: string): string {
    return `data:image/png;base64,${base64String}`;
  }

  // Create a new post
  createPost() {
    const newPost: Post = {
      content: this.newPostContent,
      owner: this.userName,
      profileImage: this.userProfileImage,
      image: this.newPostImage, 
      timestamp: new Date().toLocaleString(),
      comments: [] 
    };

    this.posts.unshift(newPost); // Add the new post to the top of the list
    this.newPostContent = ''; // Reset post content
    this.newPostImage = null; // Reset post image
    this.isExpanded = false; // Close the post creation modal
  }

  // Handle image selection and convert it to base64
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newPostImage = e.target.result; // Set image as base64 string
      };
      reader.readAsDataURL(file); // Convert image to base64 string
    }
  }

  // Delete a post
  deletePost(index: number) {
    this.posts.splice(index, 1); // Remove the post at the given index
  }

  // Pin a post (move it to the top)
  pinPost(index: number) {
    const pinnedPost = this.posts.splice(index, 1)[0]; // Remove the post from its original place
    this.posts.unshift(pinnedPost); // Add it to the top of the list
  }

  // Add a comment to a specific post
  addComment(postIndex: number) {
    if (this.newCommentContent.trim()) {
      const comment: Comment = {
        username: this.userName, // Use current user's name
        profileImage: this.userProfileImage, // Use current user's profile image
        text: this.newCommentContent, // Use the comment text entered by the user
      };
  
      this.posts[postIndex].comments.push(comment); // Add the comment to the post's comments array
      this.newCommentContent = ''; // Reset the comment input
    }
  }
  
}