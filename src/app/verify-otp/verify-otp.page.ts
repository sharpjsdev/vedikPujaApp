import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';
import { FetchService } from '../services/fetch.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.page.html',
  styleUrls: ['./verify-otp.page.scss'],
})
export class VerifyOtpPage implements OnInit {
  constructor(private loader: LoaderService,private authservice:AuthService,private fetch: FetchService,private route: ActivatedRoute,private router: Router,private menu: MenuController,private toastService: ToastService) { }
  otp: any;
  userID:any;
  showOtpComponent = true;
  vid:any;
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
  config = {
    allowNumbersOnly: false,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };

  onOtpChange(otp:any) {
    this.otp = otp;
  }

  ngOnInit() {
    this.menu.enable(false, 'start');
    this.authservice.authState.subscribe(state => {
      if (state) {
        this.router.navigate(['tabs/tab3']);
      }
    });
  }
  ionViewWillEnter(){
    this.authservice.authState.subscribe(state => {
      if (state) {
        this.router.navigate(['tabs/tab3']);
      }
    });
  }
  ionViewDidEnter() {
    this.menu.enable(false, 'start');
    this.userID = this.route.snapshot.paramMap.get('id');
    this.vid = localStorage.getItem("vid");
  }
  verifyOtp(){
    let data = {'user_id':this.userID,"otp":this.otp,"vid":this.vid};
    this.loader.present();
    this.fetch.velidateOTP(data).subscribe({
      next: (res) => {
      if(res.success){
        this.loader.dismiss();
        console.log(res);
        localStorage.setItem("user_data",JSON.stringify(res.user));
        this.authservice.login();
        this.toastService.presentToast(res.success);
        this.router.navigate(['/tabs/tab3']);
      }else{
        this.loader.dismiss();
        this.toastService.presentErrorToast("Invalid otp");
      }
    },
    error: (error) => {
      this.loader.dismiss();
      console.error('Error:', error);
    }
  });
  }
  ionViewDidLeave() {
    this.menu.enable(true, 'start');
  }
}
