import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams } from 'ionic-angular';
import { MapProvider } from '../../providers/map/map';
import { HomePage } from '../home/home';
import { UserProvider } from '../../providers/user/user';
import { AlertController } from 'ionic-angular';



@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  favorite: any = {
    place_id: "",
    name: "",

  };


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public mapProvider: MapProvider,
    public user: UserProvider,
    public alert: AlertController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');


  }

  itemTapped(event, item) {
    this.mapProvider.coordinates = item.geometry.location;
    this.mapProvider.locationFromList = true;
    this.navCtrl.setRoot(HomePage);
  }

  saveItem(item, event) {
    event.stopPropagation();
    let existingFavorite: boolean = false;
    this.favorite.place_id = item.place_id
    this.favorite.name = item.name
    this.favorite.location = item.geometry.location

    for (var i = 0; i < this.user.faveList.length; i++) {
      if (this.favorite.name === this.user.faveList[i].name) {
        existingFavorite = true;
      }
    }
    if (existingFavorite === false) {
      console.log("right beforre" + item)
    this.user.savePlace(this.favorite)
    .subscribe ( (data: any) => {
      console.log("place data: ", data)
      let alertSucc = this.alert.create({
        title: item.name + " saved to Favorites!",
        buttons: ['Ok']
      });
      alertSucc.present();
      this.user.faveList.push(this.favorite)
    })
    }
    else {
      console.log("Place already in favorites!")
      let alertFail = this.alert.create({
        title: 'Already in Favorites',
        subTitle: 'Cannot add',
        buttons: ['Dismiss']
      });
      alertFail.present();
    }
    this.navCtrl.setRoot(this.navCtrl.getActive().component);

  }

}
