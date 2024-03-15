import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule,FormsModule,IonicModule],
  exports: [HeaderComponent],
})
export class HeaderModule {
  
}