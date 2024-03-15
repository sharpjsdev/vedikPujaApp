import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaynowComponent } from './paynow.component';


@NgModule({
  declarations: [PaynowComponent],
  imports: [CommonModule,FormsModule,IonicModule],
  exports: [PaynowComponent],
})
export class PaynowModule {}