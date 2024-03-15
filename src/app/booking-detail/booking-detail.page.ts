import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { ToastService } from '../services/toast.service';
import { LoaderService } from '../services/loader.service';
import { FetchService } from '../services/fetch.service';
import { AlertController, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.page.html',
  styleUrls: ['./booking-detail.page.scss'],
})
export class BookingDetailPage implements OnInit {

  name:any;
  email:any;
  contact_no:any;
  data:any;
  order_id:any;
  dakshina:any;
  formData:any;
  user_id:any;
  puja_id:any;
  booking_id:any;
  BookingData:any;
  pujaimgPath:any = environment.pujaImg;
  constructor(private route: ActivatedRoute,private dataService: DataService,private toastService: ToastService,private loader: LoaderService,private fetch: FetchService,private modalController: ModalController,private router: Router,private alertController: AlertController) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.loader.present();
    this.booking_id = this.route.snapshot.paramMap.get('id');
    this.fetch.bookingById(this.booking_id).subscribe({next: (res) => {
      console.log(res[0]);
      if(res[0]){
        this.loader.dismiss();
        if(res[0]){
        this.BookingData = res[0];
        if(this.BookingData.mode == "offline"){
          this.dakshina = this.BookingData.package.offline_price;
        }else{
          this.dakshina = this.BookingData.package.online_price;
        }
        
        }else{
          this.BookingData = [];
        }
      }
    },
    error: (error) => {
      this.BookingData = [];
      this.loader.dismiss();
      console.error('Error during login:', error);
    }
    });
    this.data = localStorage.getItem("user_data");
    console.log(this.data);
    if(this.data){
    this.data = JSON.parse(this.data);
    this.name = this.data.name;
    this.user_id = this.data.id;
    this.email = this.data.email;
    this.contact_no = this.data.mobile_no;
    }

    
  }


}
