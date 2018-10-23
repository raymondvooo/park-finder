import { HttpClient } from '@angular/common/http';
import { ViewChild, ElementRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';


declare var google;

@Injectable()
export class MapProvider {
  list: Array<any> = [];
  coordinates: any = {};
  startPosition: any = {};



  map: any = {};
  infowindow: any = {};
  load: any = this.loadCtrl.create({
    content: "Loading Map",
    duration: 700
  });


  @ViewChild('map') mapElement: ElementRef;


  constructor(public http: HttpClient, public geolocation: Geolocation, public loadCtrl: LoadingController) {
    this.geolocation.getCurrentPosition().then((position) => {
      this.coordinates = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.startPosition = this.coordinates;
    });

  }

  createMap() {
    setTimeout(_ => {

      let mapOptions = {
        center: this.coordinates,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

      var infowindow = new google.maps.InfoWindow({
        content: 'Your Location'
      });
      var current = new google.maps.Marker({
        position: this.startPosition,
        icon: '  http://maps.google.com/mapfiles/ms/icons/arrow.png',
        map: this.map
      });
      current.addListener('click', function() {
        infowindow.open(this.map, current);
      });
   

      this.infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(this.map);
      service.nearbySearch({
        location: this.startPosition,
        radius: 7000,
        type: ['park']
      }, (result, status) => this.callback(result, status, this));

    }, 500);
  }

  createMarker(place, that) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: that.map,
      position: place.geometry.location
    });
    this.list.push(place);
    console.log(this.list);

    google.maps.event.addListener(marker, 'click', function () {
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
      this.list = this.list;
      console.log(this.list);
    }
  }
}










