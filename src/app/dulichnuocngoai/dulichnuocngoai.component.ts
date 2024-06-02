import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductInterface } from '../product-interface';
import { ProductService } from '../product.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dulichnuocngoai',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './dulichnuocngoai.component.html',
  styleUrl: './dulichnuocngoai.component.css'
})
export class DulichnuocngoaiComponent {
  tourWorld:  ProductInterface[]=[];
  prductService: ProductService =inject(ProductService);
  sort: string = 'Sắp xếp';
  selectedSort:string = "Sắp xếp";
constructor(){
  this.prductService.getListProducts('http://localhost:3000/tour?type=tour%20n%C6%B0%E1%BB%9Bc%20ngo%C3%A0i').then((data:ProductInterface[])=>{
    this.tourWorld = data;
    console.log(this.tourWorld);
  }
  );
}


onSort(): void {
  if (this.sort === 'asc') {
    this.tourWorld.sort((a, b) => a.price - b.price); // Sắp xếp tăng dần
  } else {
    this.tourWorld.sort((a, b) => b.price - a.price); // Sắp xếp giảm dần
  }
}
// onSortChange(): void {
//   if (this.selectedSort === 'asc') {
//     this.productsHot.sort((a, b) => a.price - b.price); // Sắp xếp tăng dần

//   } else {
//     this.productsHot.sort((a, b) => b.price - a.price); // Sắp xếp giảm dần

//   }
// }
}
