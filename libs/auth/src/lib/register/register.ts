import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, filter } from 'rxjs';
import * as AuthActions from '@social-network-workspace/core';
import { selectLoading, selectError } from '@social-network-workspace/core';

@Component({
  selector: 'lib-register',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, NgIf],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register implements OnInit {
  username = '';
  email = '';
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

    // Navigate when user exists (registration success)
    combineLatest([this.user$, this.loading$, this.error$])
      .pipe(
        filter(([user, loading, error]) => !!user && !loading && !error)
      )
      .subscribe(([user]) => {
        console.log('Registration successful, navigating to feed...');
        this.router.navigate(['/feed']);
      });
  }

  register() {
    if (!this.username || !this.email || !this.password) return;

    this.store.dispatch(
      AuthActions.register({
        user: {
          username: this.username,
          email: this.email,
          password: this.password,
        },
      })
    );
  }
}
