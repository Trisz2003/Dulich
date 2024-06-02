import { Component, inject } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-giohang',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './giohang.component.html',
  styleUrl: './giohang.component.css'
})
export class GiohangComponent {
cart:any=[];
productService: ProductService = inject(ProductService);
ngOnInit(){
  this.cart=this.productService.getCart();
  console.log(this.cart);
  
}
sumMoney(): number {
  return this.productService.getSumMoney();
}
deleteCart(id: number): void {
  this.productService.deleteCart(id);
  this.cart = this.productService.getCart();
}
}
