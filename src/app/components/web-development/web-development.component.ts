import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-web-development',
  standalone: true,
  imports: [],
  templateUrl: './web-development.component.html',
  styleUrl: './web-development.component.css'
})
export class WebDevelopmentComponent {
  constructor(private router: Router) { }

  navigateToContact() {
    this.router.navigate(['/contact']).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
