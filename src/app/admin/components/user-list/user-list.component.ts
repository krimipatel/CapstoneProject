import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private router:Router) { }

  @Input()
  usersList : any;

  ngOnInit(): void {

  }

  openUser(id:any)
  {
    this.router.navigateByUrl("/admin/user/"+id);

  }
}
