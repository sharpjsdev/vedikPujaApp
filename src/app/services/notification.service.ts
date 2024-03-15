import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActionPerformed, PushNotificationSchema,PushNotifications,Token} from '@capacitor/push-notifications';
import { FetchService } from './fetch.service';
import { LoaderService } from './loader.service';
import { DataService } from './data.service';
import { EventService } from './event.service';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  udata:any;
  view_count:any;
  constructor(private event : EventService,private dataService: DataService,private loader: LoaderService,private router: Router,private fetch: FetchService,) {}

  setupPushNotifications() {
    // Subscribe to push notifications
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      console.log('Push received: ' + JSON.stringify(notification));
      console.log(notification.title);
      this.event.publish('notification:refresh', {
      });
      this.router.navigate(['/tabs/tab5']);
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
      console.log('Push action performed: ' + JSON.stringify(notification));
      this.event.publish('notification:refresh', {
      });
      this.router.navigate(['/tabs/tab5']);
    });
  }
  noteCount()
  {
    this.udata = localStorage.getItem("user_data");
    if(this.udata){
    this.udata = JSON.parse(this.udata);
      this.fetch.getNotifications(this.udata?.id).subscribe({
        next: (res) => {
          if(res){
            this.view_count = res.view_count;
            this.dataService.setNoteCount(this.view_count);
            this.event.publish('notification:refresh', {
            });
          }else{
            
          }
        },
        error: (error) => {
          
        }
      });
    }
  }
}
