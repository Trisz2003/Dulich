import { Component, inject } from '@angular/core';
import { EmailService } from '../email.service';
import { FormsModule } from '@angular/forms';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule,NgToastModule,CommonModule,RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email_field: string = '';

  constructor(private toast:NgToastService,private emailService:EmailService) { 
   
  }

  isEmailValid(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

 async sendResetPasswordEmail() {
  if(!this.isEmailValid(this.email_field)){
    return;
  }



    try {
      const reaponse = await fetch('http://localhost:3000/users?email='+this.email_field);
      const data = await reaponse.json();
    
      if(data.length===0){
        // alert("email đã tồn tại");
        this.toast.error({detail:"Cảnh báo",summary:'Email Chưa đăng ký tài khoản',duration:5000});
        return;
      } 
     
    } catch (error) {
      console.error('Lỗi ',error)
    }


 
    this.emailService.sendResetPasswordEmail(this.email_field)
      .then(response => {
        // Xử lý khi gửi email thành công
        this.toast.success({detail:"Thành công!",summary:'Email Đã được gửi vui lòng kiểm tra hộp thư của bạn',duration:5000});
        console.log('Email sent successfully:', response);
      })
      .catch(error => {
        // Xử lý khi gửi email thất bại
        this.toast.error({detail:"Lỗi!",summary:'Gửi Email thất bại',duration:5000});
        console.error('Error sending email:', error);
      });
  }
}
