export interface ContactForm {
  name: string;
  email: string;
  countryCode?: string;
  phone?: string;
  company?: string;
  message: string;
}

export interface ContactSubmissionResponse {
  success: boolean;
  message: string;
}