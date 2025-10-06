import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot.component.html',
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

    .success
      color: green

    a
      cursor: pointer
      color: var(--bright-blue, #007bff)
    `,
  ],
})
export class ForgotComponent {
  email = '';
  error: string | null = null;
  success: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.error = null; this.success = null;
    if (!this.email) { this.error = 'L\'email est requis'; return; }

    this.auth.resetPassword({ email: this.email }).subscribe({
      next: (res) => {
        if (res.code === '200') {
          this.success = `Nouveau mot de passe : ${res.data}`;
        } else {
          this.error = res.message || 'Erreur';
        }
      },
      error: (err) => {
        if (err?.error?.message) this.error = err.error.message;
        else if (err?.message) this.error = err.message;
        else this.error = 'Erreur réseau';
      }
    });
  }

  goTo(path: string) { this.router.navigate([`/${path}`]); }
}
