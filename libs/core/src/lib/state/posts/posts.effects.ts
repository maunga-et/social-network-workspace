import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../../api/post.service';
import * as PostActions from './post.store';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class PostEffects {
  private actions$ = inject(Actions);
  private postService = inject(PostService);

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadPosts),
      mergeMap(() =>
        this.postService.getPosts().pipe(
          map((posts) => PostActions.loadPostsSuccess({ posts })),
          catchError((error) =>
            of(
              PostActions.loadPostsFailure({
                error: error.message || 'Failed to load posts',
              })
            )
          )
        )
      )
    )
  );

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.createPost),
      mergeMap(({ post }) =>
        this.postService.createPost(post).pipe(
          map((newPost) => PostActions.createPostSuccess({ post: newPost })),
          catchError((error) =>
            of(
              PostActions.createPostFailure({
                error: error.message || 'Failed to create post',
              })
            )
          )
        )
      )
    )
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.deletePost),
      mergeMap(({ id }) =>
        this.postService.deletePost(id).pipe(
          map(() => PostActions.deletePostSuccess({ id })),
          catchError((error) =>
            of(PostActions.deletePostFailure({ error: error.message }))
          )
        )
      )
    )
  );

  upvotePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.upvotePost),
      mergeMap(({ id }) =>
        this.postService.upvotePost(id).pipe(
          map((response) => {
            if (response.detail === 'Already voted') {
              return PostActions.upvotePostAlreadyVoted({ id });
            }
            return PostActions.upvotePostSuccess({ id });
          }),
          catchError((error) =>
            of(PostActions.upvotePostFailure({ error: error.message }))
          )
        )
      )
    )
  );

  downvotePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.downvotePost),
      mergeMap(({ id }) =>
        this.postService.downvotePost(id).pipe(
          map((response) => {
            if (response.detail === 'Already voted') {
              return PostActions.upvotePostAlreadyVoted({ id });
            }
            return PostActions.downvotePostSuccess({ id });
          }),
          catchError((error) =>
            of(PostActions.upvotePostFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
