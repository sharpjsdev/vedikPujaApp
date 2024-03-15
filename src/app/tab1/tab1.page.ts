import { Component } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { MenuController, Platform, AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  BookList:any;
  udata:any;
  pujaimgPath = environment.pujaImg;
  booked_list:any = [];
  scheduled_list:any = [];
  completed_list:any = [];
  section:any = 2;
  currentTime = new Date();
  constructor(private event : EventService,private menu: MenuController,private platform:Platform,private toastService: ToastService,private loader: LoaderService,private fetch: FetchService,private modalController: ModalController,private router: Router,private alertController: AlertController) { }
  ngOnInit(){
   
  }
  ionViewDidEnter(){
    this.section = 2;
    this.udata = localStorage.getItem("user_data");
    
    
    if(this.udata){
    this.udata = JSON.parse(this.udata);
    console.log(this.udata);
    this.menu.enable(true, 'start');
    this.loader.present();
    this.fetch.bookingAll(this.udata.id).subscribe({next: (res) => {
      if(res){
        this.loader.dismiss();
        this.BookList = res;
        this.booked_list = [];
        this.scheduled_list = [];
        this.completed_list = [];
        
        for (const book of this.BookList) {
          
          if (book?.status == "P" ) {
          
            this.booked_list.push(book);
            console.log("BOOKED",this.booked_list);
          }
          if (book?.status == "S" ) {
            if(this.toTime(book?.scheduled_at) > this.toTime(this.currentTime))
            {
              this.scheduled_list.push(book);
              console.log("Scheduled list",this.scheduled_list);
            }
          }
          if (book?.status == "C" ) {
            
            this.completed_list.push(book);
            console.log("Completed",this.completed_list);
            
          }
         
        }
       
      }
      
    },
    error: (error) => {
      this.BookList = [];
      this.booked_list = [];
      this.scheduled_list = [];
      this.completed_list = [];
      this.loader.dismiss();
      console.error('Error during login:', error);
    }
    });
  }

    
  }
  joinPuja(link:any){
    if(link && link != null){
    const videoId = this.extractVideoId(link);
    if(videoId){
    this.router.navigate(['puja-live/'+videoId]);
    }else{
      this.toastService.presentErrorToast("Invalid live link");
    }
    }
  }
 
  refresh(){
    this.ionViewDidEnter();
  }

  extractVideoId(url: string): string | null {
    const pattern = /(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(pattern);
    return match ? match[1] : null;
  }
  toTime(dt:any){
    const date = new Date(dt);
    const timestamp = date.getTime();
    return timestamp
  }
  scheduled_tab(){
    this.section = 1;
  }
  booked_tab(){
    this.section = 2;
  }
  completed_tab(){
    this.section = 3;
  }
  BookingDetail(id:any){
    this.router.navigate(['tabs/booking-detail/'+id]);
  }
}
