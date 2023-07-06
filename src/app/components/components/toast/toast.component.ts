import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  @Input()
  toastMessage:string='';

  @Output()
  closeEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  closeToggle:boolean=false;

  close(){
    this.closeEvent.emit();
  }

}
