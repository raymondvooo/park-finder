import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { MapProvider } from '../providers/map/map';
import { FavoritesPage } from '../pages/favorites/favorites';
import { UserProvider } from '../providers/user/user';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public map: MapProvider,
    public user: UserProvider) {
    this.initializeApp();

    this.pages = [
      { title: 'Map', component: HomePage },
      { title: 'Nearby Parks', component: ListPage },
      { title: "Favorites", component: FavoritesPage},
      { title: "Account", component: LoginPage},
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }
/**opens a page. if already on the page, then do nothing */
  openPage(page) {
    if ( this.nav.getActive().component === page.component)
    console.log("already on page")
  else {
    this.nav.setRoot(page.component);

  }
}
}
