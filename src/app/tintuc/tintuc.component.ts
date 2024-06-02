import { Component,inject } from '@angular/core';
import { ProductInterface } from '../product-interface';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tintuc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tintuc.component.html',
  styleUrl: './tintuc.component.css'
})
export class TintucComponent {
news: ProductInterface[]=[];
prService: ProductService = inject(ProductService);
constructor(){
  this.prService.getListProducts('http://localhost:3000/news').then((data:ProductInterface[])=>{
    this.news = data;
    console.log(this.news);
  });

}
}
