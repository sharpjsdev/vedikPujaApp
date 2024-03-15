import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayResponsePage } from './pay-response.page';

const routes: Routes = [
  {
    path: '',
    component: PayResponsePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayResponsePageRoutingModule {}
