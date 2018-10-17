import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: any = {};
  loginS: boolean = true;
  login: boolean = true;
  register: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onLogin(){
    console.log(this.user);
    this.userProvider.login(this.user)
    .subscribe((res) => {
      console.log(res);
      this.userProvider.toHomePage(res)
      this.navCtrl.push('HomePage');  
    },
      err =>{
        this.loginS  = false;
      })
      
  }
  
  onLogout() {
    this.userProvider.logout(this.user)
      .subscribe ( (res) => {
        console.log(res);
        this.navCtrl.push('LoginPage');
      })
  }
    onRegister(){
    console.log(this.user);
    this.userProvider.register(this.user)
    .subscribe(  (res) => {
      console.log(res);
      this.userProvider.toHomePage(res)
      this.navCtrl.push('HomePage');  
    })
  }
  


}



