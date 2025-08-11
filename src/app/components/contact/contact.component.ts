import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';
import { ContactForm } from '../../models/contact.model';
import { COUNTRY_CODES, POPULAR_COUNTRY_CODES, CountryCode } from '../../data/country-codes';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;
  showAllCountries = false;
  searchTerm = '';

  // Use comprehensive country codes data
  allCountryCodes: CountryCode[] = COUNTRY_CODES;
  popularCountryCodes: CountryCode[] = POPULAR_COUNTRY_CODES;

  get displayedCountryCodes(): CountryCode[] {
    const codes =  this.allCountryCodes;

    if (!this.searchTerm) {
      return codes;
    }

    return codes.filter(country =>
      country.country.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      country.code.includes(this.searchTerm) ||
      country.countryCode.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['+91'],
      phone: [''],
      company: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitMessage = '';

      const formData: ContactForm = this.contactForm.value;

      // Use EmailJS (recommended) - change to submitToNetlify() for Netlify Forms
      this.contactService.submitContactForm(formData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.submitSuccess = response.success;
          this.submitMessage = response.message;

          if (response.success) {
            this.contactForm.reset();
            // Reset country code to default after form reset
            this.contactForm.patchValue({ countryCode: '+91' });
          }
        },
        error: (error) => {
          this.isSubmitting = false;
          this.submitSuccess = false;
          this.submitMessage = 'An error occurred. Please try again later.';
          console.error('Contact form error:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} is required.`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address.';
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${this.getFieldDisplayName(fieldName)} must be at least ${requiredLength} characters.`;
      }
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      company: 'Company',
      message: 'Message'
    };
    return displayNames[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }
}
