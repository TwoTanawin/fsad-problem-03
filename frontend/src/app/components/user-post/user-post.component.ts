import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';
import { AuthService } from '../../services/authentication.service';
import { PostService } from '../../services/post-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
})
export class UserPostComponent implements OnInit {
  isExpanded = false;
  newPostContent = '';
  newPostImage: string | null = null;
  posts: any[] = []; // Initialize posts as an empty array
  newCommentContent = '';
  userProfileImage = 'https://randomuser.me/api/portraits/men/32.jpg';
  userName = 'Loading...';
  token: string = ''; // Store user token here

  constructor(
    private userProfileService: UserProfileService,
    private authService: AuthService,
    private postService: PostService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchUserProfile(); // Fetch user profile, including profile image
  
    this.authService.getUserInfo().subscribe({
      next: (user) => {
        this.userName = user.username;  // Store username
        this.token = user.token;        // Store user token
        this.loadPosts();               // Load posts after fetching user info
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

  // Create a new post using the post service
  createPost() {
    if (!this.newPostContent && !this.newPostImage) {
      console.error('Cannot create post without a caption or image.');
      return;
    }

    const postData = {
      caption: this.newPostContent,
      image_base64: this.newPostImage, // Optional, only include if image is uploaded
      pinned: false,
      category: 'general',
    };

    this.postService.createPost(postData).subscribe({
      next: (response) => {
        const newPost = {
          content: response.caption,
          owner: this.userName,
          profileImage: this.userProfileImage,
          image: response.image_base64 ? this.decodeBase64Image(response.image_base64) : null,
          timestamp: new Date().toLocaleString(),
          comments: [],
        };

        this.posts.unshift(newPost); // Add the new post to the top of the list
        this.newPostContent = ''; // Reset post content
        this.newPostImage = null;  // Reset post image
        this.isExpanded = false; // Close the post creation modal
      },
      error: (error) => {
        console.error('Failed to create post:', error);
      },
    });
  }

  loadPosts() {
    this.postService.getAllPosts().subscribe({
      next: (posts: any) => {
        this.posts = posts
          .map((post: any) => ({
            content: post.caption,
            owner: post.user.username,
            profileImage: post.user.user_profile?.profile_picture
              ? this.decodeBase64Image(post.user.user_profile.profile_picture)
              : '/assets/images/default-profile.png', // Default profile picture
            image: post.image_base64 ? this.decodeBase64Image(post.image_base64) : null,
            timestamp: post.created_at,
            comments: post.comments,
          }))
          // Sort posts by created_at field in descending order (new to old)
          .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      },
      error: (error: any) => {
        console.error('Failed to load posts:', error);
      },
    });
  }
  

  // Pin a post (move it to the top)
  pinPost(postId: number) {
    const pinnedPostIndex = this.posts.findIndex(post => post.id === postId);
    if (pinnedPostIndex > -1) {
      const [pinnedPost] = this.posts.splice(pinnedPostIndex, 1); // Remove post
      this.posts.unshift(pinnedPost); // Add the post to the top of the list
    }
  }

// Update a post
updatePost(postId: number) {
  const updatedData = {
    caption: 'Updated caption for my post!',  // New caption or other updates
    pinned: true
  };

  this.postService.updatePost(postId.toString(), updatedData).subscribe({
    next: (response) => {
      console.log(`Post ${postId} updated successfully!`, response);
      this.loadPosts();  // Reload posts after successful update
    },
    error: (error) => {
      console.error('Failed to update post:', error);
    }
  });
}

// Delete a post
deletePost(postId: number) {
  this.postService.deletePost(postId.toString()).subscribe({
    next: () => {
      console.log(`Post ${postId} deleted successfully!`);
      this.posts = this.posts.filter(post => post.id !== postId);  // Remove post from the list
    },
    error: (error) => {
      console.error('Failed to delete post:', error);
    }
  });
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

  // Add a comment to a specific post
  addComment(postIndex: number) {
    if (this.newCommentContent.trim()) {
      const comment = {
        username: this.userName,
        profileImage: this.userProfileImage,
        text: this.newCommentContent,
      };

      this.posts[postIndex].comments.push(comment);
      this.newCommentContent = '';
    }
  }
}
