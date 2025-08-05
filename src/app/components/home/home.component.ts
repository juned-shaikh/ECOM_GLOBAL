import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) { }
  services = [
    {
      icon: 'bi-cart-check',
      title: 'Ecommerce',
      description: 'Complete e-commerce solutions from store setup to sales growth and brand expansion to the next level.'
    },
    {
      icon: 'bi-code-slash',
      title: 'Website Development',
      description: 'Custom website development solutions tailored to elevate your brand, enhance user experience, and drive online growth.'
    },
    {
      icon: 'bi-megaphone',
      title: 'Digital Marketing',
      description: 'Result-driven digital marketing solutions to boost your online visibility, engage your audience, and accelerate business growth.'
    },

  ];

  benefits = [
    {
      icon: 'bi-award',
      title: 'Proven Expertise',
      description: 'Years of experience helping ecommerce businesses succeed in domestic & global e-commerce marketplace.'
    },
    {
      icon: 'bi-people',
      title: 'Dedicated Support',
      description: 'Personalized consulting with dedicated account managers for your account.'
    },
    {
      icon: 'bi-lightning',
      title: 'Fast Implementation',
      description: 'We quickly implement strategies to drive your brand’s growth on a global scale.'
    }
  ];

  navigateToContact() {
    this.router.navigate(['/contact']).then(() => {
      window.scrollTo(0, 0);
    });
  }

}
