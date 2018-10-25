import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { MapProvider } from '../../providers/map/map';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alert: AlertController,
    public user: UserProvider,
    public map: MapProvider) {
  }

  /**http request to get favorite places of user and subscribes it to a list*/
  ionViewDidLoad() {  
    this.user.getFavorites()
      .subscribe ( (data: any) => {
          this.user.faveList = data;
            console.log(this.user.faveList);
    });
  }

  /**if item is tapped, then reloads map and centers it on the items location*/
  itemTapped(event, item) {
    this.map.coordinates = item.location;
    this.map.locationFromList = true;
    this.map.favoriteItem = item;
    this.navCtrl.setRoot(HomePage);
    console.log(item)
  }

  /**http request to delete favorite from database, then alerts user*/
  deleteItem(event, item) {
    event.stopPropagation();

    //deletes item from database
    this.user.deletePlace(item)
    .subscribe ( (data: any) => {
    });

    //creates alert and presents
    let alertSucc = this.alert.create({
      title: item.name + " deleted from favorites!",
      buttons: ['Ok']
    });
    alertSucc.present();

    //refreshes favorites list
    this.user.getFavorites()
    .subscribe ( (data: any) => {
        this.user.faveList = data;
  });
  }



}
