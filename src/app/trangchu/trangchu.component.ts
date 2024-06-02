import { Component,inject } from '@angular/core';
import { ProductInterface } from '../product-interface';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-trangchu',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './trangchu.component.html',
  styleUrl: './trangchu.component.css'
})
export class TrangchuComponent {
news : ProductInterface[]=[];
tourWorld: ProductInterface[]=[];
tourBoat: ProductInterface[]=[];
prductService: ProductService =inject(ProductService);
constructor(private router:Router){
  this.prductService.getListProducts('http://localhost:3000/tour?type=tour%20n%C6%B0%E1%BB%9Bc%20ngo%C3%A0i').then((data:ProductInterface[])=>{
    this.tourWorld = data;
    // console.log(this.tourWorld);
  }
  );

  this.prductService.getListProducts('http://localhost:3000/tour?type=tour%20du%20thuy%E1%BB%81n').then((data:ProductInterface[])=>{
    this.tourBoat = data;
    // console.log(this.tourBoat);
  }
  );
  
  this.prductService.getListProducts('http://localhost:3000/news').then((data:ProductInterface[])=>{
    this.news = data;
    console.log(this.news);
  });
  



  // this.prductService.getListProducts('http://localhost:3000/products?kind=quốc tế').then((data:ProductInterface[])=>{
  //   this.productsQuocTe = data;
  //   console.log(this.productsQuocTe);
  // }
  // );
}
onSearch(searchInput: string) {
  this.prductService.setKeyword(searchInput);
  console.log(searchInput);
  if(this.router.url === '/timkiem'){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/timkiem']);
    }else{  
      this.router.navigate(['/timkiem']);
    }
}


}
