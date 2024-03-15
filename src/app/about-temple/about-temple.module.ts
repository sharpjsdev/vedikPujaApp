import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AboutTemplePageRoutingModule } from './about-temple-routing.module';
import { AboutTemplePage } from './about-temple.page';
import { HeaderModule } from '../shared/header/header.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChunkPipeModule } from '../chunk.pipe.module';
import { SharedModule } from '../shared/header/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    ChunkPipeModule,
    SharedModule,
    AboutTemplePageRoutingModule
  ],
  declarations: [AboutTemplePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AboutTemplePageModule {}
