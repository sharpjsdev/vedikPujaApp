import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContactUsPageRoutingModule } from './contact-us-routing.module';
import { ContactUsPage } from './contact-us.page';
import { HeaderModule } from '../shared/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactUsPageRoutingModule,
    HeaderModule
  ],
  declarations: [ContactUsPage]
})
export class ContactUsPageModule {}
