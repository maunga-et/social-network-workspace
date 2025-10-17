import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, filter } from 'rxjs';
import * as AuthActions from '@social-network-workspace/core';
import { selectLoading, selectError } from '@social-network-workspace/core';

@Component({
  selector: 'lib-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, NgIf],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements OnInit {
  username = '';
  password = '';

  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  user$!: Observable<any>;

  private store = inject(Store);
  private router = inject(Router);

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.user$ = this.store.select((state: any) => state.auth.user);

    // Navigate to feed when login succeeds
    combineLatest([this.user$, this.loading$, this.error$])
      .pipe(filter(([user, loading, error]) => !!user && !loading && !error))
      .subscribe(() => {
        console.log('Login successful, navigating to feed...');
        this.router.navigate(['/feed']);
      });
  }

  login() {
    if (!this.username || !this.password) return;

    this.store.dispatch(
      AuthActions.login({
        username: this.username,
        password: this.password,
      })
    );
  }
}
