import { NgModule } from '@angular/core';
import { CountdownPipe } from './countdown.pipe';


@NgModule({
  declarations: [CountdownPipe],
  exports: [CountdownPipe],
})
export class CountdownPipeModule {}