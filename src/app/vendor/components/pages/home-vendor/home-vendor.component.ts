import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/vendor/Product/product.service';

@Component({
  selector: 'app-home-vendor',
  templateUrl: './home-vendor.component.html',
  styleUrls: ['./home-vendor.component.css']
})
export class HomeVendorComponent implements OnInit {

  constructor(private router:Router, private productService : ProductService) { }

  products :any[]=[];
  dataLoaded:boolean=false;

  searchString:string = '';


  selectedProduct:any[]=[];


  loadError : boolean=false;

  ngOnInit(): void {
    this.productService.getProducts().subscribe(res=>{
      console.log(res);
      this.products=res;
      this.dataLoaded=true;
    },(err)=>{
      console.log(err.error)
      this.loadError = true
    })
  }

  addProduct(){
    this.router.navigateByUrl('vendor/addproduct');
  }

  openProduct(id:any){
    this.router.navigateByUrl("/vendor/product/"+id);
  }

  status:string = 'all';

  toggleStatus(status:string){
    this.status = status;
    console.log(this.status)
  }

  selectToggle(id:number){
    for(let i=0;i<this.selectedProduct.length;i++){
      if(this.selectedProduct[i]==id){
        this.selectedProduct.splice(i,1);
        console.log(this.selectedProduct);
        return;
      }
    }

    this.selectedProduct.push(id);
    console.log(this.selectedProduct);
  }

  openSelectedProducts(){
    if(this.selectedProduct.length==0) return;
    for(let i=0;i<this.selectedProduct.length;i++){
      window.open("vendor/product/"+this.selectedProduct[i]);
    }
  }


}
