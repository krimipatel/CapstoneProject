import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-sand-box',
  templateUrl: './test-sand-box.component.html',
  styleUrls: ['./test-sand-box.component.css']
})
export class TestSandBoxComponent implements OnInit {

  constructor() { }

  @ViewChild('map') map!: ElementRef;

  ngOnInit(): void {
    let loader = new Loader({
      apiKey:"AIzaSyDPMJfwU883rJRTiubBWpB_5zkKIpfllvY"
    })

    loader.load().then(()=>{
      const maps = new google.maps.Map(this.map.nativeElement,{
        center:{
          lat:43.733660,lng:-79.608780
        },
        zoom:15,
        disableDefaultUI: true,
        styles:[]
      })

      new google.maps.Marker({
        position:{
          lat:43.733660,lng:-79.608780
        },
        map:maps,
        title:"My community"
      })

    })
  }

}
