import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserProvider {
  url: string = "http://localhost:3000/api/AppUsers/";
  returnUrl: string = "home";
  userID: string = window.sessionStorage.getItem('userId');
  faveList: Array<any> = [];
  favorite: any = {
    place_id: "",
    name: "",
  };

  constructor(private http: HttpClient) {

  }

  register(user) {
    return this.http.post(this.url, user)
  }

  login(user) {
    return this.http.post(this.url + "login", user)
  }

  logout(user) {
    let token = window.sessionStorage.getItem('token');
    console.log(token);
    window.sessionStorage.clear();
    return this.http.post(this.url + "logout?access_token=" + token, user);
  }

  getUser(user) {
    let id = window.sessionStorage.getItem('userId')
    let token = window.sessionStorage.getItem('token');
    return this.http.get(this.url + id + "/?access_token=" + token, user)
  }

  savePlace(place) {
    let id = window.sessionStorage.getItem('userId')
    let token = window.sessionStorage.getItem('token');
    return this.http.post(this.url + id + "/favorites?access_token=" + token, place)
  }

  deletePlace(place) {
    return this.http.delete('http://localhost:3000/api/favorites/' + place.id, place)

  }

  getFavorites() {
    let id = window.sessionStorage.getItem('userId')
    let token = window.sessionStorage.getItem('token');
    return this.http.get(this.url + id + "/favorites?access_token=" + token)
  }

  toHomePage(resData) {
    //Save data from succesfull login in sessionStorage
    window.sessionStorage.setItem("token", resData.token)
    window.sessionStorage.setItem("userId", resData.userId)
  }
}