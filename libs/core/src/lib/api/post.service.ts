import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'https://test.esolutions.co.zw/postify-api/posts';

  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getPosts(): Observable<Post[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Post[]>(this.apiUrl, { headers });
  }

  getPost(id: number): Observable<Post> {
    const headers = this.getAuthHeaders();
    return this.http.get<Post>(`${this.apiUrl}/${id}`, { headers });
  }

  createPost(post: Partial<Post>): Observable<Post> {
    const headers = this.getAuthHeaders();
    return this.http.post<Post>(this.apiUrl, post, { headers });
  }

  updatePost(id: number, post: Partial<Post>): Observable<Post> {
    const headers = this.getAuthHeaders();
    return this.http.put<Post>(`${this.apiUrl}/${id}`, post, { headers });
  }

  deletePost(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  upvotePost(postId: number): Observable<{ detail?: string }> {
    const headers = this.getAuthHeaders();

    return this.http.put<{ detail?: string }>(
      `${this.apiUrl}/${postId}/upvote`,
      { post_id: postId },
      { headers }
    );
  }

  downvotePost(postId: number): Observable<{ detail?: string }> {
    const headers = this.getAuthHeaders();

    return this.http.put<{ detail?: string }>(
      `${this.apiUrl}/${postId}/downvote`,
      { post_id: postId },
      { headers }
    );
  }
}
