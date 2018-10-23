import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams } from 'ionic-angular';
import { MapProvider } from '../../providers/map/map';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public mapProvider: MapProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');


  }

  itemTapped(event, item) {
    this.mapProvider.coordinates = item.geometry.location;
    this.mapProvider.locationFromList = true;
    this.navCtrl.setRoot(HomePage);
  }

}
