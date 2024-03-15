import { Component } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { LoaderService } from '../services/loader.service';
import { DataService } from '../services/data.service';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

note_count:any;

constructor(private event : EventService,private dataService: DataService,private loader: LoaderService,private pushNotificationService: NotificationService) {
    this.event.subscribe('notification:refresh', (data: any) => {
      this.note_count = this.dataService.getNoteCount();
      console.log("ngTabs", this.note_count);
    });
    setTimeout(() => {
        this.note_count = this.dataService.getNoteCount();
        console.log("Tabs", this.note_count); 
      }, 1000);
    }
}
