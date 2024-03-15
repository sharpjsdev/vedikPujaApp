import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, Platform } from '@ionic/angular';
import { ToastService } from '../services/toast.service';
import { App } from '@capacitor/app';
import { Location } from '@angular/common';
import { FetchService } from '../services/fetch.service';
import * as intlTelInput from 'intl-tel-input';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { ActionPerformed, PushNotificationSchema,PushNotifications,Token} from '@capacitor/push-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  countryCode:any = "91";
  mobileNumber:any;
  termsConditions:any;
  send_puja:any = true;
  device_token:any = "";
  submit:boolean = false;
  userRes:any ;

  constructor(private loader: LoaderService,private authservice:AuthService,private fetch: FetchService,private platform:Platform,private location: Location,private router: Router,private menu: MenuController,private toastService: ToastService,private alertController: AlertController) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.handleBackButton();
    });
  }

  ngOnInit() {
    this.authservice.authState.subscribe(state => {
      if(state) {
        this.router.navigate(['tabs/tab3']);
      }
  });
  
  }

  handleBackButton() {
    const currentUrl = this.router.url;
    if (currentUrl === '/login') {
      this.showExitConfirmationAlert();
    } 
  }

  ionViewDidEnter(){
    PushNotifications.addListener('registration', (token: Token) => {
      console.log(token);
      localStorage.setItem("device_token",JSON.stringify(token.value));
      this.device_token = token.value;
    });
    console.log("DidEnter");
    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error on registration: ' + JSON.stringify(error));
    });

    this.menu.enable(false, 'start');
    this.refreshIntlTelInput();
  }
  login(){
    console.log(this.mobileNumber);
    this.submit = true;
    if(this.submit && this.mobileNumber){
    if(this.termsConditions){
    this.submit = false;
    let data = {'mobile_no':this.mobileNumber,'device_type':"App",'country_code':"+"+this.countryCode ,'device_token':this.device_token};
    this.loader.present();
    this.fetch.login(data).subscribe({
    next: (res) => {
      if(res){
        this.loader.dismiss();
        this.toastService.presentToast(res.message);
        
        this.mobileNumber = "";
        if(res.User_id){
        localStorage.setItem("vid",res.verifyCode);
        this.router.navigate(['/verify-otp/'+res.User_id]);
        }else{
          this.toastService.presentErrorToast("Invalid input");
        }
      }
      },
      error: (error) => {
        this.loader.dismiss();
        console.error('Error:', error);
      }
    });
    }else{
      this.toastService.presentErrorToast("Please check terms and conditions");
    }
  }
}

change(){
  this.submit = false;
}
send_puja_update(){

}
terms(){
  this.router.navigate(['/terms']);
}

policy(){
  this.router.navigate(['/policy']);
}

async showExitConfirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Exit App',
      message: 'Are you sure you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'Exit',
          handler: () => {
            App.exitApp(); // Exit the app
          },
        },
      ],
    });
  
    await alert.present();
}

refreshIntlTelInput() {
    // Get the input element by ID
    const inputElement = document.getElementById('phone');

    if (inputElement) {
      // Destroy the existing intlTelInput instance
      const existingInstance = window.intlTelInputGlobals.getInstance(inputElement);
      if (existingInstance) {
        existingInstance.destroy();
      }

      // Create a new intlTelInput instance
      const iti = intlTelInput(inputElement, {
        initialCountry: 'IN',
        separateDialCode: true,
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.2.1/js/utils.js'
      });

      
        inputElement.addEventListener('countrychange', () => {
          const selectedCountryData = iti.getSelectedCountryData();
          this.countryCode = selectedCountryData.dialCode;
          console.log(this.countryCode);
        });
        // Check if dark mode is enabled
          const isDarkModeEnabled = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Apply Ionic's theming for text color
        if (isDarkModeEnabled) {
            inputElement.classList.add('dark-text');
        }
    }
  }
 
}
