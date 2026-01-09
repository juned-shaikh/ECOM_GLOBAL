import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Platform {
  name: string;
  logo: string;
  description: string;
  features: string[];
  marketReach: string;
  category: string;
  color: string;
  bgColor: string;
}

interface ServiceCategory {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

  constructor(private router: Router) { }

  platforms: Platform[] = [
    {
      name: 'Amazon Account Managment',
      logo: '',
      description: 'World\'s largest e-commerce marketplace with global reach across 20+ countries.',
      features: ['Seller account launch/onboarding',
        'Product listing/ cataloguing',
        'Advertisement/PPC management ',
        'Account health and performance monitoring',
        'FBA Management',
        'Reporting & analysis',
        'A plus listing (Premium,Basic)',
        'Complete account management',],
      marketReach: '300M+ Active Users',
      category: 'Global Marketplace',
      color: '#FF9900',
      bgColor: '#FFF3E0'
    },
    {
      name: 'Shopify',
      logo: 'bi-shop',
      description: 'Leading e-commerce platform for building custom online stores with global capabilities.',
      features: ['Seller account launch/onboarding',
'Product listing/ cataloguing',
'Advertisement/PPC management ',
'Account health and performance monitoring',
'Reporting & analysis',
'Complete account management',],
      marketReach: '175+ Countries',
      category: 'E-commerce Platform',
      color: '#7AB55C',
      bgColor: '#F1F8E9'
    },
    {
      name: 'Flipkart',
      logo: 'bi-cart4',
      description: 'India\'s leading e-commerce platform with massive domestic market penetration.',
      features: ['Seller account launch/onboarding',
        'Product listing/ cataloguing',
        'Advertisement/PPC management ',
        'Account health and performance monitoring',
        'Reporting & analysis',
        'Complete account management',],
      marketReach: '450M+ Registered Users',
      category: 'Indian Marketplace',
      color: '#047BD6',
      bgColor: '#E3F2FD'
    },
    {
      name: 'Meesho',
      logo: 'bi-people',
      description: 'Social commerce platform enabling resellers and small businesses to sell online.',
      features: ['Seller account launch/onboarding',
        'Product listing/ cataloguing',
        'Advertisement/PPC management ',
        'Account health and performance monitoring',
        'Reporting & analysis',
        'Complete account management',],
      marketReach: '100M+ Users',
      category: 'Social Commerce',
      color: '#E91E63',
      bgColor: '#FCE4EC'
    },
    {
      name: 'eBay',
      logo: 'bi-globe',
      description: 'Global online auction and marketplace platform with international shipping.',
      features: ['Seller account launch/onboarding',
        'Product listing/ cataloguing',
        'Advertisement/PPC management ',
        'Account health and performance monitoring',
        'Reporting & analysis',
        'Complete account management',],
      marketReach: '190+ Countries',
      category: 'Global Marketplace',
      color: '#E53238',
      bgColor: '#FFEBEE'
    },
    {
      name: 'Walmart',
      logo: 'bi-building',
      description: 'America\'s largest retailer with growing e-commerce and global marketplace presence.',
      features: ['Seller account launch/onboarding',
        'Product listing/ cataloguing',
        'Advertisement/PPC management ',
        'Account health and performance monitoring',
        'Reporting & analysis',
        'Complete account management',],
      marketReach: '240M+ Weekly Customers',
      category: 'Retail Marketplace',
      color: '#004C91',
      bgColor: '#E8F4FD'
    },
    {
      name: 'Etsy',
      logo: 'bi-heart',
      description: 'Global marketplace for unique, creative, and handmade items from independent sellers.',
      features: ['Seller account launch/onboarding',
        'Product listing/ cataloguing',
        'Advertisement/PPC management ',
        'Account health and performance monitoring',
        'Reporting & analysis',
        'Complete account management',],
      marketReach: '90M+ Active Buyers',
      category: 'Creative Marketplace',
      color: '#F16521',
      bgColor: '#FFF3E0'
    },
    {
      name: 'Myntra',
      logo: 'bi-bag',
      description: 'India\'s leading fashion and lifestyle e-commerce platform owned by Flipkart.',
      features: ['Seller account launch/onboarding',
        'Product listing/ cataloguing',
        'Advertisement/PPC management ',
        'Account health and performance monitoring',
        'Reporting & analysis',
        'Complete account management',],
      marketReach: '50M+ Annual Shoppers',
      category: 'Fashion Marketplace',
      color: '#FF3F6C',
      bgColor: '#FCE4EC'
    },
    {
      name: 'Ajio',
      logo: 'bi-star',
      description: 'Reliance\'s fashion and lifestyle platform targeting young, trendy consumers in India.',
      features: ['Seller account launch/onboarding',
        'Product listing/ cataloguing',
        'Advertisement/PPC management ',
        'Account health and performance monitoring',
        'Reporting & analysis',
        'Complete account management',],
      marketReach: '35M+ Users',
      category: 'Fashion Platform',
      color: '#D4AF37',
      bgColor: '#FFFDE7'
    }
  ];

  serviceCategories: ServiceCategory[] = [
    {
      title: 'Platform Setup & Integration',
      description: 'Complete setup and integration across all major e-commerce platforms',
      icon: 'bi-gear-fill',
      features: [
        'Account creation and verification',
        'Store setup and configuration',
        'Payment gateway integration',
        'Shipping and logistics setup'
      ]
    },
    {
      title: 'Product Listing & Optimization',
      description: 'Professional product listings optimized for maximum visibility and sales',
      icon: 'bi-list-ul',
      features: [
        'SEO-optimized product titles',
        'High-quality product images',
        'Compelling product descriptions',
        'Keyword research and optimization'
      ]
    },
    {
      title: 'Inventory & Order Management',
      description: 'Streamlined inventory and order management across multiple platforms',
      icon: 'bi-boxes',
      features: [
        'Multi-platform inventory sync',
        'Automated order processing',
        'Stock level monitoring',
        'Return and refund management'
      ]
    },
    {
      title: 'Marketing & Advertising',
      description: 'Comprehensive marketing strategies to boost your sales and visibility',
      icon: 'bi-megaphone-fill',
      features: [
        'Platform-specific advertising campaigns',
        'Social media marketing',
        'Influencer partnerships',
        'Email marketing automation'
      ]
    },
    {
      title: 'Analytics & Reporting',
      description: 'Detailed analytics and reporting to track performance and growth',
      icon: 'bi-graph-up-arrow',
      features: [
        'Sales performance tracking',
        'Customer behavior analysis',
        'ROI measurement',
        'Competitive analysis'
      ]
    },
    {
      title: 'Customer Support',
      description: '24/7 customer support to ensure smooth operations and customer satisfaction',
      icon: 'bi-headset',
      features: [
        '24/7 customer service',
        'Multi-language support',
        'Live chat integration',
        'Customer feedback management'
      ]
    }
  ];

  getFilteredPlatforms(category: string): Platform[] {
    if (category === 'all') {
      return this.platforms;
    }
    return this.platforms.filter(platform =>
      platform.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  navigateToContact() {
    this.router.navigate(['/contact']).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
