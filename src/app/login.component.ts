import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styles: [
    `
    .auth-card
      max-width: 420px
      margin: 2rem auto
      padding: 1.5rem
      border: 1px solid #eee
      border-radius: 8px

    label
      display: block
      margin-bottom: 12px

    input
      width: 100%
      padding: 8px
      margin-top: 6px

    .actions
      display: flex
      justify-content: space-between
      align-items: center

    .error
      color: crimson

    a
      cursor: pointer
      color: var(--bright-blue, #007bff)
    `,
  ],
})
export class LoginComponent {
  email = '';
  password = '';
  error: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.error = null;
    if (!this.email) { this.error = 'L\'email est requis'; return; }
    if (!this.password) { this.error = 'Le mot de passe est requis'; return; }

    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        if (res.code === '200') {
          if (res.data && typeof res.data === 'string') {
            this.auth.setToken(res.data as string);
          }
          this.auth.setUserEmail(this.email);
          this.router.navigate(['/home']);
        } else {
          this.error = res.message || 'Erreur inconnue';
        }
      },
      error: (err) => {
        if (err?.error?.message) this.error = err.error.message;
        else if (err?.message) this.error = err.message;
        else this.error = 'Impossible de se connecter';
      }
    });
  }

  goTo(path: string) { this.router.navigate([`/${path}`]); }
}
