import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayResponsePageRoutingModule } from './pay-response-routing.module';

import { PayResponsePage } from './pay-response.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayResponsePageRoutingModule
  ],
  declarations: [PayResponsePage]
})
export class PayResponsePageModule {}
