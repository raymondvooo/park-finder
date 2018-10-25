import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: any = {};
  showLog: boolean = true;
  showReg: boolean = false;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public toast: ToastController) {
  }

  ionViewDidLoad() { }


  onLogin() {
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
        err => {
          let loginToast = this.toast.create({
            message: "Invalid User Credentials",
            duration: 1500,
            position: "top"
          });
          loginToast.present();
        })
  }

  onLogout() {
    this.userProvider.logout(this.user)
      .subscribe((res) => {
        console.log(res);
      })
    this.userProvider.userID = window.sessionStorage.getItem('userId');
    let logoutToast = this.toast.create({
      message: "Logged Out",
      duration: 1500,
      position: "top"
    });
    logoutToast.present();
    //makes sure favorites list is empty
    this.userProvider.faveList = [];
  }

  onRegister() {
    console.log(this.user);
    this.userProvider.register(this.user)
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
      },
        err => {
          let loginToast = this.toast.create({
            message: "Invalid User Credentials",
            duration: 1500,
            position: "top"
          });
          loginToast.present();
        })
    this.userProvider.userID = window.sessionStorage.getItem('userId');
  }


}



