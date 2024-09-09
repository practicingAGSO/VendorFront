import { Injectable } from '@angular/core';
import { screeningUrl } from '../constants/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = `${screeningUrl}`

  headers = new HttpHeaders()


  constructor( private http : HttpClient) {
    this.headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
  }


   register(user: User){
    return this.http.post(`${this.url}/register`, user);
   }


   login(user: User){
    return this.http.post(`${this.url}/login`, user);
   }
}
