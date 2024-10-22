import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication.service'; // Service to fetch current user data
import { UserProfileService } from '../../services/user-profile.service'; // Service to fetch user profile data

interface Comment {
  commenterName: string;
  commenterProfileImage: string;
  commentText: string;
}

@Component({
  selector: 'app-post-interaction',
  templateUrl: './post-interaction.component.html',
})
export class PostInteractionComponent implements OnInit {
  @Input() postContent: string = '';
  @Input() postImage: string = ''; // Optional post image
  @Input() postOwner: string = '';
  @Input() profileImage: string = '';
  @Input() timestamp: string = '';

  isEditing = false;
  comments: Comment[] = [];
  newCommentText: string = '';

  // User Profile Information
  userProfileImage: string = ''; // To be dynamically set
  userName: string = ''; // To be dynamically set

  @Output() deletePost = new EventEmitter<void>();
  @Output() pinPost = new EventEmitter<void>();

  constructor(private authService: AuthService, private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.loadUserProfile(); // Fetch current user data on initialization
  }

  // Fetch current user information
  loadUserProfile(): void {
    this.authService.getUserInfo().subscribe({
      next: (user) => {
        this.userName = user.username; // Set the logged-in user's name
      },
      error: (error) => {
        console.error('Error fetching user info:', error);
      }
    });

    this.userProfileService.getUserProfile().subscribe({
      next: (profile) => {
        this.userProfileImage = this.decodeBase64Image(profile.profile_picture); // Set logged-in user's profile picture
      },
      error: (error) => {
        console.error('Failed to fetch profile:', error);
      }
    });
  }

  decodeBase64Image(base64String: string): string {
    return `data:image/png;base64,${base64String}`;
  }

  // Adding a new comment
  addComment() {
    if (this.newCommentText.trim()) {
      const newComment: Comment = {
        commenterName: this.userName,
        commenterProfileImage: this.userProfileImage,
        commentText: this.newCommentText,
      };
      this.comments.push(newComment);
      this.newCommentText = ''; // Reset comment input
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveEdit(updatedContent: string) {
    this.postContent = updatedContent;
    this.isEditing = false;
  }

  likePost() {
    console.log('Post liked!');
  }

  sharePost() {
    console.log('Post shared!');
  }

  delete() {
    this.deletePost.emit();
  }

  pin() {
    this.pinPost.emit();
  }
}
