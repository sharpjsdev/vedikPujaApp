import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PujaLivePageRoutingModule } from './puja-live-routing.module';
import { PujaLivePage } from './puja-live.page';
import { SafePipeModule } from '../pipes/safe.pipe.module';
import { HeaderModule } from '../shared/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SafePipeModule,
    HeaderModule,
    PujaLivePageRoutingModule
  ],
  declarations: [PujaLivePage]
})
export class PujaLivePageModule {}
