import { Component } from '@angular/core';

interface Post {
  content: string;
  owner: string;
  profileImage: string;
  image?: string | null; // Optional image property, can be string or null
  timestamp: string;
}

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
})
export class UserPostComponent {
  isExpanded = false;
  newPostContent = '';
  newPostImage: string | null = null; // Store image as base64 string
  posts: Post[] = [];

  userProfileImage = 'https://randomuser.me/api/portraits/men/32.jpg';
  userName = 'Tanawin Siriwan';

  // Create a new post
  createPost() {
    const newPost: Post = {
      content: this.newPostContent,
      owner: this.userName,
      profileImage: this.userProfileImage,
      image: this.newPostImage, // Include the image if added, or null if not
      timestamp: new Date().toLocaleString(),
    };

    this.posts.unshift(newPost); // Add the new post to the top
    this.newPostContent = ''; // Reset post content
    this.newPostImage = null; // Reset post image
    this.isExpanded = false; // Close post modal
  }

  // Handle image selection
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

  deletePost(index: number) {
    this.posts.splice(index, 1); // Remove the post
  }

  pinPost(index: number) {
    const pinnedPost = this.posts.splice(index, 1)[0]; // Remove the post from its original place
    this.posts.unshift(pinnedPost); // Add it to the top
  }
}
