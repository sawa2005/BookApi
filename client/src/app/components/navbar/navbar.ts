import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  darkMode$!: Observable<boolean>;

  constructor(
    private authService: AuthService,
    public themeService: ThemeService
  ) {}

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  get username(): string | null {
    return this.authService.getUsername();
  }

  ngOnInit() {
    this.darkMode$ = this.themeService.darkMode$;
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
