import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutPujaPage } from './about-puja.page';

const routes: Routes = [
  {
    path: '',
    component: AboutPujaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutPujaPageRoutingModule {}
