import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(
    localStorage.getItem('isDarkMode') === 'true'
  );
  darkMode$ = this.darkModeSubject.asObservable();

  constructor() {
    // Sync on startup
    this.applyTheme(this.darkModeSubject.value);
  }

  toggleTheme(): void {
    const newValue = !this.darkModeSubject.value;
    this.darkModeSubject.next(newValue);
    localStorage.setItem('isDarkMode', newValue.toString());
    this.applyTheme(newValue);
  }

  private applyTheme(isDark: boolean): void {
    const html = document.documentElement;
    if (isDark) {
      document.body.classList.add('dark-mode');
      html.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      html.classList.remove('dark-mode');
    }
  }
}
