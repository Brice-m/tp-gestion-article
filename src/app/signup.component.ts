import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styles: [
    `
    .auth-card
      max-width: 520px
      margin: 2rem auto
      padding: 1.5rem
      border: 1px solid #eee
      border-radius: 8px

    label
      display: block
      margin-bottom: 10px

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
export class SignupComponent {
  form: any = { email: '', password: '', passwordConfirm: '', pseudo: '', cityCode: '', city: '', phone: '' };
  error: string | null = null;
  success: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  validateEmail(email: string) {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  }

  onSubmit() {
    this.error = null; this.success = null;

    if (!this.validateEmail(this.form.email)) { this.error = 'Adresse email invalide'; return; }
    if (this.form.password !== this.form.passwordConfirm) { this.error = 'Les mots de passe ne correspondent pas'; return; }

    this.auth.signup(this.form).subscribe({
      next: (res) => {
        if (res.code === '200') {
          this.success = res.message || 'Inscription réussie';
        } else {
          this.error = res.message || 'Erreur lors de l\'inscription';
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
