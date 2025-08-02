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
  constructor(private router: Router) {}
  services = [
    {
      icon: 'bi-globe',
      title: 'Global Market Entry',
      description: 'Strategic guidance for entering international e-commerce markets with confidence and success.'
    },
    {
      icon: 'bi-graph-up-arrow',
      title: 'Sales Optimization',
      description: 'Data-driven strategies to maximize your online sales and improve conversion rates globally.'
    },
    {
      icon: 'bi-gear',
      title: 'Platform Integration',
      description: 'Seamless integration with major e-commerce platforms and international payment systems.'
    },
    {
      icon: 'bi-shield-check',
      title: 'Compliance & Security',
      description: 'Ensure your global operations meet international regulations and security standards.'
    }
  ];

  benefits = [
    {
      icon: 'bi-award',
      title: 'Proven Expertise',
      description: 'Years of experience helping businesses succeed in global e-commerce markets.'
    },
    {
      icon: 'bi-people',
      title: 'Dedicated Support',
      description: 'Personalized consulting with dedicated account managers for your success.'
    },
    {
      icon: 'bi-lightning',
      title: 'Fast Implementation',
      description: 'Quick deployment of strategies to get you selling globally as soon as possible.'
    }
  ];

  navigateToContact() {
    this.router.navigate(['/contact']).then(() => {
      window.scrollTo(0, 0);
    });
  }

}
