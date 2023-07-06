import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/vendor/Product/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {



  page1: boolean = true;
  page2: boolean = false;

  loadingClass: string = "";


  showDropDown: boolean = false;
  searching = new FormControl();
  listCategoryALl: string[] = [];

  productId:any;
  product:any ;


  // ======== Location variables =========
  regions: any;
  regionsWithFsa: any = [];
  SelectedFSAs: string[] = [];
  previouslySelected:string[]=[];

  searchString!:string;
  dataLoaded:boolean = false;
  tax_rate_stripe_code: any = 0;


productInfoForm = new FormGroup({
  name: new FormControl('', Validators.required),
  description: new FormControl(''),
  taxable:new FormControl(false),
  price: new FormControl('', [Validators.required, Validators.min(0.01)]),
  shipping: new FormControl('', [Validators.required, Validators.min(0.01)]),
  tax_rate:new FormControl(0),
  tax_rate_stripe_code:new FormControl(''),
  productOrService: new FormControl('', [Validators.required]),
  instockOroutofstock: new FormControl('', [Validators.required]),
  status: new FormControl('', [Validators.required]),
  tags: new FormControl(''),
  selectedCategory: new FormControl(''),
});;

  constructor(private route : ActivatedRoute,private router: Router,private productService:ProductService) { }

  private routeSub!: Subscription;

  ngOnInit(): void {

    this.routeSub = this.route.params.subscribe(params => {
      this.productId = params['id'];
    })

    this.productService.dealExist(this.productId).subscribe(res=>{
      if(res==true){
        location.href="/vendor/product/"+this.productId
      }
    })

    this.productService.getProductById(this.productId).subscribe(res=>{

      this.product = res;
      console.log(this.product);

      if(typeof(this.product.tags)=="string"){
        if(this.product.tags!=""){
          this.product.tags = this.product.tags.split(",")
        }else{
          this.product.tags=[]
        }
      }

      this.previouslySelected = this.product.delivery_areas;
      this.regionsWithFsa.push({
        name:"Already Selected Regions",
        fsa:this.previouslySelected
      })
      this.SelectedFSAs.push(...this.previouslySelected);


      this.productInfoForm.controls.name.setValue(this.product.title);
      this.productInfoForm.controls.description.setValue(this.product.body_html);
      this.productInfoForm.controls.shipping.setValue(this.product.shipping)
      this.productInfoForm.controls.tax_rate.setValue(this.product.tax_rate);
      this.productInfoForm.controls.status.setValue(this.product.status);
      this.productInfoForm.controls.selectedCategory.setValue(this.product.product_type);
      this.productInfoForm.controls.taxable.setValue(this.product.variants[0].taxable)

      // price for default variant.
      if (this.product.variants.length==1 && this.product.variants[0].title=="Default Title") {
        this.productInfoForm.controls.price.setValue(this.product.variants[0].price);
        if (this.product.variants[0].inventory_policy=='continue') {
          this.productInfoForm.controls.instockOroutofstock.setValue("inStock");
        } else{
          this.productInfoForm.controls.instockOroutofstock.setValue("outStock");
        }
      }


        this.allTags = this.product.tags;
        this.dataLoaded=true;
      })



    this.listCategoryALl = this.productService.globalCategoryList;
    this.getRegions();

  }

   //=================search category started================//
  //when input is clicked (for category)
  toggleDropDown() {
    this.showDropDown = !this.showDropDown;
  }

  //when dropdown is open and click outside (for category)
  toggleDropDownOut() {
    if (this.showDropDown == true) {
      this.toggleDropDown();
    }
  }

  //item clicked from dropdown...
  itemClicked(item: string) {
    this.productInfoForm.controls.selectedCategory.setValue(item);
  }

  removeCategory() {
    this.productInfoForm.controls.selectedCategory.setValue('');
  }
  //=================search category ended================//

   //=================image funcitons==============

   loading:boolean =false;

    deleteImage(id:any,index:any){
      var data = {
        imageId : id,
        productId : this.product.id
      }

      this.productService.deleteImage(data).subscribe(res=>{
        console.log(res);

        this.product.images.splice(index,1);

      })
    }

    addedImageFile : any;
    addedImageBase64 : any;

    completed:any = 0;

    onFileSelected(event:any){
      this.loading = true;
      for(let i=0;i<event.target.files.length;i++)
      {

        this.addedImageFile = event.target.files[i];

        const reader = new FileReader();
        reader.readAsDataURL(this.addedImageFile as Blob);
        reader.onload = (_event) => {
          var fullString = reader.result as String;
          fullString = "," + fullString.split(",")[1];
          this.addedImageBase64 = fullString;

          var image = {
            attachment: this.addedImageBase64
          }

          this.productService.addImage(this.product.id,image).subscribe(res=>{
            console.log(res);
            this.product.images.push(res.image);
            this.completed = ((i+1)/event.target.files.length)*100

            if(this.completed>90){
              console.log(this.completed);
              this.completed = 0;
              this.loading =false;
            }
          })

        }


      }





    }



   //===-========================================



  //------Tags for product and services

  allTags: string[] = [];

  getTags() {
    var newTags;
    newTags = this.productInfoForm.controls.tags.value.split(',');
    if (newTags[this.allTags.length - 1] == "") {
      newTags.pop();
    }
    for (let index = 0; index < newTags.length; index++) {
      this.allTags.push(newTags[index]);
    }
    this.productInfoForm.controls.tags.reset();
  }

  removeTag(index: any) {
    this.allTags.splice(index, 1);
    console.log(this.allTags);
  }

  onNext() {
    this.page1 = false;
    this.page2 = true;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  onCancel(){
    location.href = '/vendor/product/'+this.productId;
  }

  onBack() {
    this.page1 = true;
    this.page2 = false;
  }



  //=================== Location =======================/
  getFasForRegion(region: any) {
    console.log(region);
    //if it is already selected, then remove it from the list
    for (let index = 0; index < this.regionsWithFsa.length; index++) {
      if (this.regionsWithFsa[index].name == region) {
        //this.regionsWithFsa.splice(index,1);
        return;
      }
    }

    var data = {
      city: region
    }

    this.productService.getCode(data).subscribe(res=>{

      var dataToPush = {
        name:data.city,
        fsa:res
      }
      console.log(dataToPush);

      for (let j = 0; j < dataToPush.fsa.length; j++) {
        for (let k = 0; k < this.previouslySelected.length; k++) {
          if (this.previouslySelected[k] == dataToPush.fsa[j]) {
            dataToPush.fsa.splice(j,1)
          }
        }
      }

      console.log(dataToPush);

      this.regionsWithFsa.push(dataToPush);

      for (let index = 0; index < res.length; index++) {
        this.SelectedFSAs.push(res[index]);
      }
    })
    console.log(this.regionsWithFsa);
  }

  fasChecked(fsa: string) {
    for (let index = 0; index < this.SelectedFSAs.length; index++) {
      if (this.SelectedFSAs[index] == fsa) {
        this.SelectedFSAs.splice(index, 1);
        return;
      }
    }
    this.SelectedFSAs.push(fsa);
  }

  selectAll(checkboxes: Array<string>) {
    for(let index = 0; index < checkboxes.length; index++) {
      let checkbox = document.getElementById(checkboxes[index]) as HTMLInputElement | null;
      if(checkbox != null) {
        checkbox.checked = true;
        this.fasChecked(checkboxes[index]);
      }
    }
  }

  unselectAll(checkboxes: Array<string>) {
    console.log(checkboxes)
    for(let index = 0; index < checkboxes.length; index++) {
      let checkbox = document.getElementById(checkboxes[index]) as HTMLInputElement | null;
      if(checkbox != null) {
        checkbox.checked = false;
        this.fasChecked(checkboxes[index]);
      }
    }
  }

  getRegions() {
    this.productService.getAreas().subscribe(res => {

      this.regions = res.area;

    })
  }

  removeRegion(regionName: string) {
    for (let i = 0; i < this.regionsWithFsa.length; i++) {
      if (this.regionsWithFsa[i].name == regionName) {

        for (let j = 0; j < this.regionsWithFsa[i].fsa.length; j++) {
          for (let k = 0; k < this.SelectedFSAs.length; k++) {
            if (this.SelectedFSAs[k] == this.regionsWithFsa[i].fsa[j]) {
              this.SelectedFSAs.splice(k, 1);
            }

          }
        }
      }
    }


    for (let index = 0; index < this.regionsWithFsa.length; index++) {
      if (this.regionsWithFsa[index].name == regionName) {
        this.regionsWithFsa.splice(index, 1);
      }
    }
    console.log(this.regionsWithFsa);
    console.log(this.SelectedFSAs);
  }

  changePrice(){
    this.product.variants[0].price = this.productInfoForm.controls.price.value;
  }

  changeVariantPrice(event:any,index:any){
    this.product.variants[index].price = event.target.value
    console.log(this.product)
  }

  toggleTaxable(){



    this.productInfoForm.controls.taxable.setValue(!this.productInfoForm.controls.taxable.value)


    for(let i=0;i<this.product.variants.length;i++){
      console.log(this.productInfoForm.controls.taxable.value)
      this.product.variants[i].taxable = this.productInfoForm.controls.taxable.value;
    }

    console.log(this.product)

  }
  //===================== Submit Data= ================
  onSubmit(){
    this.loadingClass = "waiting";

    switch(this.productInfoForm.controls.tax_rate.value) {
      case '0':
        this.tax_rate_stripe_code = 'txr_1MagSHISG7OrVJAAfyeR51SO'
        break
      case '5':
        this.tax_rate_stripe_code = 'txr_1MagSOISG7OrVJAAlkpTykK4'
        break
      case '8':
        this.tax_rate_stripe_code = 'txr_1MadwVISG7OrVJAAZvMeJjSg'
        break
      case '13':
        this.tax_rate_stripe_code = 'txr_1MagRuISG7OrVJAAP1zsBm9d'
        break
    }

    console.log(this.SelectedFSAs);

    this.product.title =this.productInfoForm.controls.name.value;
    this.product.body_html = this.productInfoForm.controls.description.value;
    this.product.product_type=this.productInfoForm.controls.selectedCategory.value;
    this.product.status= this.productInfoForm.controls.status.value;
    this.product.tags=this.allTags;
    this.product.delivery_areas=this.SelectedFSAs;
    this.product.shipping = this.productInfoForm.controls.shipping.value,
    this.product.tax_rate=this.productInfoForm.controls.tax_rate.value;
    this.product.tax_rate_stripe_code =this.tax_rate_stripe_code;


    console.log(this.product);

    this.productService.editProduct(this.productId,this.product).subscribe(res=>{
      console.log(res);
      location.href="vendor/product/"+this.productId;
    })

  }

  discard(){
    this.router.navigateByUrl(`vendor/product/${this.productId}`);
  }

}
