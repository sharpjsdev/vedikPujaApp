import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaynowPageRoutingModule } from './paynow-routing.module';
import { PaynowPage } from './paynow.page';
import { HeaderModule } from '../shared/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    PaynowPageRoutingModule
  ],
  declarations: [PaynowPage]
})
export class PaynowPageModule {}
