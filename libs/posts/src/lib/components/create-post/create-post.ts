import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import * as PostActions from '@social-network-workspace/core';
import { selectPostsLoading } from '@social-network-workspace/core';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-create-post',
  imports: [FormsModule, NgIf, AsyncPipe],
  templateUrl: './create-post.html',
  styleUrl: './create-post.css',
})
export class CreatePost {
  content = '';
  title = '';

  loading$!: Observable<boolean>;

  private store = inject(Store);

  constructor() {
    this.loading$ = this.store.select(selectPostsLoading);
  }

  submitPost() {
    if (!this.title.trim() || !this.content.trim()) return;

    this.store.dispatch(
      PostActions.createPost({ post: { title: this.title, content: this.content } })
    );
    this.content = '';
    this.title = '';
  }
}
