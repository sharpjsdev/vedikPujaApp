import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { FetchService } from '../services/fetch.service';
import { EventService } from '../services/event.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

  constructor(private loader: LoaderService,private fetch: FetchService,private event : EventService,private toastService: ToastService,private router: Router) { }
  formData: any = {};
  submit:any = false;
  u_data:any;
  contactData:any= [];
  ngOnInit() {
  }
  ionViewDidEnter(){
    this.u_data = localStorage.getItem("user_data");
    console.log(this.u_data);
    if(this.u_data){
    this.u_data = JSON.parse(this.u_data);
    if(this.u_data.name){
    this.formData.name = this.u_data.name;
    }
    if(this.u_data.email){
      this.formData.email = this.u_data.email;
    }
    }

    this.fetch.contactUsDetail().subscribe({
      next: (res) => {
        console.log(res);
        this.contactData = res[0];
        console.log(this.contactData.email);
      },
      error: (error) => {
        
      }
    });
    
  }
  isValidName(): boolean {
    return this.formData.name;
  }
  isValidEmail(): boolean {
    return this.formData.email;
  }
  contact()
  {
    this.submit = true;
    if(this.submit && this.isValidName() && this.isValidEmail())
    {
      console.log(this.formData);
      let data = {'name': this.formData.name ,'email' : this.formData.email ,'message' : this.formData.msg};
      this.loader.present();
      this.fetch.contactUs(data).subscribe({
        next: (res) => {
          this.loader.dismiss();
          this.formData = {};
          this.submit = false;
          if(res.status){
          this.toastService.presentToast(res.message);
          }
        },
        error: (error) => {
          this.loader.dismiss();
          this.toastService.presentErrorToast(error);
        }
      });
    }
  }
}
