import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';
import { AlertController } from '@ionic/angular';
import { FetchService } from '../services/fetch.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { environment } from '../../environments/environment';
import { Observable, interval, map } from 'rxjs';

@Component({
  selector: 'app-about-temple',
  templateUrl: './about-temple.page.html',
  styleUrls: ['./about-temple.page.scss'],
})
export class AboutTemplePage implements OnInit {

  longText: any;
  previewText: any;
  showFullText: boolean = false;
  formData: any = {}; 
  anArray:any=[];
  data:any;
  submit:boolean = false;
  slug:any;
  pujaDetail:any;
  templeDetail:any;
  templeName:any;
  pujaImgPath = environment.pujaImg;
  templeimgPath = environment.templeImg;
  templeImg:any;
  templePujaList:any;
  config: any = {
    slidesPerView: 2,
    initialSlide: 0,
    loop: false,
    autoplay: false,
    centeredSlides: true,
    spaceBetween: 10,
  };
  remainingTime$: Observable<any>[] = [];
  currentTime = new Date();

  constructor(private domSanitizer: DomSanitizer,private loader: LoaderService,private toastService: ToastService,private alertController: AlertController,private fetch: FetchService,private route: ActivatedRoute,private router: Router,private dataService: DataService) {}

  ngOnInit() {
  
  }

  
  ionViewDidEnter(){
    this.loader.present();
    this.slug = this.route.snapshot.paramMap.get('id');
    this.fetch.getTempleId(this.slug).subscribe({
      next: (res) => {
      if(res){
        if(res[0]){
        this.loader.dismiss();
        this.templeDetail = res[0];
        this.longText = this.removeTagsAndnbsp(this.templeDetail.description);
        this.previewText = this.removeTagsAndnbsp(this.templeDetail.description).slice(0, 100);
        this.templeName =  this.templeDetail.name;
        this.templeImg =  this.templeDetail.image;
        this.templePujaList =  this.templeDetail.pujas;
        this.templePujaList.forEach((puja:any,index:any) => {
        
          this.fetch.getScheduleDate(puja?.puja_id).subscribe({
            next: (res) => {
                  if(res[0].schedule_at){
                    if(this.toTime(res[0].schedule_at) > this.toTime(this.currentTime))
                    {
                    this.templePujaList[index]["schedule_at"] = res[0].schedule_at;
                    }else{
                      this.templePujaList[index]["schedule_at"] = "";
                    }
                  }else{
                    this.templePujaList[index]["schedule_at"] = "";
                  }
            },
            error: (error) => {
             
            }
          });
        });
      
        console.log(res[0]);
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
  toggleReadMore() {
    this.showFullText = !this.showFullText;
  }
  about_puja(slug: any){
    this.router.navigate(['/tabs/about-puja/'+slug]);
 }
 book_puja(slug: any){
   this.router.navigate(['/tabs/booking/'+slug]);
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
