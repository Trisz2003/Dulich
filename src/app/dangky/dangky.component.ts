import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Route } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import {  NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-dangky',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './dangky.component.html',
  styleUrl: './dangky.component.css'
})
export class DangkyComponent {
  email:string = "";
  username:string = "";
  password:string ="";
  repassword:string = "";
  gender:string="Giới tính";
  check:boolean = false;
  
  isEmailValid(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  isPasswordValid(password: string): boolean {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    // (?=.*\d)        //bao gồm ít nhất một chữ số
    // (?=.*[a-z])     //bao gồm ít nhất một chữ cái thường
    // (?=.*[A-Z])     //bao gồm ít nhất một chữ cái viết hoa
    // .{8,20}         //có từ 6 đến 20 ký tự
    return re.test(password);
  }
  constructor(private router:Router,private toast:NgToastService){}
async onSubmit(): Promise<void>{
  if(!this.email || !this.username || !this.password || !this.repassword || !this.gender || !this.check){
    return;
  }
  if(this.password!==this.repassword){
    return;
  }
  if(!this.isEmailValid(this.email)){
    return;
  }
  if(!this.isPasswordValid(this.password)){
    return;
  }
  
  //check trùng username email
  try {
    const reaponse = await fetch('http://localhost:3000/users?username='+this.username);
    const data = await reaponse.json();
    if(data.length>0){
      // alert("tên đăng nhập đã tồn tại");
      this.toast.error({detail:"Cảnh báo",summary:'Tên đăng nhập đã tồn tại',duration:2000});
      return;
    }  
  } catch (error) {
    console.error('Lỗi ',error)
  }

  try {
    const reaponse = await fetch('http://localhost:3000/users?email='+this.email);
    const data = await reaponse.json();
    if(data.length>0){
      // alert("email đã tồn tại");
      this.toast.error({detail:"Cảnh báo",summary:'Email đã tồn tại',duration:5000});
      return;
    }  
  } catch (error) {
    console.error('Lỗi ',error)
  }

  const hashedPassword = bcrypt.hashSync(this.password, 10);
const user = {
  username: this.username,
  email:this.email,
  password:hashedPassword,
  gender:this.gender,
  role:"user",
}
console.log(user);

const url = 'http://localhost:3000/users'; // Thay đổi URL theo cài đặt JSON Server
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };
  try {
    const reaponse = await fetch(url,options);
    const data = await reaponse.json();
    console.log("Đã thêm thành công",data);
    this.toast.success({detail:"Thành công",summary:'Bạn đã đăng ký thành công',duration:5000});
    this.router.navigate(['/dangnhap']);
  } catch (error) {
    console.error('Lỗi đăng ký',error)
    this.toast.error({detail:"Cảnh báo",summary:'Đăng ký thất bại',duration:5000});
  }
}
}
