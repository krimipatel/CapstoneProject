import { Component, OnInit , Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-post-selection',
  templateUrl: './post-selection.component.html',
  styleUrls: ['./post-selection.component.css']
})
export class PostSelectionComponent implements OnInit {

  modalTitle:string="";
  @Output() titleEvent = new EventEmitter<string>();

  postSelectionToggle:boolean=true;
  //posts types...
  newsToggle:boolean=false;
  eventsToggle:boolean=false;
  issuesToggle:boolean=false;


  constructor() { }

  ngOnInit(): void {

  }


  selectType(type:any){
    if (type=="news") {
      this.newsToggle=true;
      this.postSelectionToggle=false;

      this.titleEvent.emit(": Building Info/News");
    } else if(type=="events") {
      this.eventsToggle=true;
      this.postSelectionToggle=false;

      this.titleEvent.emit(": Events");
    } else if(type=="issues") {
      this.issuesToggle=true;
      this.postSelectionToggle=false;

      this.titleEvent.emit(": Issues");
    }else{
    }
  }

  //this method  will be used in parent component, in order to close the component completely...
  closeComponent(){
    this.newsToggle=false;
    this.issuesToggle=false;
    this.eventsToggle=false;

    this.postSelectionToggle=true;
  }

}
