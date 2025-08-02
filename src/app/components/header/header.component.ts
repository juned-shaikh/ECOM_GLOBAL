import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route || (route === '/home' && this.router.url === '/');
  }

  navigateToService(platformName: string) {
    this.closeMenu();
    this.router.navigate(['/services']).then(() => {
      // Wait a bit for the page to load, then scroll to the platform card
      setTimeout(() => {
        const element = document.getElementById(`platform-${platformName.toLowerCase().replace(/\s+/g, '-')}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    });
  }
}
