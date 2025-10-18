import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, filter } from 'rxjs';
import * as AuthActions from '@social-network-workspace/core';
import { selectError } from '@social-network-workspace/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-login',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  loading = false;
  error$!: Observable<string | null>;
  user$!: Observable<any>;

  private store = inject(Store);
  private router = inject(Router);

  ngOnInit(): void {
    this.error$ = this.store.select(selectError);
    this.user$ = this.store.select((state: any) => state.auth.user);

    // Navigate to feed when login succeeds
    combineLatest([this.user$, this.error$])
      .pipe(filter(([user, error]) => !!user && !error))
      .subscribe(() => {
        console.log('Login successful, navigating to feed...');
        this.router.navigate(['/feed']);
      });
  }

  login() {
    if (!this.loginForm.valid) return;

    this.loading = true;

    this.store.dispatch(
      AuthActions.login({
        username: this.loginForm.value.username!,
        password: this.loginForm.value.password!,
      })
    );
  }
}
