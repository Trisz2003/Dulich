import { Component,inject } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user.service';
import { NgToastModule ,NgToastService} from 'ng-angular-popup';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../email.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-chang-password',
  standalone: true,
  imports: [NgToastModule,FormsModule,CommonModule],
  templateUrl: './chang-password.component.html',
  styleUrl: './chang-password.component.css'
})
export class ChangPasswordComponent {
 email:string="";
password:string = "";
repassword:string="";
userService:UserService=inject(UserService);

constructor(private router:Router,private toast : NgToastService,private emailService:EmailService){}
 // Lấy email từ localStorage
 ngOnInit() {
  this.email = localStorage.getItem('resetEmail') ?? '';
  console.log(this.email);
  
 }


  async resetPassword(): Promise<void>{
    if(!this.password || !this.repassword){
      return;
    }
    if(this.password!==this.repassword){
      return;
    }
 
    try {
        const response = await fetch('http://localhost:3000/users?email='+this.email);
        const data = await response.json();
        console.log(data);
        
        if(data.length==0){
          this.toast.error({detail:"Lỗi!",summary:'Email không tồn tại',duration:5000});
          // alert('Email không tồn tại');
          return;
        }
        
  
        const dataUpdate = data[0];
       
        const hashedPassword = bcrypt.hashSync(this.password, 10);
        dataUpdate.password = hashedPassword;
        console.log(dataUpdate);

        const url = 'http://localhost:3000/users/' + dataUpdate.id; // Thay đổi URL theo cài đặt JSON Server
            const options = {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(dataUpdate)
            };
          try {
            const reaponse = await fetch(url,options);
            const data = await reaponse.json();
            console.log("Đã đổi thành công",data);
            localStorage.removeItem('resetEmail');
            this.toast.success({detail:"Thành công",summary:'Bạn đã đổi mật khẩu thành công',duration:5000});
            this.router.navigate(['/dangnhap']);
          } catch (error) {
            console.error('Lỗi ',error)
            this.toast.error({detail:"Cảnh báo",summary:'Đổi mật khẩu thất bại',duration:5000});
          }
            } catch (error) {
              console.log('Lỗi',error);
              
            }
  
    }
  // async resetPassword(): Promise<void> {
  //   if (!this.password) {
  //     this.toast.error({ detail: "Lỗi!", summary: 'Mật khẩu không được để trống', duration: 5000 });
  //     return;
  //   }
  
  //   try {
  //     this.email = this.emailService.getEmail();
  //     console.log(this.email);
  //     const response = await fetch('http://localhost:3000/users?email=' + this.email);
  //     const data = await response.json();
  //     console.log(data);
  
  //     if (data.length === 0) {
  //       this.toast.error({ detail: "Lỗi!", summary: 'Email không tồn tại', duration: 5000 });
  //       return;
  //     }
  
  //     const dataUpdate = data[0];
  //     const hashedPassword = bcrypt.hashSync(this.password, 10);
  //     dataUpdate.password = hashedPassword; // Cập nhật mật khẩu mới đã mã hóa
  
  //     // Gửi yêu cầu cập nhật mật khẩu lên server
  //     // Bạn cần thay thế 'http://localhost:3000/users' bằng endpoint thực tế của API cập nhật mật khẩu
  //     const updateResponse = await fetch('http://localhost:3000/users/' + dataUpdate.id, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(dataUpdate)
  //     });
  
  //     if (updateResponse.ok) {
  //       this.toast.success({ detail: "Thành công", summary: 'Mật khẩu đã được cập nhật', duration: 5000 });
  //       this.router.navigate(['/dangnhap']); // Chuyển hướng người dùng về trang đăng nhập
  //     } else {
  //       throw new Error('Cập nhật mật khẩu thất bại');
  //     }
  //   } catch (error) {
  //     console.error('Lỗi:', error);
  //     this.toast.error({ detail: "Lỗi!", summary: 'Có lỗi xảy ra trong quá trình cập nhật mật khẩu', duration: 5000 });
  //   }
  // }
  
}
