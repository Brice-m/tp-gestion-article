import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

export interface ApiResponse<T = any> {
  code: string;
  message: string;
  data: T | null;
}

export interface UserProfile {
  email?: string | null;
  pseudo?: string | null;
  city?: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private storageKey = 'auth_token';
  private storageUserKey = 'auth_user';
  public user$ = new BehaviorSubject<UserProfile | null>(this.getUserProfile());

  constructor(private http: HttpClient) {}

  login(payload: { email: string; password: string }) {
    return this.http.post<ApiResponse<string>>(`${this.baseUrl}/login`, payload).pipe(
      catchError((err) => throwError(() => err))
    );
  }

  signup(payload: any) {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/signup`, payload).pipe(
      catchError((err) => throwError(() => err))
    );
  }

  resetPassword(payload: { email: string }) {
    return this.http.post<ApiResponse<string>>(`${this.baseUrl}/reset-password`, payload).pipe(
      catchError((err) => throwError(() => err))
    );
  }
  setToken(token: string | null) {
    if (token) localStorage.setItem(this.storageKey, token);
    else localStorage.removeItem(this.storageKey);
  }

  setUserEmail(email: string | null) {
    if (email) {
      const profile: UserProfile = { email };
      localStorage.setItem(this.storageUserKey, JSON.stringify(profile));
      this.user$.next(profile);
    } else {
      localStorage.removeItem(this.storageUserKey);
      this.user$.next(null);
    }
  }
  setUserProfile(profile: UserProfile | null) {
    if (profile) {
      localStorage.setItem(this.storageUserKey, JSON.stringify(profile));
      this.user$.next(profile);
    } else {
      localStorage.removeItem(this.storageUserKey);
      this.user$.next(null);
    }
  }

  getUserProfile(): UserProfile | null {
    const raw = localStorage.getItem(this.storageUserKey);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed === 'string') return { email: parsed };
      return parsed as UserProfile;
    } catch (e) {
      return { email: raw };
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  isLoggedIn(): boolean {
    const t = this.getToken();
    return !!t;
  }

  logout() {
    this.setToken(null);
  }
  check() {
    return this.http.get<{ message: string }>(`${this.baseUrl}/check`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
