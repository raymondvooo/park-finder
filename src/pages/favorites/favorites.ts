import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { MapProvider } from '../../providers/map/map';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';



/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  loaded: boolean = false;
  list: Array<any> = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alert: AlertController,
    public user: UserProvider,
    public map: MapProvider) {
  }

  ionViewDidLoad() {  
    console.log("initial list: ",this.user.faveList);

    this.user.getFavorites()
      .subscribe ( (data: any) => {
          this.user.faveList = data;
            console.log(this.user.faveList);
            this.list = this.user.faveList;
            console.log("list: ", this.list)
            this.loaded = true;
    });
    this.list = this.user.faveList;
    
  }

  itemTapped(event, item) {
    this.map.coordinates = item.location;
    this.map.locationFromList = true;
    this.navCtrl.setRoot(HomePage);
  }

  deleteItem(event, item) {
    event.stopPropagation();

    this.user.deletePlace(item)
    .subscribe ( (data: any) => {
      console.log("place data: ", data)
    });
    let alertSucc = this.alert.create({
      title: item.name + " deleted from favorites!",
      buttons: ['Ok']
    });
    alertSucc.present();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);

  }



}
