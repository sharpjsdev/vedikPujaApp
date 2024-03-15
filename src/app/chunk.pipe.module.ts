import { NgModule } from '@angular/core';
import { ChunkPipe } from './chunk.pipe';

@NgModule({
  declarations: [ChunkPipe],
  exports: [ChunkPipe],
})
export class ChunkPipeModule {}
