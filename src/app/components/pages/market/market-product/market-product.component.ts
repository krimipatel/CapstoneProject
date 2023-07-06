import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MarketService } from 'src/app/services/ResidentialUser/market/market.service';

@Component({
  selector: 'app-market-product',
  templateUrl: './market-product.component.html',
  styleUrls: ['./market-product.component.css']
})
export class MarketProductComponent implements OnInit {

  private routeSub!: Subscription;
  id:any;
  product:any;
  currentImage:any;
  selectedVariant:any;
  selectedIndex:any;

  isLoading = true;

  constructor(private route : ActivatedRoute,private marketService:MarketService) {

    }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    })

    console.log(this.id)
    this.marketService.getProduct(this.id).subscribe(res=>{
      this.isLoading = true;
      console.log(res);
      this.product=res;
      this.currentImage = this.product.images[0].src;
      if(this.product.variants.length==1)
      {
        this.selectedVariant = this.product.variants[0]
      }

      this.isLoading = false;

    })
  }

  changeImage(index:any){
    this.currentImage = this.product.images[index].src;
  }

  selectVariant(index:any){
    if (this.product.variants[index].inventory_policy=="deny") {
      return;
    }
    this.selectedVariant = this.product.variants[index];
    console.log(this.selectedVariant)
    this.selectedIndex = index;

  }

  buyNow(){

    var options_with_name = []

    for(let i=0;i<this.product.options.length;i++){
      var option = {
        name : this.product.options[i].name,
        value : this.selectedVariant.title.split(" / ")[i]
      }
      options_with_name.push(option)
    }

    var cartItem = {
      "id": this.selectedVariant.id,
      "quantity": 1,
      "variant_id": this.selectedVariant.id,
      "title": this.product.title,
      "price": this.selectedVariant.price/1,
      "final_price": this.selectedVariant.price/1,
      "sku": null,
      "grams": 0,
      "vendor": this.product.vendor,
      "taxable": this.selectedVariant.taxable,
      "product_id": this.product.id,
      "featured_image": {
        "url": this.product.images[0].src,
        "aspect_ratio": 1.0,
        "alt": "product image"
      },
      "image": this.product.images[0].src,
      "handle": this.product.handle,
      "requires_shipping": true,
      "product_title": this.product.title,
      "product_description": this.product.body_html,
      "product_type":this.product.product_type,
      "variant_title": this.selectedVariant.title,
      "variant_options": [this.selectedVariant.option1, this.selectedVariant.option2,this.selectedVariant.option3],
      "options_with_values": options_with_name
    }

    console.log(cartItem)

    this.marketService.addItem(cartItem).subscribe(res=>{
      if(res)
      {
        location.href = "/cart"
      }
    })



  }


  response:string='';


  addToCart(){

    var options_with_name = []

    for(let i=0;i<this.product.options.length;i++){
      var option = {
        name : this.product.options[i].name,
        value : this.selectedVariant.title.split(" / ")[i]
      }
      options_with_name.push(option)
    }

    var cartItem = {
      "id": this.selectedVariant.id,
      "quantity": 1,
      "variant_id": this.selectedVariant.id,
      "title": this.product.title,
      "price": this.selectedVariant.price/1,
      "final_price": this.selectedVariant.price/1,
      "sku": null,
      "grams": 0,
      "vendor": this.product.vendor,
      "taxable": this.selectedVariant.taxable,
      "product_id": this.product.id,
      "featured_image": {
        "url": this.product.images[0].src,
        "aspect_ratio": 1.0,
        "alt": "product image"
      },
      "image": this.product.images[0].src,
      "handle": this.product.handle,
      "requires_shipping": true,
      "product_title": this.product.title,
      "product_description": this.product.body_html,
      "product_type":this.product.product_type,
      "variant_title": this.selectedVariant.title,
      "variant_options": [this.selectedVariant.option1, this.selectedVariant.option2,this.selectedVariant.option3],
      "options_with_values": options_with_name
    }

    console.log(cartItem)

    this.marketService.addItem(cartItem).subscribe(res=>{
      if(res)
      {
        this.response = "Item added to Cart"
      }
    })
  }

  zoomit:boolean=false;
  innerWidth:any;
  zoomImg(){
    this.innerWidth = window.innerWidth;
    if (innerWidth>1200) {
      this.zoomit=true;
    }
  }

  removeZoom(){
    this.zoomit=false;
  }

}
