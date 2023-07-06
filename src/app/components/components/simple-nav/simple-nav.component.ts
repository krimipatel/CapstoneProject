import { Component, Input, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-simple-nav',
  templateUrl: './simple-nav.component.html',
  styleUrls: ['./simple-nav.component.css']
})
export class SimpleNavComponent implements OnInit {

  constructor(private router : Router) { }

  @Input() page:String='';

  register(){
    this.router.navigateByUrl('register',{state:{address:null}});
  }

  ngOnInit(): void {
  }

}
