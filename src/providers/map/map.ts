import { HttpClient } from '@angular/common/http';
import { ViewChild, ElementRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';


declare var google;

@Injectable()
export class MapProvider {
  list: Array<any> = [];
  //coordinates of viewpoint
  coordinates: any = {};
  //coordinates of user location
  startPosition: any = {};
  map: any = {};
  infowindow: any = {};
  //check if getting location from listed item
  locationFromList: boolean = false;
  favoriteItem: any = {};



  @ViewChild('map') mapElement: ElementRef;


  constructor(
    public http: HttpClient,
    public geolocation: Geolocation, ) { }


  getMyLocation() {
    //promise for getting location
    return new Promise((resolve) => {
      if (this.locationFromList === false) {
        //gets current position, then changes coordinates
        this.geolocation.getCurrentPosition().then((position) => {
          new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          this.coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          this.startPosition = this.coordinates;
          resolve(true);
        });
      } else {
        //makes sure promise is fulfilled when getting location from item
        resolve(true);
      }
    })
  }

  createMap() {
    this.list = [];
    let mapOptions = {
      center: this.coordinates,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    //creates map from script
    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    //info window for user location
    var infowindow = new google.maps.InfoWindow({
      content: 'Your Location'
    });
    //marker for user location
    var current = new google.maps.Marker({
      position: this.startPosition,
      icon: '  http://maps.google.com/mapfiles/ms/icons/arrow.png',
      map: this.map
    });
    //opens info window when clicked
    current.addListener('click', function () {
      infowindow.open(this.map, current);
    });
    console.log(current.position)
    //if item is selected from list, creates a marker in case there is none
    if (this.locationFromList === true) {
      this.createNew(this.favoriteItem, this)
    }

    this.infowindow = new google.maps.InfoWindow();

    //searches for nearby places
    var service = new google.maps.places.PlacesService(this.map);
    service.nearbySearch({
      location: this.startPosition,
      radius: 7000,
      type: ['park']
    }, (result, status) => this.callback(result, status, this));
    this.locationFromList = false;
  }

  createMarker(place, that) {
    var marker = new google.maps.Marker({
      map: that.map,
      position: place.geometry.location,
      content: place.name + place.id,
    });

    //creates the info window for marker
    google.maps.event.addListener(marker, 'click', function () {
      that.infowindow.setContent("<div><strong>" + place.name + "</strong></div>" + "<div>" + place.vicinity + "</div>" +
        '<img width="350px" src="' + place.photos[0].getUrl() + '"/>');
      that.infowindow.open(that.map, marker);
    });
  }

  createNew(place, that) {
    var marker = new google.maps.Marker({
      map: that.map,
      position: place.location,
      content: place.name + place.id,
    });

    //creates info window
    google.maps.event.addListener(marker, 'click', function () {
      if (place.photos != null) {
        that.infowindow.setContent("<div><strong>" + place.name + "</strong></div>" + "<div>" + place.vicinity + "</div>" +
          '<img width="350px" src="' + place.photos + '"/>');
        that.infowindow.open(that.map, marker);
      }
    });
  }



  callback(results, status, that) {
    //creates markers for each nearby place
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        that.createMarker(results[i], that);
        this.list.push(results[i]);
      }
      this.list = this.list;
      console.log(this.list);
    }
  }
}










