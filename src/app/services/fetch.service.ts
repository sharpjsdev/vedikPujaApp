import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,throwError} from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  public url = "https://vedikpuja.com/api";
  constructor(private http: HttpClient) { }

  login(data : any): Observable<any> {
    return this.http.post<any>(`${this.url}/otp-login`, data);
  }
  velidateOTP(data : any): Observable<any> {
    return this.http.post<any>(`${this.url}/validate-login`, data);
  }
  updateProfile(data : any): Observable<any> {
    return this.http.post<any>(`${this.url}/update-profile`, data);
  }
  getPuja(): Observable<any> {
    return this.http.get<any>(`${this.url}/getPujas`);
  }
  getTemples(): Observable<any> {
    return this.http.get<any>(`${this.url}/getTemples`);
  }
  searchPuja(key:any): Observable<any> {
    return this.http.get<any>(`${this.url}/searchPuja/${key}`);
  }
  getPujaById(slug:any): Observable<any> {
    return this.http.get<any>(`${this.url}/getPuja/${slug}`);
  }
  getTempleId(slug:any): Observable<any> {
    return this.http.get<any>(`${this.url}/getTemple/${slug}`);
  }
  generateAddress(latitude:any,longitude:any){
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;
    return this.http.get(apiUrl);
  }
  createOrder(data : any): Observable<any> {
    return this.http.post<any>(`${this.url}/create_order`, data);
  }
  bookingPuja(data : any): Observable<any> {
    return this.http.post<any>(`${this.url}/bookPuja`, data);
  }
  bookingAll(user_id : any): Observable<any> {
    return this.http.get<any>(`${this.url}/getBookingData/${user_id}`);
  }
  bookingById(booking_id : any): Observable<any> {
    return this.http.get<any>(`${this.url}/getBookingDataById/${booking_id}`);
  }
  getState(): Observable<any> {
    return this.http.get<any>(`${this.url}/getState`);
  }
  getCity(id : any): Observable<any> {
    return this.http.get<any>(`${this.url}/getCityByStateId/${id}`);
  }
  payment(data : any): Observable<any> {
    return this.http.post<any>(`${this.url}/paymentDetail`, data);
  }
  getNotifications(id:any): Observable<any> {
    return this.http.get<any>(`${this.url}/getAllNotification/${id}`);
  }
  viewedNotification(data:any): Observable<any> {
    return this.http.post<any>(`${this.url}/updateViewStatus`, data);
  }
  
  logoutUsr(id:any): Observable<any> {
    return this.http.get<any>(`${this.url}/logoutUser/${id}`);
  }
  getScheduleDate(id:any): Observable<any> {
    return this.http.get<any>(`${this.url}/getPujaSchedule/${id}`);
  }
  contactUs(data:any): Observable<any> {
    return this.http.post<any>(`${this.url}/storeContact`, data);
  }
  contactUsDetail(): Observable<any> {
    return this.http.get<any>(`${this.url}/getWebInfo`);
  }
}
