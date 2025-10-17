import { Route } from '@angular/router';
import { authRoutes } from '@social-network-workspace/auth';
import { FeedPage } from '@social-network-workspace/posts';

export const appRoutes: Route[] = [
    ...authRoutes,
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'feed', component: FeedPage }
];
