import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  username = '';
  password = '';
  confirmPassword = '';
  error = '';
  success = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      this.success = '';
      return;
    }

    this.auth
      .register({ username: this.username, password: this.password })
      .subscribe({
        next: (res) => {
          console.log('Register success:', res);
          this.error = '';
          this.success = 'Registration successful! You can now log in.';
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Register error:', err);
          this.success = '';
          this.error = err.error?.message || 'Registration failed';
        },
      });
  }
}
