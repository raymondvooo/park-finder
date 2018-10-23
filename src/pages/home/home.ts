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
      this.mapProvider.getMyLocation().then( (x) => {
        if (x) {
          this.load.dismiss();
          this.mapProvider.createMap();          
        }
      })
    }

     
    
      
    // initMap() {
    //     setTimeout(() => {   
            
    //         this.geolocation.getCurrentPosition().then((position) => {
 
    //             let myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
           
    //             let mapOptions = {
    //               center: myLocation,
    //               zoom: 14,
    //               mapTypeId: google.maps.MapTypeId.ROADMAP
    //             }
           
    //             this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    //             new google.maps.Marker({
    //                 position: myLocation,
    //                 icon: '  http://maps.google.com/mapfiles/ms/icons/arrow.png',
    //                 map: this.map
    //               });



    //         this.infowindow = new google.maps.InfoWindow();
    //         var service = new google.maps.places.PlacesService(this.map);
    //         service.nearbySearch({
    //             location: myLocation,
    //             radius: 3000,
    //             type: ['store']
    //         }, (result, status) => this.callback(result, status, this));
           
    //           }, (err) => {
    //             console.log(err);
    //           });


    //     }, 1000);
        
    // }

  

}