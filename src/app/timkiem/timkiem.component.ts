import { Component, inject } from '@angular/core';
import { ProductInterface } from '../product-interface';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-timkiem',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './timkiem.component.html',
  styleUrl: './timkiem.component.css'
})
export class TimkiemComponent {
keyword:string="";
productSearch : ProductInterface[] = [];
prductService:ProductService= inject(ProductService);
constructor(private productService:ProductService,private router:Router){}

ngOnInit() {
  this.keyword = this.productService.getKeyword();
  console.log(this.keyword);
  this.productService.getListProducts('http://localhost:3000/tour').then((data:ProductInterface[])=>{
    this.productSearch = data.filter((product:ProductInterface) => product.title.toLowerCase().includes(this.keyword.toLowerCase()));
    console.log(this.productSearch);
  }
  );
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
