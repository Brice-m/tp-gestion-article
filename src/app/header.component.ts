import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, UserProfile } from './auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  email: string | null = null;
  pseudo: string | null = null;
  city: string | null = null;
  private sub: Subscription | null = null;
  showMenu = false;

  constructor(private auth: AuthService, private router: Router) {
    const p = auth.getUserProfile();
    this.email = p?.email || null;
    this.pseudo = p?.pseudo || null;
    this.city = p?.city || null;
    this.sub = this.auth.user$.subscribe((u: UserProfile | null) => {
      this.email = u?.email || null;
      this.pseudo = u?.pseudo || null;
      this.city = u?.city || null;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  logout() {
    this.auth.logout();
    this.auth.setUserProfile(null);
    this.router.navigate(['/login']);
  }

  goHome() { this.router.navigate(['/home']); }
}

