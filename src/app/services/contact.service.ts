import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import { ContactForm, ContactSubmissionResponse } from '../models/contact.model';
import { environment } from '../../environments/environment';

// Declare EmailJS from CDN
declare const emailjs: any;

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // EmailJS configuration from environment
  private readonly SERVICE_ID = environment.emailjs.serviceId;
  private readonly TEMPLATE_ID = environment.emailjs.templateId;
  private readonly PUBLIC_KEY = environment.emailjs.publicKey;
  private readonly RECIPIENT_EMAIL = environment.emailjs.recipientEmail;

  constructor() {
    // Initialize EmailJS with your public key when available
    this.initializeEmailJS();
  }

  private initializeEmailJS(): void {
    // Wait for EmailJS to load from CDN
    if (typeof emailjs !== 'undefined' && this.PUBLIC_KEY && this.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(this.PUBLIC_KEY);
    } else {
      // Retry after a short delay if EmailJS hasn't loaded yet
      setTimeout(() => {
        if (typeof emailjs !== 'undefined' && this.PUBLIC_KEY && this.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
          emailjs.init(this.PUBLIC_KEY);
        }
      }, 1000);
    }
  }

  submitContactForm(formData: ContactForm): Observable<ContactSubmissionResponse> {
    // Check if EmailJS is available and properly configured
    if (!this.isEmailJSAvailable() || !this.isEmailJSConfigured()) {
      console.warn('EmailJS not available or configured. Using mock response.');
      return of({
        success: true,
        message: 'Thank you for your message! We will get back to you within 24 hours. (Note: Email functionality is not yet configured)'
      }).pipe(delay(1000)); // Add delay to simulate real API call
    }

    // Prepare template parameters for EmailJS
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'Not provided',
      company: formData.company || 'Not provided',
      message: formData.message,
      to_email: this.RECIPIENT_EMAIL,
      reply_to: formData.email
    };

    // Send email using EmailJS
    return from(
      emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams)
    ).pipe(
      map((response) => {
        console.log('Email sent successfully:', response);
        return {
          success: true,
          message: 'Thank you for your message! We will get back to you within 24 hours.'
        };
      }),
      catchError((error) => {
        console.error('Email sending failed:', error);
        return of({
          success: false,
          message: 'Sorry, there was an error sending your message. Please try again or contact us directly.'
        });
      })
    );
  }

  private isEmailJSAvailable(): boolean {
    return typeof emailjs !== 'undefined' && emailjs !== null;
  }

  private isEmailJSConfigured(): boolean {
    return this.SERVICE_ID !== 'YOUR_SERVICE_ID' && 
           this.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' && 
           this.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' &&
           this.RECIPIENT_EMAIL !== 'your-email@example.com';
  }

  // Alternative method using a simple backend API
  submitContactFormToBackend(formData: ContactForm): Observable<ContactSubmissionResponse> {
    // This would be used if you have a backend API
    // Example using HttpClient (you'd need to inject HttpClient)
    
    // return this.http.post<ContactSubmissionResponse>('/api/contact', formData)
    //   .pipe(
    //     catchError((error) => {
    //       console.error('Contact form submission failed:', error);
    //       return of({
    //         success: false,
    //         message: 'Sorry, there was an error sending your message. Please try again.'
    //       });
    //     })
    //   );
    
    // For now, return a mock response
    return from([{
      success: true,
      message: 'Thank you for your message! We will get back to you within 24 hours.'
    }]);
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
