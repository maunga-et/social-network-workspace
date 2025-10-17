import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '@social-network-workspace/core';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected title = 'social-app';

  private store = inject(Store);

  ngOnInit(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.store.dispatch(AuthActions.loadCurrentUser());
    }
  }
}
