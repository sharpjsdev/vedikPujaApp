import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { FetchService } from '../services/fetch.service';
import { ToastService } from '../services/toast.service';
import { AlertController } from '@ionic/angular';
import { LoaderService } from '../services/loader.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {

  longText: any;
  previewText: any;
  showFullText: boolean = false;
  formData: any = {
      pujaMode: 'online', 
  }; 
  anArray:any=[];
  data:any;
  submit:boolean = false;
  slug:any;
  pujaDetail:any;
  pujaName:any;
  imgPath = environment.pujaImg; 
  pujaImg:any;
  puja_id:any;
  udata:any;
  templeList:any;
  temp_id:any;
  pujaPrice :any;
  selectedPackageId:any;
  devotee_names:any=[];
  pkgImgPath:any = "https://vedikpuja.com/public/packages/";
  pujaDetailpkg:any = [];
  mode:any;
  partner_name:any;
  dakshinaa:any;
  remainingTime$!: Observable<any>;
  currentTime = new Date();
  payments:any;
  selectedPayments: { [key: number]: boolean } = {};
  allChecked = false;
  addtionalData:any = [];

  constructor(private domSanitizer: DomSanitizer,private loader: LoaderService,private toastService: ToastService,private alertController: AlertController,private fetch: FetchService,private route: ActivatedRoute,private router: Router,private dataService: DataService) {}
  ngOnInit(){
    this.formData.pujaMode = "online";
  }
  ionViewDidEnter(){
    
    console.log(this.formData.pujaMode);
    this.partner_name = "";
    this.anArray = [];
    this.devotee_names = [];
    this.formData.name = [];
    this.udata = localStorage.getItem("user_data");
    if(this.udata){
    this.udata = JSON.parse(this.udata);
    }
    this.formData = {}; 
    if(this.udata.name){
      this.formData.name = this.udata.name;
    }
    this.loader.present();
    this.slug = this.route.snapshot.paramMap.get('id');

    this.fetch.getPujaById(this.slug).subscribe({
      next: (res) => {
      if(res){
        if(res){
        this.loader.dismiss();
        this.payments = res.payments;
        console.log(this.payments);
        this.pujaDetail = res.puja[0];
        this.pujaDetailpkg = this.pujaDetail.packages;
        this.longText = this.removeTagsAndnbsp(this.pujaDetail.description);
        this.previewText = this.removeTagsAndnbsp(this.pujaDetail.description).slice(0, 100);
        this.pujaName =  this.pujaDetail.name;
        this.pujaImg =  this.pujaDetail.image;
        this.formData.daskshina = this.pujaDetail.price;
        this.formData.puja_id = this.pujaDetail.id;
        this.templeList = this.pujaDetail.temples;
        this.pujaPrice = this.pujaDetail.price;
        this.remainingTime$ = this.getRemainingTimeObservable(this.pujaDetail.booked_puja[0]?.schedule_at);
        this.ChangeTab(this.pujaDetail.packages[0].id);
        this.dakshinaa = this.getOnline_price();
        console.log(res[0]);

        this.fetch.getScheduleDate(this.pujaDetail.id).subscribe({
          next: (res) => {
            console.log(res);
                if(res[0].schedule_at){
                  console.log(this.toTime(res[0].schedule_at));
                  console.log(this.toTime(this.currentTime));
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

  getImageSource(): string | null {
    const selectedPackage = this.pujaDetailpkg.find((pkg: { id: any; }) => pkg.id === this.selectedPackageId);
    return selectedPackage ? this.pkgImgPath + selectedPackage.icon : null;
  }

  getTitle(): string | null {
    const selectedPackage = this.pujaDetailpkg.find((pkg: { id: any; }) => pkg.id === this.selectedPackageId);
    return selectedPackage ? selectedPackage.name : null;
  }

  getDescription(): string | null {
    const selectedPackage = this.pujaDetailpkg.find((pkg: { id: any; }) => pkg.id === this.selectedPackageId);
    return selectedPackage ? selectedPackage.description : null;
  }
  getOffline_price(): string | null {
    const selectedPackage = this.pujaDetailpkg.find((pkg: { id: any; }) => pkg.id === this.selectedPackageId);
    return selectedPackage ? selectedPackage.offline_price : null;
  }
  getOnline_price(): string | null {
    const selectedPackage = this.pujaDetailpkg.find((pkg: { id: any; }) => pkg.id === this.selectedPackageId);
    return selectedPackage ? selectedPackage.online_price : null;
  }
  

  pujaModeChange(){
    if(this.formData.pujaMode == "offline"){
      console.log(this.getOffline_price());
      this.formData.price = this.getOffline_price();
      this.dakshinaa = this.getOffline_price();
      this.formData.mode = "offline";
    }else{
      console.log(this.getOnline_price());
      this.formData.price = this.getOnline_price();
      this.formData.mode = "online";
      this.dakshinaa = this.getOnline_price();
    }
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
  isValidName(): boolean {
    return this.formData.name;
  }
  isValidTemple(): boolean {
    return this.formData.temple;
  }
  isValidMode(): boolean {
    return this.formData.pujaMode;
  }
  toggleReadMore() {
    this.showFullText = !this.showFullText;
  }
  goTo(){
    console.log('this.anArray',this.anArray);
    this.data=true;
    }
  Add(){
    if(this.getTitle() == "Short Family" && this.anArray.length <= 2){
    this.anArray.push({'value':''});
    }
    if((this.getTitle() == "Joint Family")){
      this.anArray.push({'value':''});
      }
    
    }
  remove_name(index:any){
    this.anArray.splice(index, 1);
  }
  nextStep() {
    this.devotee_names = [];
    
    

    this.submit = true;
    if(this.submit && this.isValidTemple() && this.isValidName() && this.isValidMode()){

      this.devotee_names.push(this.formData.name);

      if(this.formData.name){
        this.formData.name = JSON.stringify(this.devotee_names);
      }
      if(this.partner_name){
        this.devotee_names.push(this.partner_name);
        this.formData.name = JSON.stringify(this.devotee_names);
      }
      
      if(this.anArray.length > 0) {
          for (let i = 0; i < this.anArray.length; i++) {
            this.devotee_names.push(this.anArray[i].value);
          }
          this.formData.name = JSON.stringify(this.devotee_names);
        }
      console.log(this.formData);
      this.formData.addtional = this.addtionalData;
      this.formData.total = this.dakshinaa;

      this.dataService.setFormData(this.formData);
      this.submit = false;
      this.router.navigate(['/tabs/address']);
    }
  }
  ChangeTab(tabNo:any){
    this.partner_name = "";
    this.formData.pujaMode = "";
    this.dakshinaa = "";
    this.formData.package_id = tabNo;
    this.selectedPackageId = tabNo;
    this.anArray = [];
    this.devotee_names = [];
    if(this.formData.pujaMode == "offline"){
      this.dakshinaa = this.getOffline_price();
    }else{
      this.dakshinaa = this.getOnline_price();
    }
    
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

  onCheckboxChange(selectedId: number) {
    const product = this.payments.find((item: { id: number; }) => item.id === selectedId);
    if (this.selectedPayments[selectedId]) {
      this.addtionalData.push(selectedId);
      
      this.dakshinaa = parseInt(this.dakshinaa) + parseInt(product.price);
    } else {
      const index = this.addtionalData.indexOf(selectedId);
      this.dakshinaa = parseInt(this.dakshinaa) - parseInt(product.price);
      if (index !== -1) {
        this.addtionalData.splice(index, 1);
      }
    }
    console.log(this.addtionalData);
  }
 
}
