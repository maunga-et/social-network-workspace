import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '@social-network-workspace/core';
import { selectAllPosts, selectPostsLoading } from '@social-network-workspace/core';
import * as PostActions from '@social-network-workspace/core';
import { PostList } from '../../components/post-list/post-list';
import { AsyncPipe, NgIf, NgFor } from '@angular/common';
import { CreatePost } from "../../components/create-post/create-post";

@Component({
  selector: 'lib-feed-page',
  imports: [PostList, AsyncPipe, NgIf, NgFor, CreatePost],
  templateUrl: './feed-page.html',
  styleUrl: './feed-page.css',
})
export class FeedPage implements OnInit {
  posts$!: Observable<Post[]>;
  loading$!: Observable<boolean>;

  private store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(PostActions.loadPosts());
    this.posts$ = this.store.select(selectAllPosts);
    this.loading$ = this.store.select(selectPostsLoading);
  }
}
