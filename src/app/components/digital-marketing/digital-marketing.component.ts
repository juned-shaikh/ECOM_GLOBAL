import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-digital-marketing',
  standalone: true,
  imports: [],
  templateUrl: './digital-marketing.component.html',
  styleUrl: './digital-marketing.component.css'
})
export class DigitalMarketingComponent {
  constructor(private router: Router) { }
  navigateToContact() {
    this.router.navigate(['/contact']).then(() => {
      window.scrollTo(0, 0);
    });
  }

}
