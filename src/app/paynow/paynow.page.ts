import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ToastService } from '../services/toast.service';
import { LoaderService } from '../services/loader.service';
import { AlertController, ModalController } from '@ionic/angular';
import { FetchService } from '../services/fetch.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Checkout } from 'capacitor-razorpay';

@Component({
  selector: 'app-paynow',
  templateUrl: './paynow.page.html',
  styleUrls: ['./paynow.page.scss'],
})
export class PaynowPage implements OnInit {
  pay_method:any;
  name:any;
  email:any;
  contact_no:any;
  data:any;
  order_id:any;
  dakshina:any;
  dakshinaa:any;
  formData:any;
  user_id:any;
  puja_id:any;
  booking_id:any;
  BookingData:any;
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

        if(this.BookingData.total_amount)
        {
          this.dakshinaa = this.BookingData.total_amount;
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

    this.formData = this.dataService.getFormData();
    this.puja_id = this.formData.puja_id;
  }

  async payWithRazorpay(){
    let data:any;
    this.dakshina = this.dakshinaa * 100;
    const options = {
      //key: 'rzp_test_K27kCJdsdV44TI',
      key:'rzp_live_IDmm4tPSVOHxq6',
      amount: this.dakshina,
      description: 'Vedik Puja Dakshina',
      image: '../../../assets/images/v-logo.png',
      currency: 'INR',
      name: 'VedikPuja',
      prefill: {
        name:this.name,
        email: "nik@gmail.com",
        contact: "9998899988",
      },
      theme: {
        color: '#d30402'
      },
      handler: function (response:any) {
        // Handle the response here
        console.log(response);
      }
    }
    try {
    let data:any = (await Checkout.open(options));
    let Pay_data:any = JSON.stringify(data);
    console.log(data.response.razorpay_payment_id);
    let payment_data = {'booking_id':this.booking_id,'razorpay_payment_id':data.response.razorpay_payment_id};
    this.loader.present();
    this.fetch.payment(payment_data).subscribe({
      next: (res) => {
      if(res){
        this.loader.dismiss();
        this.toastService.presentToast("Puja has been booked Succesfully");
        this.router.navigate(['/tabs/tab1']);
      }
      },
      error: (error) => {
        this.loader.dismiss();
        this.toastService.presentErrorToast("Something went wrong");
      }
    });
    } catch (error:any) {
        if(error['code']){
        let errorObj = JSON.parse(error['code'])
        console.log(errorObj.reason);
        }
        this.toastService.presentErrorToast("Payment canceled");
        this.router.navigate(['/tabs/tab1']);
    }
  }
   

}
