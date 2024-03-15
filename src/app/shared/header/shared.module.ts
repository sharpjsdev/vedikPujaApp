import { NgModule } from '@angular/core';
import { CountdownPipe } from 'src/app/pipes/countdown.pipe';

@NgModule({
  declarations: [CountdownPipe],
  exports: [CountdownPipe],
})
export class SharedModule {}
