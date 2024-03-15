import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { FetchService } from '../services/fetch.service';
import { DataService } from '../services/data.service';
import { LoaderService } from '../services/loader.service';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Observable, interval, map } from 'rxjs';

@Component({
  selector: 'app-about-puja',
  templateUrl: './about-puja.page.html',
  styleUrls: ['./about-puja.page.scss'],
})
export class AboutPujaPage implements OnInit {
  slug:any;
  pujaList:any;
  pujaDetail:any;
  pujaName:any;
  pujaimgPath = environment.pujaImg; 
  pujaImg:any;
  pujaSlug:any;
  pujaPrice:any;
  longText: string = 'Kolhapur is an old Maharashtra city located on the banks of the Panchganga River. It is mentioned in several scriptures, including the Devi Gita and the Devi Bhagwat Puran, as well as other Shakta literature. Karvirpur Kshetra is another name for it, and Mahalakshmi is another ';
  previewText: string = this.longText.slice(0, 80); // Display the first 100 characters as a preview
  showFullText: boolean = false;
  remainingTime$!: Observable<any>;
  remainingTimeShort$: Observable<any>[] = [];
  pujaSchedule:any;
  config: any = {
    slidesPerView: 2,
    initialSlide: 0,
    loop: false,
    autoplay: false,
    centeredSlides: true,
    spaceBetween: 10,
  };
  currentTime = new Date();
  constructor(private domSanitizer: DomSanitizer,private loader: LoaderService,private toastService: ToastService,private alertController: AlertController,private fetch: FetchService,private route: ActivatedRoute,private router: Router,private dataService: DataService) {}

  ngOnInit() {
  }

ionViewDidEnter(){
  this.loader.present();
  this.slug = this.route.snapshot.paramMap.get('id');
  this.fetch.getPujaById(this.slug).subscribe({
    next: (res) => {
    if(res){
      if(res){
      this.loader.dismiss();
      this.pujaDetail = res.puja[0];
      this.longText = this.removeTagsAndnbsp(this.pujaDetail.description);
      this.previewText = this.removeTagsAndnbsp(this.pujaDetail.description).slice(0, 100);
      this.pujaName =  this.pujaDetail.name;
      this.pujaImg =  this.pujaDetail.image;
      this.pujaSlug =  this.pujaDetail.slug;
      this.pujaPrice = this.pujaDetail.price;

      this.fetch.getScheduleDate(this.pujaDetail?.id).subscribe({
        next: (res) => {
          console.log(res);
              if(res[0].schedule_at){
                
                if(this.toTime(res[0].schedule_at) > this.toTime(this.currentTime))
                {
                this.pujaDetail["schedule_at"] = res[0].schedule_at;
                this.remainingTime$ = this.getRemainingTimeObservable(res[0].schedule_at);
                }
                else{
                  this.pujaDetail["schedule_at"] = "";
                }

              }else{
                this.pujaDetail["schedule_at"] = "";
              }
        },
        error: (error) => {
         
        }
      });
      
      console.log(this.pujaDetail);
      
      }else{
        this.loader.dismiss();
        this.toastService.presentErrorToast("Something went wrong");
      }
    }
  },
  error: (error) => {
    this.loader.dismiss();
    console.error('Error during login:', error);
  }
});
this.fetch.getPuja().subscribe({next: (res) => {
  if(res){
    this.loader.dismiss();
    if(res){
    this.pujaList = res;
    const filteredArray = this.pujaList.filter((item: {slug: string; key: string; }) => item.slug !== this.slug);
    this.pujaList  = filteredArray;
    console.log(this.pujaList);
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
}

  toggleReadMore() {
    this.showFullText = !this.showFullText;
  }
  about_puja(slug: any){
     this.router.navigate(['/tabs/about-puja/'+slug]);
  }
  book_puja(slug: any){
    this.router.navigate(['/tabs/booking/'+slug]);
  }
  removeTagsAndnbsp(input:any) {
    const withoutTags = input.replace(/<\/?[^>]+(>|$)/g, '');
    const withoutNbsp = withoutTags.replace(/&nbsp;/g, ' ');
    return withoutNbsp;
  }
  sanitizeHtml(htmlString: string): SafeHtml {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    const cleanHtml = doc.body.textContent || "";
    const sanitizedHtml = this.domSanitizer.bypassSecurityTrustHtml(cleanHtml);
    return sanitizedHtml;
  }

  getRemainingTimeObservable(scheduleDate: string): Observable<any> {
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

  private parseEventDate(dateString: string): Date {
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
