import { Component, inject } from '@angular/core';
import { ProductInterface } from '../product-interface';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-chitietsanpham',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './chitietsanpham.component.html',
  styleUrl: './chitietsanpham.component.css'
})
export class ChitietsanphamComponent {
 
detail?:ProductInterface;
constructor(private route:ActivatedRoute){}
productService : ProductService = inject(ProductService)

ngOnInit(){
     //lấy id của sản phẩm thông qua activatedrouted của angular
     const id = this.route.snapshot.paramMap.get('id');
     console.log(id);
     this.productService.getProductDetail('http://localhost:3000/tour/'+id).then((data:ProductInterface)=>{
       this.detail = data;
      //  console.log(this.detail);
     } );  
}
addCart(quantity:string):void{
  if(this.detail){
    this.productService.addCart(this.detail,parseInt(quantity));
    console.log(this.productService.getCart());
    
  }
}
}
