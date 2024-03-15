import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { ToastService } from '../services/toast.service';
import { Location } from '@angular/common';
import { FetchService } from '../services/fetch.service';
import { LoaderService } from '../services/loader.service';
import { ActionPerformed, PushNotificationSchema,PushNotifications,Token} from '@capacitor/push-notifications';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { EventService } from '../services/event.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  
  pujaList:any;
  templeList:any;
  config1: any = {
    slidesPerView: 1,
    initialSlide: 0,
    loop: false,
    autoplay: true,
    spaceBetween: 15,
  };

  config2: any = {
    slidesPerView: 2,
    initialSlide: 0,
    loop: false,
    autoplay: false,
    centeredSlides: true,
    spaceBetween: 10,
  };

  pujaimgPath = environment.pujaImg;
  templeimgPath = environment.templeImg;

  constructor(private pushNotificationService: NotificationService,private event : EventService,private authservice:AuthService,private loader: LoaderService,private fetch: FetchService,private platform:Platform,private location: Location,private router: Router,private menu: MenuController,private toastService: ToastService,private alertController: AlertController)  {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.handleBackButton();
    });
  }
  
  ngOnInit(){
    this.authservice.authState.subscribe(state => {
      if(!state) {
        this.router.navigate(['/login']);
      }
    });
    this.menu.enable(true, 'start');
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        console.log("running");
        PushNotifications.register();
      } else {
        console.log("error");
      }
    });

   
   
  }
  ionViewDidEnter(){
    
    this.authservice.authState.subscribe(state => {
      if(!state) {
        this.router.navigate(['/login']);
      }
    });
    this.pushNotificationService.noteCount();
    this.loader.present();
    this.menu.enable(true, 'start');
    this.fetch.getTemples().subscribe({
      next: (res) => {
      if(res){
        this.loader.dismiss();
        if(res){
        this.templeList = res;
        console.log(res);
        }else{
          this.toastService.presentErrorToast("Something went wrong");
        }
      }
    },
    error: (error) => {
      this.loader.dismiss();
      console.error('Error:', error);
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
  book_puja(slug: any){
     this.router.navigate(['/tabs/about-temple/'+slug]);
  }
  handleBackButton() {
    const currentUrl = this.location.path(); 
    if (currentUrl === '/tabs/tab3') {
      this.showExitConfirmationAlert();
    } else {
      this.location.back();
    }
  }
  async showExitConfirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Exit App',
      message: 'Are you sure you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'Exit',
          handler: () => {
            App.exitApp(); // Exit the app
          },
        },
      ],
    });
  
    await alert.present();
  }

}
