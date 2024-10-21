import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Comment {
  commenterName: string;
  commenterProfileImage: string;
  commentText: string;
}

@Component({
  selector: 'app-post-interaction',
  templateUrl: './post-interaction.component.html',
})
export class PostInteractionComponent {
  @Input() postContent: string = '';
  @Input() postImage: string = ''; // Optional post image
  @Input() postOwner: string = '';
  @Input() profileImage: string = '';
  @Input() timestamp: string = '';

  isEditing = false;
  comments: Comment[] = [];
  newCommentText: string = '';
  userProfileImage: string = 'https://randomuser.me/api/portraits/men/33.jpg'; // Simulated logged-in user image
  userName: string = 'John Doe'; // Simulated logged-in user name

  @Output() deletePost = new EventEmitter<void>();
  @Output() pinPost = new EventEmitter<void>();

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveEdit(updatedContent: string) {
    this.postContent = updatedContent;
    this.isEditing = false;
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
