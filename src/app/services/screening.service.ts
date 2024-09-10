import { Injectable } from '@angular/core';
import { screeningUrl } from '../constants/constants';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { OfacElement } from '../interfaces/ofac-element';

@Injectable({
  providedIn: 'root'
})
export class ScreeningService {
  url = screeningUrl
  headers = new HttpHeaders()
  
  constructor(private http : HttpClient) { 
    this.headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
  }

  getOfacResults(name: string) {
    const token = localStorage.getItem('token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('name', name);
    return this.http.get<any>(`${this.url}/ofac_sanctions_list`, { headers: headers, params: params });
  }

  getOffShoreResults(name: string) {
    const token = localStorage.getItem('token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('name', name);
    return this.http.get<any>(`${this.url}/offshore_leaks`, { headers: headers, params: params });
  }
}
