import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(public router:Router,private authservice:AuthService) {
    setTimeout(()=>{

      this.authservice.authState.subscribe(state => {
        if(!state) {
          this.router.navigate(['/login']);
        }else{
          this.router.navigate(['tabs/tab3']);
        }
      });

    }, 8000);
  }

  ngOnInit() {
  }
  ionViewDidEnter(){
    setTimeout(()=>{

      this.authservice.authState.subscribe(state => {
        if(!state) {
          this.router.navigate(['/login']);
        }else{
          this.router.navigate(['tabs/tab3']);
        }
      });

    }, 8000);
  }
}
