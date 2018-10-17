import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserProvider {
  url: string = "http://localhost:3000/api/appUser/";
  returnUrl: string = "home";
 
  constructor( private http : HttpClient) { }
  
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
  
  saveStock(stock) {
    let id = window.sessionStorage.getItem('userId')
    let token = window.sessionStorage.getItem( 'token');
    return this.http.post( this.url + id + "/favorites?access_token=" + token, stock )
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