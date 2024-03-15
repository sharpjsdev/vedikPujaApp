import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/services/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/splash',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'about-puja/:id',
    loadChildren: () => import('./about-puja/about-puja.module').then( m => m.AboutPujaPageModule)
  },
  {
    path: 'booking/:id',
    loadChildren: () => import('./booking/booking.module').then( m => m.BookingPageModule)
  },
  {
    path: 'address',
    loadChildren: () => import('./address/address.module').then( m => m.AddressPageModule),
  },
  {
    path: 'verify-otp/:id',
    loadChildren: () => import('./verify-otp/verify-otp.module').then( m => m.VerifyOtpPageModule)
  },
  {
    path: 'about-temple/:id',
    loadChildren: () => import('./about-temple/about-temple.module').then( m => m.AboutTemplePageModule)
  },
  {
    path: 'paynow/:id',
    loadChildren: () => import('./paynow/paynow.module').then( m => m.PaynowPageModule)
  },
  {
    path: 'pay-response',
    loadChildren: () => import('./pay-response/pay-response.module').then( m => m.PayResponsePageModule)
  },
  {
    path: 'puja-live/:id',
    loadChildren: () => import('./puja-live/puja-live.module').then( m => m.PujaLivePageModule)
  },
  {
    path: 'booking-detail/:id',
    loadChildren: () => import('./booking-detail/booking-detail.module').then( m => m.BookingDetailPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'policy',
    loadChildren: () => import('./policy/policy.module').then( m => m.PolicyPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
