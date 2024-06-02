import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-dangnhap',
  standalone: true,
  imports: [RouterModule,FormsModule,RouterModule,CommonModule,NgToastModule],
  templateUrl: './dangnhap.component.html',
  styleUrl: './dangnhap.component.css'
})
export class DangnhapComponent {
email:string = "";
password:string = "";
userService:UserService=inject(UserService);

constructor(private router:Router,private toast : NgToastService){}
async onSubmit(): Promise<void>{
  if(!this.email || !this.password){
    return;
  }
  try {
      const response = await fetch('http://localhost:3000/users?email='+this.email);
      const data = await response.json();
      if(data.length==0){
        this.toast.error({detail:"Lỗi!",summary:'Email không tồn tại',duration:5000});
        // alert('Email không tồn tại');
        return;
      }
      
      if(!bcrypt.compareSync(this.password,data[0].password)){
        this.toast.error({detail:"Lỗi!",summary:'Mật khẩu không chính xác',duration:5000});
        // alert("Mật khẩu không chính xác");
        return;
      }else{
        // alert("Đăng nhập thành công");
        this.userService.setUser(data[0]);
        this.router.navigate(['/'])
        this.toast.success({detail:"Thành công",summary:'Đăng nhập thành công',duration:5000});
        
      }
  } catch (error) {
    console.log('Lỗi',error);
    
  }

  }
}
