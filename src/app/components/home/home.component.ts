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
      description: 'Complete e-commerce solutions from store setup to payment integration and inventory management.'
    },
    {
      icon: 'bi-code-slash',
      title: 'Website Development',
      description: 'Custom responsive websites built with modern technologies for optimal performance and user experience.'
    },
    {
      icon: 'bi-megaphone',
      title: 'Digital Marketing',
      description: 'Strategic digital marketing campaigns to boost your online presence and drive targeted traffic.'
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
      description: 'Personalized consulting with dedicated account managers for your account'
    },
    {
      icon: 'bi-lightning',
      title: 'Fast Implementation',
      description: 'Personalized consulting with dedicated account managers for your account'
    }
  ];

  navigateToContact() {
    this.router.navigate(['/contact']).then(() => {
      window.scrollTo(0, 0);
    });
  }

}
