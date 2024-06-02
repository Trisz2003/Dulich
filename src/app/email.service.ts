import { Injectable } from '@angular/core';
import * as emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly serviceId = 'service_2zyy3cl'; // Thay thế bằng Service ID của bạn
  private readonly templateId = 'template_59rh3nk'; // Thay thế bằng Template ID của bạn
  private readonly publicKey = 'IoxnG30Hb68dmxodb'; // Thay thế bằng Public Key của bạn

  constructor() {
    emailjs.init(this.publicKey); // Khởi tạo EmailJS với Public Key
  }

  sendResetPasswordEmail(email: string): Promise<any> {
    const templateParams = {
      email_field: email
    };

    return emailjs.send(this.serviceId, this.templateId, templateParams)
      .then(
        (response: any) => {
          console.log('Email sent successfully:', response);
          localStorage.setItem('resetEmail', email);
          return response;
        },
        (error: any) => {
          console.error('Error sending email:', error);
          throw error;
        }
      );
  }

}
