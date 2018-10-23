import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserProvider {
  url: string = "http://localhost:3000/api/AppUsers/";
  returnUrl: string = "home";
  userID: string;
  faveList: Array<any> = [];
 
  constructor( private http : HttpClient) { 
    let existingFavorite = false;
    this.getFavorites()
    .subscribe ( (data: any) => {
      for (var prop in data) {
      if (data.hasOwnProperty(prop)) {
        for (var i = 0; i < this.faveList.length; i++) {
          if (data[prop].name === this.faveList[i].name) {
            existingFavorite = true;
          }
        }
        if (existingFavorite === false) {
          this.faveList.push(data[prop]);
          console.log(this.faveList);

        }
        }
    }
  });
  }
  
  register(user) {
    return this.http.post(this.url, user) 
  }

  login(user) {
    return this.http.post( this.url + "login", user)
  }
  
  logout(user) {
    let token = window.sessionStorage.getItem( 'token');
    console.log(token);
    window.sessionStorage.clear();
    return this.http.post( this.url + "logout?access_token="+token, {});
  }
  
  getUser(user) {
    let id = window.sessionStorage.getItem('userId')
    let token = window.sessionStorage.getItem( 'token');
    return this.http.get( this.url + id + "/?access_token=" + token, {} )
  }
  
  savePlace(place) {
    let id = window.sessionStorage.getItem('userId')
    let token = window.sessionStorage.getItem( 'token');
    return this.http.post( this.url + id + "/favorites?access_token=" + token, place )
  }
  
  getFavorites() {
    let id = window.sessionStorage.getItem('userId')
    let token = window.sessionStorage.getItem( 'token');
    return this.http.get( this.url + id + "/favorites?access_token=" + token)
  }
  
  toHomePage(resData){
    //Save data from our succesfull login in sessionStorage
    window.sessionStorage.setItem( "token", resData.token)
    window.sessionStorage.setItem( "userId", resData.userId)
  }
}