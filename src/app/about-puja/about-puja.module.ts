import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AboutPujaPageRoutingModule } from './about-puja-routing.module';
import { AboutPujaPage } from './about-puja.page';
import { HeaderModule } from '../shared/header/header.module';
import { ChunkPipeModule } from '../chunk.pipe.module';
import { SharedModule } from '../shared/header/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    ChunkPipeModule,
    AboutPujaPageRoutingModule,
    SharedModule,
  ],
  declarations: [AboutPujaPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AboutPujaPageModule {}
