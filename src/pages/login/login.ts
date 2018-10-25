import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular';

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
  // userID: string = window.sessionStorage.getItem('userId');

  showLog: boolean = true;
  showReg: boolean = false;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public userProvider: UserProvider,
    public toast: ToastController) {
  }

  ionViewDidLoad() {
  //   this.userProvider.getFavorites()
  //   .subscribe ( (data: any) => {
  //       this.userProvider.faveList = data;
  //         console.log(this.userProvider.faveList);
    
  // });
}


  onLogin(){
    console.log(this.user);
    this.userProvider.login(this.user)
    .subscribe((res) => {
      console.log(res);

      this.userProvider.toHomePage(res)
      this.navCtrl.setRoot(HomePage);
      let loginToast = this.toast.create({
        message: "Welcome " + this.user.email + "!",
        duration: 1500,
        position: "top"
      });
      loginToast.present();
      console.log("id is :", window.sessionStorage.getItem('userId'))
      this.userProvider.userID = window.sessionStorage.getItem('userId');

    },
      err =>{
        let loginToast = this.toast.create({
          message: "Invalid User Credentials",
          duration: 1500,
          position: "top"
        });
        loginToast.present();
        this.loginS  = false;
      })
      
     
      
  }
  
  onLogout() {
    this.userProvider.logout(this.user)
      .subscribe ( (res) => {
        console.log(res);
      })
      this.userProvider.userID = window.sessionStorage.getItem('userId');
      let logoutToast = this.toast.create({
        message: "Logged Out",
        duration: 1500,
        position: "top"
      });
      logoutToast.present();
      this.login = true;
      this.userProvider.faveList = [];

  }
    onRegister(){
    console.log(this.user);
    this.userProvider.register(this.user)
    .subscribe(  (res) => {
      console.log(res);
      this.userProvider.toHomePage(res)
      this.navCtrl.setRoot(HomePage); 
      let loginToast = this.toast.create({
        message: "Welcome " + this.user.email + "!",
        duration: 1500,
        position: "top"
      });
      loginToast.present(); 
    },
    err =>{
      let loginToast = this.toast.create({
        message: "Invalid User Credentials",
        duration: 1500,
        position: "top"
      });
      loginToast.present();
      this.loginS  = false;
    })
    this.userProvider.userID = window.sessionStorage.getItem('userId');
    this.login = true;
 
  }


}



