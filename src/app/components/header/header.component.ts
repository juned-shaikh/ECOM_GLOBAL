import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  private routerSubscription: Subscription = new Subscription();

  constructor(private router: Router) { }

  ngOnInit() {
    // Subscribe to router events to scroll to top on route changes
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }

  ngOnDestroy() {
    // Clean up subscription to prevent memory leaks
    this.routerSubscription.unsubscribe();
  }

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
