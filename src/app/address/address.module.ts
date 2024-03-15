import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressPageRoutingModule } from './address-routing.module';

import { AddressPage } from './address.page';
import { PaynowModule } from '../payment/paynow/paynow.module';
import { HeaderModule } from '../shared/header/header.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    PaynowModule,
    AddressPageRoutingModule
  ],
  declarations: [AddressPage]
})
export class AddressPageModule {}
