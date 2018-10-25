import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  /**if item is tapped, changes the coordinates of map and centers to location of item*/
  itemTapped(event, item) {
    this.mapProvider.coordinates = item.geometry.location;
    this.mapProvider.locationFromList = true;
    this.navCtrl.setRoot(HomePage);
    console.log(item)
  }

  /**builds favorite item and saves the item into the database */
  saveItem(item, event) {
    event.stopPropagation();
    

    //gets list of favorites from database, checks for error, when complete, calls checkandsave()
    this.user.getFavorites()
      .subscribe ( (data: any) => {
          this.user.faveList = data;
    }, error => console.log("Error: ", error),
    () => {this.checkAndSave(item)}
  );
}  

/**builds favorite item and saves it as a user favorite */
 checkAndSave(item) { 
  this.favorite.place_id = item.place_id;
  this.favorite.name = item.name;
  this.favorite.location = item.geometry.location;
  this.favorite.vicinity = item.vicinity;
  this.favorite.photos = item.photos[0].getUrl();

  let existingFavorite: boolean = false;

  //iterates through userlist to see if item already exists
  for (var i = 0; i < this.user.faveList.length; i++) {
      if (item.name === this.user.faveList[i].name) {
        existingFavorite = true;
      }
    }
    //if not, store the item
    if (existingFavorite === false) {
    this.user.savePlace(this.favorite)
    .subscribe ( (data: any) => {
      console.log("place data: ", data)
      let alertSucc = this.alert.create({
        title: item.name + " saved to Favorites!",
        buttons: ['Ok']
      });
      alertSucc.present();
    })
    }
    else {
      let alertFail = this.alert.create({
        title: 'Already in Favorites',
        subTitle: 'Cannot add',
        buttons: ['Dismiss']
      });
      alertFail.present();
    }
  }
  

}
