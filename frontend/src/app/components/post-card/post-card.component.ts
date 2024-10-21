import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  @Input() userProfileImage: string = '';
  @Input() userName: string = '';
  @Input() userRole: string = '';
  @Input() postImage: string = '';
  @Input() postContent: string = '';
}
