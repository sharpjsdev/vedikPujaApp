import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutTemplePage } from './about-temple.page';

const routes: Routes = [
  {
    path: '',
    component: AboutTemplePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutTemplePageRoutingModule {}
