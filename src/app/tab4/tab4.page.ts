import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { FetchService } from '../services/fetch.service';
import { LoaderService } from '../services/loader.service';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  date:any;
  imagepath:any = "../../assets/images/profile_img.png";
  img:any;
  formData: any = {}; 
  data:any;
  profilePath = environment.userImg;
  submit:any = false;
  maxDate: any; 

  constructor(private loader: LoaderService,private fetch: FetchService,private event : EventService,private toastService: ToastService,private router: Router) {
    const today = new Date();
    const PrevYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    this.maxDate = PrevYear.toISOString();
  }


  ngOnInit() {
    this.formData.gender = "male";
  }
  ionViewDidEnter(){
    this.submit = false;
    this.data = localStorage.getItem("user_data");
    console.log(this.data);
    if(this.data){
    this.data = JSON.parse(this.data);
    console.log(this.data);
    if(this.data){
      if(this.data.image){
        this.imagepath = this.profilePath + this.data.image;
        console.log(this.imagepath);
      }
      this.formData.id = this.data.id;
      this.formData.name    = this.data.name;
      this.formData.email   = this.data.email;
      this.formData.mobile_no = this.data.mobile_no;
      this.formData.gender  = this.data.gender;
      this.formData.dob = this.data.dob;
      this.date = this.data.dob;
      this.formData.image = this.data.image;
      this.formData.country_code = this.data.country_code;
    }
  }
  }
  gen(){
    console.log(this.formData.gender);
  }
  setdate(){
    this.formData.dob = this.date;
  }
  update(){
    
    // console.log(this.formData);
    let data:any;
    if(this.img){
      data = {'id':this.formData.id,'mobile_no' : this.formData.mobile_no,'name':this.formData.name,'email':this.formData.email,'dob':this.date,'gender':this.formData.gender,'image':this.formData.image,'country_code':this.formData.country_code};
    }else{
      data = {'id':this.formData.id,'mobile_no' : this.formData.mobile_no,'name':this.formData.name,'email':this.formData.email,'dob':this.date,'gender':this.formData.gender,'country_code':this.formData.country_code};
    }
    this.submit = true;
    if(this.submit && this.isValidName() && this.isValidEmail()){
      this.loader.present();
    this.fetch.updateProfile(data).subscribe({
      next: (res) => {
      
        if(!res.errors){
        this.loader.dismiss();
        localStorage.setItem("user_data",JSON.stringify(res.user));
        this.event.publish('user:refresh', {
        });
        this.toastService.presentToast(res.notification);
        this.router.navigate(['/tabs/tab3']);
        }else{
          this.loader.dismiss();
          if(res.errors.email){
          this.toastService.presentErrorToast(res.errors.email);
          }
        }
      },
      error: (error) => {
        this.loader.dismiss();
        this.toastService.presentErrorToast(error);
      }
    });
  }
    }

  loadProfileFromDevice(event:any) 
  {
    const inputElement = event.target as HTMLInputElement;
      const file = inputElement?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagepath = reader.result as string;
          this.img = reader.result as string;
          this.formData.image = this.img;
          console.log(this.imagepath);
        };
        reader.readAsDataURL(file);
      } else {
        this.imagepath = ''; 
      }
      
  };


isValidName(): boolean {
  return this.formData.name;
}
isValidEmail(): boolean {
  return this.formData.email;
}

}
