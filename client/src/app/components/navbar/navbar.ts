import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common'; // ⬅️ import NgIf

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  constructor(private authService: AuthService) {}

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // simple token check
  }

  get username(): string | null {
    return this.authService.getUsername();
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload(); // or use Router to navigate
  }
}
