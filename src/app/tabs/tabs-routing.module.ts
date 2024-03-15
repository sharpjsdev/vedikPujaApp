import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../tab4/tab4.module').then(m => m.Tab4PageModule)
      },
      {
        path: 'tab5',
        loadChildren: () => import('../tab5/tab5.module').then(m => m.Tab5PageModule)
      },
      {
        path: 'about-puja/:id',
        loadChildren: () => import('../about-puja/about-puja.module').then( m => m.AboutPujaPageModule)
      },
      {
        path: 'booking/:id',
        loadChildren: () => import('../booking/booking.module').then( m => m.BookingPageModule)
      },
      {
        path: 'about-temple/:id',
        loadChildren: () => import('../about-temple/about-temple.module').then( m => m.AboutTemplePageModule)
      },
      {
        path: 'address',
        loadChildren: () => import('../address/address.module').then( m => m.AddressPageModule)
      },
      {
        path: 'paynow/:id',
        loadChildren: () => import('../paynow/paynow.module').then( m => m.PaynowPageModule)
      },
      {
        path: 'pay-response',
        loadChildren: () => import('../pay-response/pay-response.module').then( m => m.PayResponsePageModule)
      },
      {
        path: 'booking-detail/:id',
        loadChildren: () => import('../booking-detail/booking-detail.module').then( m => m.BookingDetailPageModule)
      },
      {
        path: 'about-us',
        loadChildren: () => import('../about-us/about-us.module').then( m => m.AboutUsPageModule)
      },
      {
        path: 'contact-us',
        loadChildren: () => import('../contact-us/contact-us.module').then( m => m.ContactUsPageModule)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
