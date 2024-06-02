import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductInterface } from '../product-interface';
import { ProductService } from '../product.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dulichtrongnuoc',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './dulichtrongnuoc.component.html',
  styleUrl: './dulichtrongnuoc.component.css'
})
export class DulichtrongnuocComponent {
tourCountry : ProductInterface[]=[];
prServide : ProductService = inject(ProductService);
sort: string = 'Sắp xếp';

constructor(){
  this.prServide.getListProducts('http://localhost:3000/tour?type=tour%20trong%20n%C6%B0%E1%BB%9Bc').then((data:ProductInterface[])=>{
    this.tourCountry = data;
    console.log(this.tourCountry);
  });

}

onSort(): void {
  if (this.sort === 'asc') {
    this.tourCountry.sort((a, b) => a.price - b.price); // Sắp xếp tăng dần
  } else {
    this.tourCountry.sort((a, b) => b.price - a.price); // Sắp xếp giảm dần
  }
}
}
