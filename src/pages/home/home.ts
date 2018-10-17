import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { MapProvider } from '../../providers/map/map';

declare var google;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
  })

  export class HomePage {
    @ViewChild('map') mapElement: ElementRef;

      map: any = {};
      infowindow: any = {};
    
   
    constructor(public navCtrl: NavController, public geolocation: Geolocation,  public mapProvider: MapProvider) {
        
    }
    ionViewDidLoad(){
        this.initMap();
      }
    initMap() {
        setTimeout(() => {   
            
            this.geolocation.getCurrentPosition().then((position) => {
 
                let myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
           
                let mapOptions = {
                  center: myLocation,
                  zoom: 15,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
                }
           
                this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

                new google.maps.Marker({
                    position: myLocation,
                    icon: '  http://maps.google.com/mapfiles/ms/icons/arrow.png',
                    map: this.map
                  });

                
         


            this.infowindow = new google.maps.InfoWindow();
            var service = new google.maps.places.PlacesService(this.map);
            service.nearbySearch({
                location: myLocation,
                radius: 5000,
                type: ['store']
            }, (result, status) => this.callback(result, status, this));
           
              }, (err) => {
                console.log(err);
              });


        }, 1000);
    }

    createMarker(place, that) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: that.map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          that.infowindow.setContent(place.name);
          that.infowindow.open(that.map, marker);
          console.log(place)
        });
    }
    
  

    callback(results, status, that) { 
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
            that.createMarker(results[i], that);
            }
        }
    }
    

}