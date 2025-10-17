import { Component, Input, inject } from '@angular/core';
import { Post, selectUser, User } from '@social-network-workspace/core';
import { CommonModule, NgIf } from '@angular/common';
import { LucideAngularModule, ArrowBigDown, ArrowBigUp } from 'lucide-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as PostActions from '@social-network-workspace/core';

@Component({
  selector: 'lib-post-item',
  imports: [CommonModule, NgIf, LucideAngularModule],
  templateUrl: './post-item.html',
  styleUrls: ['./post-item.css'],
})
export class PostItem {
  @Input() post!: Post;
  readonly ArrowBigDown = ArrowBigDown;
  readonly ArrowBigUp = ArrowBigUp;
  private store = inject(Store);

  user$: Observable<User | null> = this.store.select(selectUser);

  isOwner(postOwnerUsername: string, currentUser: User | null): boolean {
    return !!currentUser && currentUser.username === postOwnerUsername;
  }

  get timeSincePosted(): string {
    const now = new Date();
    const created = new Date(this.post.created_at);
    const diffMs = now.getTime() - created.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  }

  deletePost() {
    this.store.dispatch(PostActions.deletePost({ id: this.post.id }));
  }

  upvote() {
    this.store.dispatch(PostActions.upvotePost({ id: this.post.id }));
  }

  downvote() {
    this.store.dispatch(PostActions.downvotePost({ id: this.post.id }));
  }
}
