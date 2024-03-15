import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { FetchService } from './fetch.service';
import { LoaderService } from './loader.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  udata:any;
  uid:any;
  authState = new BehaviorSubject(false);

  constructor(private loader: LoaderService,private fetch: FetchService,private http: HttpClient, private router: Router, private platform: Platform) {

    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });

  }

  ifLoggedIn() {
    var res = localStorage.getItem("user_data");
    if (res) {
      this.authState.next(true);
    }
  }

  login() {
    var response = localStorage.getItem("user_data");
    if (response) {
      this.authState.next(true);
    }
  }

  isAuthenticated() {
    return this.authState.value;
  }

  logout() {
    
    this.udata = localStorage.getItem("user_data");
    console.log(this.udata);
    if(this.udata){
      this.udata = JSON.parse(this.udata);
      this.uid = this.udata.id;
      this.loader.present();
      this.fetch.logoutUsr(this.uid).subscribe({
        next: (res) => {
        
        if(res){
          if(res.message == "Logout Successfully"){
            console.log("logout");
            localStorage.clear();
            this.authState.next(false);
            this.router.navigate(['/login']);
          }
        }
        this.loader.dismiss();
        },
        error: (error) => {
          console.log(error);
          this.loader.dismiss();
        }
      });
    }
  }
}
