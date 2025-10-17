import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../api/auth.service';
import * as AuthActions from './auth.store';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../api/user.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);
  private userService = inject(UserService);

  loadCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadCurrentUser),
      mergeMap(() =>
        this.userService.getCurrentUser().pipe(
          map((user) => AuthActions.loadCurrentUserSuccess({ user })),
          catchError((error) =>
            of(AuthActions.loadCurrentUserFailure({ error: error.message }))
          )
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map((res) => {
            this.authService.setToken(res.access_token);
            return AuthActions.loginSuccess({
              user: { username: username },
              token: res.access_token,
            });
          }),
          catchError((error) =>
            of(
              AuthActions.loginFailure({
                error: error.message || 'Login failed',
              })
            )
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({ user }) =>
        this.authService.register(user).pipe(
          mergeMap(() => [
            AuthActions.login({
              username: user.username,
              password: user.password!,
            }),
          ]),
          catchError((error) =>
            of(
              AuthActions.registerFailure({
                error: error.message || 'Registration failed',
              })
            )
          )
        )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.logout();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
