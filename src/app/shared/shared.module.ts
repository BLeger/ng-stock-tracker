import { CommonModule, PercentPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomPercentPipe } from './pipes/custom-percent.pipe';

@NgModule({
  declarations: [CustomPercentPipe],
  imports: [CommonModule],
  exports: [CustomPercentPipe],
  providers: [PercentPipe],
})
export class SharedModule {}
