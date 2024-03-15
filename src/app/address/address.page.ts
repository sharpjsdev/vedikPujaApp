import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { AlertController, ModalController } from '@ionic/angular';
import { PaynowComponent } from '../payment/paynow/paynow.component';
import { LoaderService } from '../services/loader.service';
import { Geolocation } from '@capacitor/geolocation';
import { FetchService } from '../services/fetch.service';
import { ToastService } from '../services/toast.service';

declare var google: any;

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  
  formData: any = {}; 
  loc:any;
  geoAddress:any;
  udata:any;
  user_id:any;
  stateList:any;
  cityList:any;
  submit = false;
  dakshinaa:any = "";
  constructor(private toastService: ToastService,private alertController: AlertController,private fetch: FetchService,private loader: LoaderService,private router: Router,private dataService: DataService,private modalController: ModalController) {
   
  }
  ngOnInit() {
  
  }
  ionViewDidEnter(){
    this.submit = false;
    this.formData = {};
    let formD = this.dataService.getFormData();
    console.log(formD);
    this.formData.name = formD.name;
    this.formData.gotra = formD.gotra;
    this.formData.wish = formD.wish;
    this.formData.daskshina = formD.price;
    this.formData.puja_id = formD.puja_id;
    this.formData.temple = formD.temple;
    this.formData.mode = formD.pujaMode;
    this.formData.package_id = formD.package_id;
    this.formData.addtional = formD.addtional;
    this.formData.total = formD.total;
    if(this.formData.total && this.formData.addtional){
      this.dakshinaa = this.formData.total;
    }else{
      this.dakshinaa = this.formData.daskshina;
    }
    
    this.udata = localStorage.getItem("user_data");
    if(this.udata){
      this.udata = JSON.parse(this.udata);
      this.user_id = this.udata.id;
    }
    this.fetch.getState().subscribe({next: (res) => {
      if(res){
        this.stateList = res;
        console.log(res);
      }else{
        this.stateList = [];
      }
    },
    error: (error) => {
      this.stateList = [];
      console.error('Error during login:', error);
    }
    });
  }
  nextStep(){
    this.submit = true;
    if(this.submit && this.isValidState() && this.isValidCity()){
    console.log(this.formData.temple);
    let booking_data:any = {'addtional':this.formData.addtional,'total':this.formData.total,'mode':this.formData.mode,'package_id':this.formData.package_id,'temple_id':this.formData.temple,'devotee':this.formData.name,'gotra':this.formData.gotra,'wish':this.formData.wish,'postcode':this.formData.pin,'city':this.formData.city,'state':this.formData.state,'delivery_address':this.formData.address,'user_id':this.user_id,'puja_id':this.formData.puja_id};
    console.log(booking_data);
    this.fetch.bookingPuja(booking_data).subscribe({
      next: (res) => {
      if(res){
        console.log(res);
        if(res.puja.id){
          this.router.navigate(['/tabs/paynow/'+res.puja.id]);
        }
      }
      },
      error: (error) => {
        this.loader.dismiss();
        this.toastService.presentErrorToast(error);
      }
    });
  }
    console.log(this.formData);
  }
  isValidState(): boolean {
    return this.formData.state;
  }
  isValidCity(): boolean {
    return this.formData.city;
  }
  async fetchLocation() {
    this.loader.present();
    try {
    this.loc = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      maximumAge: 10000, 
      timeout: 10000,   
    });
    } catch (error:any) {
      this.loader.dismiss();
      if (error.message === 'location disabled') {
        this.toastService.presentErrorToast('Please enable location of your phone to get current location');
      } else {
        this.toastService.presentErrorToast(error.message);
      }
    }
  this.fetch.generateAddress(this.loc.coords.latitude,this.loc.coords.longitude).subscribe({
    next: (res:any) => {
    if(res){
      this.loader.dismiss();
      this.formData.address = res.display_name;
      this.formData.pin = res.address.postcode;
      console.log(JSON.stringify(res));
    }
  },
  error: (error:any) => {
    console.error('Error:', error);
  }
});

}

removeWordFromString(str: string, rm: string): string {
  const regex = new RegExp(rm, 'g');
  const resultString = str.replace(regex, '');
  return resultString;
}

async openPaySheet() {
   
    const modal = await this.modalController.create({
      component: PaynowComponent,
      cssClass: 'bottom-sheet-modal',
      backdropDismiss: true
    });

    return await modal.present();
  }
 cityByState(){
  let id = this.formData.state;
  console.log(id);
  this.fetch.getCity(id).subscribe({next: (res) => {
    this.loader.dismiss();
    if(res){
      this.cityList = res;
      console.log(res);
    }else{
      this.cityList = [];
    }
  },
  error: (error) => {
    this.loader.dismiss();
    this.cityList = [];
    console.error('Error during login:', error);
  }
  });
 }
  
}
