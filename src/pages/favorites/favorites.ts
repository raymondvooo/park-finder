import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { MapProvider } from '../../providers/map/map';



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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public user: UserProvider,
    public map: MapProvider) {
  }

  ionViewDidLoad() {
   
  }

  itemTapped(event, item) {
    console.log(item)
  }

}
