import { createAction, createReducer, on, createFeatureSelector, createSelector, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const login = createAction('[Auth] Login', props<{ username: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: User; token: string }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

export const register = createAction('[Auth] Register', props<{ user: User }>());
export const registerSuccess = createAction('[Auth] Register Success', props<{ user: User; token: string }>());
export const registerFailure = createAction('[Auth] Register Failure', props<{ error: string }>());

export const loadCurrentUser = createAction('[Auth] Load Current User');
export const loadCurrentUserSuccess = createAction(
  '[Auth] Load Current User Success',
  props<{ user: User }>()
);
export const loadCurrentUserFailure = createAction(
  '[Auth] Load Current User Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const authReducer = createReducer(
  initialAuthState,

  on(login, (state) => ({ ...state, loading: true, error: null })),
  on(loginSuccess, (state, { user, token }) => ({ ...state, loading: false, user, token })),
  on(loginFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(register, (state) => ({ ...state, loading: true, error: null })),
  on(registerSuccess, (state, { user, token }) => ({ ...state, loading: false, user, token })),
  on(registerFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(logout, (state) => ({ ...state, user: null, token: null, error: null })),

  on(loadCurrentUser, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadCurrentUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(loadCurrentUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(selectAuthState, (state) => state.user);
export const selectToken = createSelector(selectAuthState, (state) => state.token);
export const selectLoading = createSelector(selectAuthState, (state) => state.loading);
export const selectError = createSelector(selectAuthState, (state) => state.error);
