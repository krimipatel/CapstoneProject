import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/vendor/Product/product.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productDetails: boolean = true;
  addLocation: boolean = false;
  loadingClass: string = "";
  showDropDown: boolean = false;
  searching = new FormControl();
  listCategoryALl: string[] = [];
  selectedCategory: string = "";
  tax_rate_stripe_code: any = 0;

  // ======== Location variables =========
  regions: any;
  regionsWithFsa: any = [];
  SelectedFSAs: string[] = [];

  searchString!:string;

  requestPending:boolean=false;

  error:string ='';

  hardCodedList = ['L0A', 'L0B', 'L0C', 'L0G', 'L0H', 'L0J', 'L0N', 'L0P', 'L1A', 'L1B', 'L1C', 'L1E', 'L1G', 'L1H', 'L1J', 'L1K', 'L1L', 'L1M', 'L1N', 'L1P', 'L1R', 'L1S', 'L1T', 'L1V', 'L1W', 'L1X', 'L1Y', 'L1Z', 'L3P', 'L3R', 'L3S', 'L3T', 'L3X', 'L3Y', 'L3Z', 'L4A', 'L4B', 'L4C', 'L4E', 'L4G', 'L4H', 'L4J', 'L4K', 'L4L', 'L4M', 'L4N', 'L4S', 'L4T', 'L4V', 'L4W', 'L4X', 'L4Y', 'L4Z', 'L5A', 'L5B', 'L5C', 'L5E', 'L5G', 'L5H', 'L5J', 'L5K', 'L5L', 'L5M', 'L5N', 'L5P', 'L5R', 'L5S', 'L5T', 'L5V', 'L5W', 'L6A', 'L6B', 'L6C', 'L6E', 'L6G', 'L6H', 'L6J', 'L6K', 'L6L', 'L6M', 'L6P', 'L6R', 'L6S', 'L6T', 'L6V', 'L6W', 'L6X', 'L6Y', 'L6Z', 'L7A', 'L7B', 'L7C', 'L7E', 'L7G', 'L7J', 'L7K', 'L7L', 'L7M', 'L7N', 'L7P', 'L7R', 'L7S', 'L7T', 'L9E', 'L9J', 'L9L', 'L9N', 'L9P', 'L9R', 'L9S', 'L9T', 'L9V', 'L9W', 'L9X', 'M1B', 'M1C', 'M1E', 'M1G', 'M1H', 'M1J', 'M1K', 'M1L', 'M1M', 'M1N', 'M1P', 'M1R', 'M1S', 'M1T', 'M1V', 'M1W', 'M1X', 'M2H', 'M2J', 'M2K', 'M2L', 'M2M', 'M2N', 'M2P', 'M2R', 'M3A', 'M3B', 'M3C', 'M3H', 'M3J', 'M3K', 'M3L', 'M3M', 'M3N', 'M4A', 'M4B', 'M4C', 'M4E', 'M4G', 'M4H', 'M4J', 'M4K', 'M4L', 'M4M', 'M4N', 'M4P', 'M4R', 'M4S', 'M4T', 'M4V', 'M4W', 'M4X', 'M4Y', 'M5A', 'M5B', 'M5C', 'M5E', 'M5G', 'M5H', 'M5J', 'M5K', 'M5L', 'M5M', 'M5N', 'M5P', 'M5R', 'M5S', 'M5T', 'M5V', 'M5W', 'M5X', 'M6A', 'M6B', 'M6C', 'M6E', 'M6G', 'M6H', 'M6J', 'M6K', 'M6L', 'M6M', 'M6N', 'M6P', 'M6R', 'M6S', 'M7A', 'M7R', 'M7Y', 'M8V', 'M8W', 'M8X', 'M8Y', 'M8Z', 'M9A', 'M9B', 'M9C', 'M9L', 'M9M', 'M9N', 'M9P', 'M9R', 'M9V', 'M9W']

  productInfoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    taxable:new FormControl(false),
    tax_rate:new FormControl(0),
    tax_rate_stripe_code:new FormControl(''),
    price: new FormControl('', [Validators.required, Validators.min(0.01)]),
    shipping: new FormControl('', [Validators.required, Validators.min(0.01)]),
    productOrService: new FormControl('', [Validators.required]),
    // instockOroutofstock: new FormControl('', [Validators.required]),
    status: new FormControl('draft', [Validators.required]),
    tags: new FormControl(''),

  });

  constructor(private router:Router,private productService: ProductService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      console.log(params);
      if(params){
        this.productInfoForm.controls.name.setValue(params.productName);
        this.productInfoForm.controls.description.setValue(params.productDescription);
        this.productInfoForm.controls.price.setValue(params.price);
      }
    })

    this.listCategoryALl = this.productService.globalCategoryList;
    this.getRegions();


  }

  onNext() {
    this.productDetails = false;
    this.addLocation = true;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    console.log(this.imagesBase64);

  }


  onBack() {
    this.productDetails = true;
    this.addLocation = false;
  }


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
    this.selectedCategory = item;
    console.log(this.selectedCategory);
  }

  removeCategory() {
    this.selectedCategory = "";
  }
  //=================search category ended================//

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
      this.regionsWithFsa.push(dataToPush);
      for (let index = 0; index < res.length; index++) {
        this.SelectedFSAs.push(res[index]);
      }
      console.log(this.SelectedFSAs)
    })
  }

  deselectAllFsa(FSAs:string[]){
    for (let i = 0; i < FSAs.length; i++) {
      for (let j = 0; j < this.SelectedFSAs.length; j++) {
        if (this.SelectedFSAs[j] == FSAs[i]) {
          this.SelectedFSAs.splice(j, 1);
        }
      }
    }
    console.log(this.SelectedFSAs);
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
    for(let index = 0; index < checkboxes.length; index++) {
      let checkbox = document.getElementById(checkboxes[index]) as HTMLInputElement | null;
      if(checkbox != null) {
        checkbox.checked = false;
        this.fasChecked(checkboxes[index]);
      }
    }
  }

  //================================

  dataUpload: any;
  images: any = [];
  imagesURLs: any = [];
  imagesBase64:any=[];

  onFileSelected(event: any) {
    this.dataUpload = event.target.files;

    for (let i = 0; i < this.dataUpload.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(this.dataUpload[i]);
      reader.onload = (_event) => {
        this.imagesURLs.push(reader.result);
      }
      this.images.push(this.dataUpload[i]);
    }

    this.convertToBase64();


  }

  convertToBase64(){
    this.imagesBase64=[];
    for(let i=0;i<this.images.length;i++){
      let reader = new FileReader();
      reader.readAsDataURL(this.images[i] as Blob);
      reader.onloadend=()=>{
        var fullString = reader.result as String;
        fullString=fullString.split(",")[1];
        this.imagesBase64.push({ attachment:","+fullString+"\n"});

      }
    }




  }

  removeImage(index: any) {
    this.imagesURLs.splice(index, 1);
    this.images.splice(index, 1);

    this.convertToBase64();
  }

  discard(){
    this.router.navigateByUrl('vendor/home');
  }


  //=============varaints==========

   //-------toggles
  optionsToggle! : boolean;

  addOptions = [0]

   //-----Names
  option1Name!:string;
  option2Name!:string;
  option3Name!:string;


  //-----Values
  option1Values:string[]=[];
  option2Values:string[]=[];
  option3Values:string[]=[];

  //-----track
  option1ValuesTrack:any=[1]
  option2ValuesTrack:any=[1]
  option3ValuesTrack:any=[1]

  //----error
  optionsError:string="";

  allOptions:any=[];

  createOptions(){
    if(this.optionsToggle==false){
      this.addOptions=[0];
      this.option1Name="";
      this.option2Name="";
      this.option3Name="";
      this.option1Values=[]
      this.option2Values=[]
      this.option3Values=[]
      this.option1ValuesTrack=[1]
      this.option2ValuesTrack=[1]
      this.option3ValuesTrack=[1]


    }
    this.availableVaraints=[];
    this.selectedVariants=[];
    this.allOptions=[];

  }


  addOption(){
    this.addOptions.push(1);
  }

  removeOptions(){
    this.addOptions.pop();
  }

  addValues(op:any){
    if(op=="option1"){
      this.option1Values.push("");
      this.option1ValuesTrack.push(1);
    }
    if(op=="option2"){
      this.option2Values.push("");
      this.option2ValuesTrack.push(1);
    }
    if(op=="option3"){
      this.option3Values.push("");
      this.option3ValuesTrack.push(1);
    }

  }

  removeValues(op:any,index:any){
    if(op=="option1"){
      this.option1Values.splice(index,1);
      this.option1ValuesTrack.splice(index,1);
    }
    if(op=="option2"){
      this.option2Values.splice(index,1);
      this.option2ValuesTrack.splice(index,1);
    }
    if(op=="option3"){
      this.option3Values.splice(index,1);
      this.option3ValuesTrack.splice(index,1);
    }
  }

  availableVaraints:any=[];

  selectedVariantsIndex:any[]=[];
  selectedVariants:any[]=[];

  variantsPrice:any[]=[];


  makeVaraints(){
    var options =  []
    this.optionsError="";

    if(this.checkArrayForEmptyString(this.option1Values)==false && this.option1Name!=""){
      var option = {
        name : this.option1Name,
        values:this.option1Values
      }

      options.push(option)
    }else{
      this.optionsError="Please check all values"
    }

    if(this.addOptions.length>1){
      if(this.checkArrayForEmptyString(this.option2Values)==false && this.option2Name!=""){
        var option = {
          name : this.option2Name,
          values:this.option2Values
        }

        options.push(option)
      }else{
        this.optionsError="Please check all values"
      }
    }

    if(this.addOptions.length>2){
      if(this.checkArrayForEmptyString(this.option3Values)==false && this.option3Name!=""){
        var option = {
          name : this.option3Name,
          values:this.option3Values
        }

        options.push(option)
      }else{
        this.optionsError="Please check all values"
      }
    }
    this.allOptions=options;
    console.log(options);

    let variants = [];

    if(this.addOptions.length==1){
      for(let x=0;x<this.option1Values.length;x++){
        let v = {
          option1:this.option1Values[x],
          inventory_policy:false,
          price:this.productInfoForm.controls.price.value
        }
        variants.push(v)
      }
    }

    if(this.addOptions.length==2){
      for(let x=0;x<this.option1Values.length;x++){
        for(let y=0;y<this.option2Values.length;y++){
          let v = {
            option1 : this.option1Values[x],
            option2 :  this.option2Values[y],
            price:this.productInfoForm.controls.price.value,
            inventory_policy:false,
          }

          variants.push(v);
        }
      }
    }

    if(this.addOptions.length==3){
      for(let x=0;x<this.option1Values.length;x++){
        for(let y=0;y<this.option2Values.length;y++){
          for(let z=0;z<this.option3Values.length;z++){
            let v = {
              option1 : this.option1Values[x],
              option2 :  this.option2Values[y],
              option3 :  this.option3Values[z],
              price:this.productInfoForm.controls.price.value,
              inventory_policy:false,
            }

            variants.push(v);
          }
        }
      }
    }



    console.log(variants);
    this.availableVaraints = variants;


  }

  variantSelection(index:any){
    if(this.selectedVariantsIndex[index]==true)
    {
      this.selectedVariants.push(this.availableVaraints[index]);
    }else{
      this.selectedVariants.splice(index,1);
    }

    console.log(this.selectedVariants);

  }


   checkArrayForEmptyString(array:any)  {
      for(let i=0;i<array.length;i++){
        if(array[i]=="")
        {
          return true;
        }
      }
      return false;
   }


   getPrice(){
    console.log(this.selectedVariants);
   }
  //==============================

 //==========Regions Selection============
  getRegions() {
    this.productService.getAreas().subscribe(res => {
      console.log(res);
      this.regions = res.area;
      console.log(this.regions);
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
  //==============================

  //=======submit data============
  onSubmit() {
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

    this.requestPending = true;
    var pd = {
      name: this.productInfoForm.controls.name.value,
      description: this.productInfoForm.controls.description.value,
      taxable:this.productInfoForm.controls.taxable.value,
      tax_rate:this.productInfoForm.controls.tax_rate.value,
      tax_rate_stripe_code:this.tax_rate_stripe_code,
      price: this.productInfoForm.controls.price.value,
      shipping: this.productInfoForm.controls.shipping.value,
      productOrService: this.productInfoForm.controls.productOrService.value,
      status: this.productInfoForm.controls.status.value,
      tags: this.allTags,
    }


    // set only the selected Variants
    var variants  = this.selectedVariants;


    //

    for(let i=0;i<variants.length;i++){
      variants[i].taxable = pd.taxable;
      variants[i].inventory_policy="continue"

    }

    if(variants.length==0){
      variants = [
        {
          inventory_policy:"continue",
          price:pd.price,
          taxable : pd.taxable,
        }
      ]
    }


    var data = {
      title:pd.name,
      body_html:pd.description,
      product_type:this.selectedCategory,
      price:pd.price,
      shipping:pd.shipping,
      tax_rate:pd.tax_rate,
      tax_rate_stripe_code: pd.tax_rate_stripe_code,
      status:pd.status,
      tags:pd.tags,
      options : this.allOptions,
      variants : variants,
      delivery_areas : this.hardCodedList,
      images:this.imagesBase64

    }

    console.log(data);

    this.productService.addProduct(data).subscribe(res=>{
      console.log(res);
      if(res=="Successfully Added Product")
      {
        location.href = '/vendor/home';
        this.requestPending = false;
      }
    },(err)=>{
      this.requestPending = false;
      console.log(err);
    })

  }




}
