import { Injectable } from '@angular/core';
import { Vendor } from '../interfaces/vendor';
import { vendorsUrl } from '../constants/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  url = vendorsUrl
  headers = new HttpHeaders()
  
  constructor(private http : HttpClient) { 
    this.headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
  }

  getVendors() {
    const token = localStorage.getItem('token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<Vendor[]>(this.url, { headers: headers });
  }

  addVendor(vendor: Vendor){
    const token = localStorage.getItem('token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this.http.post(this.url, vendor, { headers: headers } );
   }

  updateVendor(id: any, vendor:Vendor){
    const token = localStorage.getItem('token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.url}/${id}`, vendor, { headers: headers } );
   }

  deleteVendor(id: any){
    const token = localStorage.getItem('token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.url}/${id}`, { headers: headers })
   }
}
