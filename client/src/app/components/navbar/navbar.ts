import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common'; // ⬅️ import NgIf

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // simple token check
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload(); // or use Router to navigate
  }
}
