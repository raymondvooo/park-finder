import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { MapProvider } from '../../providers/map/map';
import { LoadingController } from 'ionic-angular';


declare var google;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
  })

  export class HomePage {
    @ViewChild('map') mapElement: ElementRef;

      map: any = {};
      infowindow: any = {};
      list: Array<any> = [];
      load: any = this.loadCtrl.create({
        content: "Loading Map",
      });
    
   
    constructor(
      public navCtrl: NavController, 
      public geolocation: Geolocation,  
      public mapProvider: MapProvider, 
      public loadCtrl: LoadingController
    ) {}



    ionViewDidLoad(){
      this.load.present();
      this.mapProvider.getMyLocation().then( x => {
        if (x) {
          this.load.dismiss();
          this.mapProvider.createMap();   
        }       
        
      })

    }
}