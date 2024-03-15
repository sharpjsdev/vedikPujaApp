import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { FetchService } from '../services/fetch.service';
import { EventService } from '../services/event.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { ActionPerformed, PushNotificationSchema,PushNotifications,Token} from '@capacitor/push-notifications';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  udata:any;
  user_id:any;
  notificationImgPath:any = "../../assets/images/profile_img.png";
  Notifications:any;
  note_count:any;

  constructor(private dataService: DataService,private loader: LoaderService,private fetch: FetchService,private event : EventService,private toastService: ToastService,private router: Router) { }

  ngOnInit() {
    this.Notifications = [];
  }
  ionViewDidEnter()
  { 
    this.Notifications = [];
    this.udata = localStorage.getItem("user_data");
    if(this.udata){
      this.udata = JSON.parse(this.udata);
      this.user_id = this.udata.id;
    }

    this.loader.present();
  
    this.fetch.getNotifications(this.user_id).subscribe({
      next: (res) => {
      this.loader.dismiss();
      if(res){
          this.Notifications = res.notification;
          console.log(this.Notifications);
      }
      },
      error: (error) => {
        this.loader.dismiss();
      }
    });

    PushNotifications.addListener('pushNotificationReceived',
    (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
        console.log(notification.title);
        this.event.publish('notification:refresh', {
        });
        this.router.navigate(['/tabs/tab5']);
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        this.event.publish('notification:refresh', {
        });
        this.router.navigate(['/tabs/tab5']);
        console.log('Push action performed: ' + JSON.stringify(notification));
      },
    );

  }

  bookings(id:any){
    this.loader.present();
    
    let data:any = {'user_id':this.user_id,'notification_id':id};
    this.fetch.viewedNotification(data).subscribe({
      next: (res) => {
        this.loader.dismiss();
        this.dataService.setNoteCount(res);
        this.event.publish('notification:refresh', {
        });
        this.router.navigate(['/tabs/tab1']);
      },
      error: (error) => {
      }
    });
    
  }
  refresh(){
    this.ionViewDidEnter();
  }
  
}
