import { inject, Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { selectIsLoggedIn } from '../state/auth/auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private store = inject(Store);
  private router = inject(Router);

  canActivate(
    route: import('@angular/router').ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.store.select(selectIsLoggedIn).pipe(
      take(1),
      map((loggedIn) => {
        if (loggedIn) {
          return true;
        }
        return this.router.createUrlTree(['/login']);
      })
    );
  }
}
