import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PujaLivePage } from './puja-live.page';

const routes: Routes = [
  {
    path: '',
    component: PujaLivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PujaLivePageRoutingModule {}
