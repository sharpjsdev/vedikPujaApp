import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { MenuController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  
  imagepath:any = "../../assets/images/profile_img.png";
  profilePath = environment.userImg;
  currentURI:any;
  user_data:any;
  userName:any;
  note_count:any;
  constructor(private pushNotificationService: NotificationService,private navCtrl: NavController,private dataService: DataService,private router: Router,private location:Location,private menu: MenuController,private event : EventService) { }

  
  ngOnInit() {
    this.pushNotificationService.noteCount();
    const currentTime = new Date();
    const formattedTime = currentTime.toISOString();
    this.currentURI = this.router.url;
    this.menu.enable(true, 'start');
    this.user_data = localStorage.getItem('user_data');
    if(this.user_data){
    this.user_data = JSON.parse(this.user_data);
    if(this.user_data){
      if(this.user_data.image){
        this.imagepath = this.profilePath+this.user_data.image+"?time="+formattedTime;
      }
      if(this.user_data.name){
        this.userName = this.user_data.name;
      }else{
        this.userName = "";
      }
    }
    }
    
    this.event.subscribe('user:refresh', (data: any) => {
      this.user_data = localStorage.getItem('user_data');
      if(this.user_data){
      this.user_data = JSON.parse(this.user_data);
      if(this.user_data.image){
        this.imagepath = this.profilePath+this.user_data.image+"?time="+formattedTime;
      }else{
        this.imagepath = "../../assets/images/profile_img.png";
      }
      if(this.user_data.name){
        this.userName = this.user_data.name;
      }else{
        this.userName = "";
      }
    }
    });

    this.event.subscribe('notification:refresh', (data: any) => {
      this.note_count = this.dataService.getNoteCount();
      //console.log("ngTabs", this.note_count);
    });
    
  }
  home(){
    this.router.navigate(['/tabs/tab3']);
  }
  profilePage(){
    this.router.navigate(['/tabs/tab4']);
  }
  back(){
    this.navCtrl.back();
  }
  open_menu(){
    this.menu.toggle('start');
  }
}
