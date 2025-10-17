import {
  createAction,
  createReducer,
  on,
  props,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { Post } from '../../models/post.model';

export const loadPosts = createAction('[Post] Load Posts');
export const loadPostsSuccess = createAction(
  '[Post] Load Posts Success',
  props<{ posts: Post[] }>()
);
export const loadPostsFailure = createAction(
  '[Post] Load Posts Failure',
  props<{ error: string }>()
);

export const createPost = createAction(
  '[Post] Create Post',
  props<{ post: Partial<Post> }>()
);
export const createPostSuccess = createAction(
  '[Post] Create Post Success',
  props<{ post: Post }>()
);
export const createPostFailure = createAction(
  '[Post] Create Post Failure',
  props<{ error: string }>()
);

export const deletePost = createAction(
  '[Posts] Delete Post',
  props<{ id: number }>()
);

export const deletePostSuccess = createAction(
  '[Posts] Delete Post Success',
  props<{ id: number }>()
);

export const deletePostFailure = createAction(
  '[Posts] Delete Post Failure',
  props<{ error: string }>()
);

export const upvotePost = createAction(
  '[Posts] Upvote Post',
  props<{ id: number }>()
);

export const upvotePostSuccess = createAction(
  '[Posts] Upvote Post Success',
  props<{ id: number }>()
);

export const upvotePostFailure = createAction(
  '[Posts] Upvote Post Failure',
  props<{ error: string }>()
);

export const upvotePostAlreadyVoted = createAction(
  '[Posts] Upvote Already Voted',
  props<{ id: number }>()
);

export const downvotePost = createAction(
  '[Posts] Downvote Post',
  props<{ id: number }>()
);

export const downvotePostSuccess = createAction(
  '[Posts] Downvote Post Success',
  props<{ id: number }>()
);

export const downvotePostFailure = createAction(
  '[Posts] Downvote Post Failure',
  props<{ error: string }>()
);

export interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

export const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

export const postReducer = createReducer(
  initialState,
  on(loadPosts, (state) => ({ ...state, loading: true, error: null })),
  on(loadPostsSuccess, (state, { posts }) => ({
    ...state,
    posts,
    loading: false,
  })),
  on(loadPostsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(createPost, (state) => ({ ...state, loading: true, error: null })),
  on(createPostSuccess, (state, { post }) => ({
    ...state,
    posts: [post, ...state.posts],
    loading: false,
  })),
  on(createPostFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(deletePost, (state) => ({
    ...state,
    loading: true,
  })),
  on(deletePostSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    posts: state.posts.filter((post) => post.id !== id),
  })),
  on(deletePostFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(upvotePost, (state) => ({
    ...state,
    loading: true,
  })),

  on(upvotePostSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    posts: state.posts.map((post) =>
      post.id === id ? { ...post, votes: post.votes + 1 } : post
    ),
  })),

  on(upvotePostFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(upvotePostAlreadyVoted, (state, { id }) => ({
    ...state,
    loading: false,
    error: 'You have already voted on this post.',
  })),

  on(downvotePost, (state) => ({
    ...state,
    loading: true,
  })),

  on(downvotePostSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    posts: state.posts.map((post) =>
      post.id === id ? { ...post, votes: post.votes - 1 } : post
    ),
  })),

  on(downvotePostFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectPostState = createFeatureSelector<PostState>('posts');

export const selectAllPosts = createSelector(
  selectPostState,
  (state) => state.posts
);
export const selectPostsLoading = createSelector(
  selectPostState,
  (state) => state.loading
);
export const selectPostsError = createSelector(
  selectPostState,
  (state) => state.error
);
