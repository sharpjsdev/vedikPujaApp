import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Checkout } from 'capacitor-razorpay';
import { FetchService } from 'src/app/services/fetch.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-paynow',
  templateUrl: './paynow.component.html',
  styleUrls: ['./paynow.component.scss'],
})
export class PaynowComponent  implements OnInit {

  pay_method:any;
  name:any;
  email:any;
  contact_no:any;
  data:any;
  order_id:any;
  dakshina:any;
  formData:any;
  user_id:any;
  puja_id:any;

  constructor(private dataService: DataService,private toastService: ToastService,private loader: LoaderService,private fetch: FetchService,private modalController: ModalController,private router: Router,private alertController: AlertController) { }

  ngOnInit() {
    this.data = localStorage.getItem("user_data");
    console.log(this.data);
    if(this.data){
    this.data = JSON.parse(this.data);
    this.name = this.data.name;
    this.user_id = this.data.id;
    this.email = this.data.name;
    this.contact_no = this.data.mobile_no;
    
    }

    this.formData = this.dataService.getFormData();
    this.dakshina = this.formData.daskshina;
    this.puja_id = this.formData.puja_id;
  }

  closeModal() {
    this.modalController.dismiss();
  }
  pay(){
    this.router.navigate(['/tabs/tab1']);
    this.modalController.dismiss();
  }
  payMethod(){
    console.log("method");
    
  }

  async payWithRazorpay(){
    this.modalController.dismiss();
    let data:any;
    this.dakshina = this.dakshina * 100;
    // data = {'amount':95100,'currency':"INR","receipt": "order_rcptid_11"};
    
    // this.fetch.createOrder(data).subscribe({
    //   next: (res) => {
    //   if(res){
    //     if(res.id){
    //       this.order_id = res.id;
    //     }else{
    //       this.toastService.presentErrorToast("Something went wrong");
    //       this.router.navigate(['/tabs/tab3']);
    //     }
    //   }
    //   },
    //   error: (error) => {
       
    //   }
    // });
    const options = {
      key: 'rzp_test_IctRMSzwfgbslH',
      amount: this.dakshina,
      description: 'Vedik Puja Dakshina',
      image: '../../../assets/images/v-logo.png',
      currency: 'INR',
      name: 'VedikPuja',
      prefill: {
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
     
    let data = (await Checkout.open(options));
    console.log(data.response+"AcmeCorp");
    let Pay_data = JSON.stringify(data);

    console.log(Pay_data);
    

    } catch (error:any) {
      //it's paramount that you parse the data into a JSONObject
      if(error['code']){
      let errorObj = JSON.parse(error['code'])
      // console.log(errorObj.description);
      // console.log(errorObj.code);
      console.log(errorObj.reason);
      // console.log(errorObj.step);
      // console.log(errorObj.source);
      // console.log(errorObj.metadata.order_id);
      // console.log(errorObj.metadata.payment_id);
      }
      this.toastService.presentErrorToast("Payment canceled");
      this.router.navigate(['/tabs/tab3']);
    }
  }
    async presentAlert(response: any){
    // let responseObj = JSON.parse(response)
    console.log("message"+ response['razorpay_payment_id']);
    const alert = await this.alertController.create({
      message:response['razorpay_payment_id'],
      backdropDismiss: true,
    });

    await alert.present();
  }
}
