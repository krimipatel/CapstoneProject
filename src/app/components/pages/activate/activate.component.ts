import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/ResidentialUser/login.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  constructor(private route : ActivatedRoute,private loginService:LoginService) { }
  private routeSub!: Subscription;

  loading:boolean=true;
  url:any;
  code:any;

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.url = params['url'];
      this.code = params['code']
    })
    console.log(this.url)
    console.log(this.code)

    var data = {
      url : this.url,
      code :this.code,
    }

    this.loginService.activate(data).subscribe(res=>{
      console.log(res);
      if(res){
        this.loading = false;
        location.href = "/login"
      }
    })

  }

}
