import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { EventService } from './services/event.service';
import { AuthService } from './services/auth.service';
import { ActionPerformed, PushNotificationSchema,PushNotifications,Token} from '@capacitor/push-notifications';
import { NotificationService } from '../../src/app/services/notification.service';
import { DataService } from './services/data.service';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user_data:any;
  note_count:any;
  appPages = [
    {
      title: 'Profile',
      url: '/profile',
      icon: 'easel'
    },
  ];

  constructor(private dataService: DataService,private pushNotificationService: NotificationService,private router: Router,private event : EventService,private authservice: AuthService) {
    this.initializeApp();
  }

  initializeApp() {
    this.router.navigate(['/splash']);
    this.event.subscribe('user:refresh', (data: any) => {
      this.user_data = localStorage.getItem('pro_data');
      if(this.user_data){
        this.user_data = JSON.parse(this.user_data);
      }
    });
  }

  ngOnInit() {
    
    this.pushNotificationService.setupPushNotifications();
    this.pushNotificationService.noteCount();
  
  }

  logout(){
    this.authservice.logout();
  }
  profile(){
    this.router.navigate(['tabs/tab4']);
  }

  about_us(){
    this.router.navigate(['tabs/about-us']);
  }

  contact_us(){
    this.router.navigate(['tabs/contact-us']);
  }

  
}
