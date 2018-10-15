import { HttpClient } from '@angular/common/http';
import { ViewChild, ElementRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Injectable()
export class MapProvider {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
 
  constructor(public http: HttpClient, public geolocation: Geolocation) {
  }

 
 
}