import { Component, OnInit,HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { MarketService } from 'src/app/services/ResidentialUser/market/market.service';
import { DealsService } from 'src/app/services/vendor/deals/deals.service';
import { ProductService } from 'src/app/services/vendor/Product/product.service';


@Component({
  selector: 'app-market-home',
  templateUrl: './market-home.component.html',
  styleUrls: ['./market-home.component.css']
})
export class MarketHomeComponent implements OnInit {

  constructor(private marketService:MarketService,private productService:ProductService,private route: ActivatedRoute)
  {  }

  products :any = "";
  deals:any[]=[];

  loading:boolean=true;

  //[Search]
  searchString : String ='';

  //[Filter - Price]
  min! : number
  max! : number
  filterString:String="";

  allCategories:String[]=[];
  showCategories:String[] = [];
  selectedCategories:String[] = [];

  noProducts:boolean=false;
  noDeals:boolean=false;

  showOnlyDeals!:boolean;
  showOnlyProducts!:boolean;


  ngOnInit(): void {
    this.allCategories = this.productService.globalCategoryList;
    this.showCategories = this.allCategories.splice(0, 8);

    this.route.queryParams.subscribe(params=>{
      console.log(params);
      if(JSON.stringify(params)=="{}"){
        this.loadAllDeals()
        
      }
      else if(!params['min_price']&&!params['min_price']&&!params['category']){
        if(params['search']==""){
          this.loadAllDeals()
          
        }else{
          this.searchString = params.search;
          console.log("Should Search")
          this.search();
        }
      }
      else{
        console.log("should Filter")
        this.searchString = params.search;
        var search = this.searchString
        if(this.searchString=="") search = "null"

        this.min = params.min_price;
        this.max = params.max_price;
        this.selectedCategories = params.category.split(",")
        if(this.selectedCategories[0] == '') this.selectedCategories = []

        this.filterString =  "?search="+search+"&min_price="+this.min+
        "&max_price="+this.max+"&category="+this.selectedCategories.join(",")

        this.applyFilter();
      }
    })

    var localShowOnlyProducts = localStorage.getItem("showOnlyProducts");
    if (localShowOnlyProducts=="true" || localShowOnlyProducts=="false") {
      this.showOnlyDeals = localStorage.getItem("showOnlyDeals") === 'true';
      this.showOnlyProducts = localStorage.getItem("showOnlyProducts") === 'true';
    } else{
      this.showOnlyDeals = false;
      this.showOnlyProducts = false;
    }
  }


  loadAllProducts(){
    this.marketService.getProducts().subscribe(res=>{
      console.log(res);
      this.products = res;
      this.products.length==0 ? this.noProducts=true:this.noProducts=false;
    });

  }

  loadAllDeals(){
    this.marketService.getDeals().subscribe(res=>{
      console.log(res);
      // this.deals = res;
      this.deals = this.calculateExtraData(res);
      if(this.deals.length==0&&this.featuredDeals.length==0){
        this.noDeals=true
      }else{
        this.noDeals=false;
      }
      this.loading = false;
      console.log(this.deals)
    })
  }

  findSaveUpto(tiers:any, actualPrice:number){
    var prices = [];
    for (let i = 0; i < tiers.length; i++) {
      prices.push(tiers[i].price);
    }
    return Math.round(Math.abs(Math.min.apply(null, prices)-actualPrice)).toFixed(2);
  }


  searchClicked(){
    location.href = "/market" + "?search="+this.searchString
  }


  search(){
      console.log(this.searchString)

      this.marketService.search(this.searchString).subscribe(res=>{
        console.log(res);
        this.deals = this.calculateExtraData(res[0]) ;
        this.products = res[1];
        this.loading = false;
      })
  }

  openProduct(id:any){
    console.log(id);
    location.href = "product/"+id
  }

  goToCart(){
    location.href="/cart"
  }


  options :boolean =false;

  toggleOptions(){
    this.options = !this.options;
    console.log(this.options)
  }

  openOrder(){
    location.href="/orders"
  }

  clearFilter(){
    location.href="/market"
  }


  openDeal(dealId:any){
    location.href = "market/deal/"+dealId;
  }


  applyFilterClicked(){


    this.FilterActive = false;

    this.min == undefined ? this.min = 0 : this.min
    this.max == undefined ? this.max = 0 : this.max
    console.log(this.searchString)
    var searchStr
    searchStr==''?searchStr="?search=null":searchStr="search="+this.searchString

    for(let i=0;i<this.selectedCategories.length;i++){
      console.log(this.selectedCategories[i])
      this.selectedCategories[i]=  this.selectedCategories[i].replace(/\s/g, '+')
    }

    var categories = this.selectedCategories.join(",")

    var filterString = searchStr + "&min_price="+this.min+
    "&max_price="+this.max+"&category="+categories

    console.log("/market?"+filterString)
    location.href = "/market?"+filterString;
  }

  // ============ Filter Products =====================

  applyFilter(){
    this.marketService.filter(this.filterString).subscribe(res=>{
      console.log(res);
      this.deals =  this.calculateExtraData(res[0]) ;
      this.products = res[1];
      this.loading = false;
    })

  }

  moreCategories(){
    this.showCategories = this.showCategories.concat(...[this.allCategories.splice(0,10)]);
  }

  addCategories(cate:String){
    if (this.selectedCategories.indexOf(cate)!=-1) {
      this.selectedCategories = this.selectedCategories.filter(c => c!=cate);
    } else{
      this.selectedCategories.push(cate);
    }
  }

  FilterActive = false;

  toggleFilter(){
    this.FilterActive = !this.FilterActive;
  }

  isEmpty(obj:any):boolean {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
  }

  getObjectKey(item:any){
    return Object.keys(item)[0];
  }

  featuredDeals:any=[]
  
  calculateExtraData(deals:any):any{
    let sortedDeals:any[]=[
      {"Weekly Essentials":[]},
      {"Services":[]},
      {"Local Products":[]},
      {"Gifts":[]},
      {"Other deals":[]},
    ];
    
    console.log(sortedDeals[0]["Weekly Essentials"])

    for(let i=0;i<deals.length;i++){
      const tags = deals[i].deal.items.product.tags;
     


      switch(true) {
        case tags.includes('Featured'):
          this.featuredDeals.push(deals[i]);
          break;
        case tags.includes('Weekly Essentials'):
          sortedDeals[0]["Weekly Essentials"].push(deals[i])
          break;
        case tags.includes('Services'):
          sortedDeals[1]["Services"].push(deals[i])
          break;
        case tags.includes('Local Products'):
          sortedDeals[2]["Local Products"].push(deals[i])
          break;
        case tags.includes('Gifts'):
          sortedDeals[3]["Gifts"].push(deals[i])
          break;     
        default:  
          sortedDeals[4]["Other deals"].push(deals[i]);
          
      }
    }


    console.log(sortedDeals)
    console.log(this.featuredDeals)
    return sortedDeals;
    
  }



  dateDiffInDays(a:Date, b:Date) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

EndSoonToggle: boolean = false;

  round(number:number){
    var number = Math.round(number* 100 + Number.EPSILON) / 100
    return  number.toFixed(2)
  }



}


