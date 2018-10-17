import { HttpClient } from '@angular/common/http';
import { ViewChild, ElementRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Injectable()
export class MapProvider {
  list: Array<any> = [];


  @ViewChild('map') mapElement: ElementRef;
  
 
  constructor(public http: HttpClient, public geolocation: Geolocation) {
  }

 



 
 
}