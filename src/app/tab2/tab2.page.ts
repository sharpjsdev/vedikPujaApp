import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from '../services/fetch.service';
import { MenuController, Platform, AlertController} from '@ionic/angular';
import { ToastService } from '../services/toast.service';
import { LoaderService } from '../services/loader.service';
import { environment } from 'src/environments/environment';
import { Observable, interval, map } from 'rxjs';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  pujaList:any = [];
  pujaimgPath = environment.pujaImg;
  templeimgPath = environment.templeImg;
  searchKey:any;
  cdate:any;
  schedule_date:any; // Replace this with your scheduled date
  remainingTime$: Observable<any>[] = [];
  currentTime = new Date();
  
  constructor(private loader: LoaderService,private fetch: FetchService,private platform:Platform,private router: Router,private menu: MenuController,private toastService: ToastService,private alertController: AlertController) { }

  ngOnInit(){
    
  }
  ionViewDidEnter(){
    this.menu.enable(true, 'start');
    this.loader.present();
    this.fetch.getPuja().subscribe({next: (res) => {
      if(res){
        this.loader.dismiss();
        if(res){
        this.pujaList = res;
        this.pujaList.forEach((puja:any,index:any) => {
      
          this.fetch.getScheduleDate(puja?.id).subscribe({
            next: (res) => {
              console.log("NEW",res);
                  if(res[0]?.schedule_at){
                    if(this.toTime(res[0]?.schedule_at) > this.toTime(this.currentTime))
                    {
                      this.pujaList[index]["schedule_at"] = res[0].schedule_at;
                    }else{
                      this.pujaList[index]["schedule_at"] = "";
                    }
                  }else{
                    this.pujaList[index]["schedule_at"] = "";
                  }
                  console.log(this.pujaList);
            },
            error: (error) => {
             
            }
          });
    
        });
        console.log(res);
        }else{
          this.toastService.presentErrorToast("Something went wrong");
        }
      }
    },
    error: (error) => {
      this.pujaList = [];
      this.loader.dismiss();
      console.error('Error during login:', error);
    }
    });

    

  

    const currentDate = new Date();
    const date = new Date(currentDate);
    const timestamp = date.getTime();
    console.log(timestamp);
    this.cdate = timestamp;


    
  }
  detail(slug:any){
    this.router.navigate(['/tabs/about-puja/'+slug]);
  }
   book_puja(slug: any){
    this.router.navigate(['/tabs/booking/'+slug]);
  }
  search(){
    this.pujaList = [];
    if(this.searchKey){
    this.fetch.searchPuja(this.searchKey).subscribe({next: (res) => {
      console.log(res);
      if (res) {
        if(res.message == "Data Not Found"){
          this.pujaList = [];
        }else{
          this.pujaList = res;
        }
      } else {
        this.pujaList = [];
      }
    
  },
  error: (error) => {
    this.loader.dismiss();
    this.pujaList = [];
    console.error('Error during login:', error);
  }
  });
}else{
  this.ionViewDidEnter();
}
}
random(){
  let count = this.getRandomInteger(1, 50);
  console.log(count);
  let new_count = count + 100;
  return new_count + "+ People have booked";
}
getRandomInteger(min: number, max: number): number {
  const random = Math.random();
  const scaledRandom = random * (max - min + 1);
  const result = Math.floor(scaledRandom) + min;
  return result;
}
private getRemainingTimeObservable(scheduleDate: string): Observable<any> {
  return interval(1000).pipe(
    map(() => {
      const currentTime = new Date();
      const eventTime = this.parseEventDate(scheduleDate);

      const timeDifference = eventTime.getTime() - currentTime.getTime();

      if (timeDifference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    })
  );
}
parseEventDate(dateString: string): Date {
  // Parse the date string into a Date object
  const parsedDate = new Date(dateString);
  return parsedDate;
}
toTime(dt:any){
  const date = new Date(dt);
  const timestamp = date.getTime();
  return timestamp
}
}
