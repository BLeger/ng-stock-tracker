import { CommonModule, PercentPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrendArrowComponent } from './components/trend-arrow/trend-arrow.component';
import { UpDownColorDirective } from './directives/up-down-color.directive';
import { CustomPercentPipe } from './pipes/custom-percent.pipe';
import { MonthPipe } from './pipes/month.pipe';

@NgModule({
  declarations: [
    CustomPercentPipe,
    MonthPipe,
    TrendArrowComponent,
    UpDownColorDirective,
  ],
  imports: [CommonModule],
  exports: [
    CustomPercentPipe,
    MonthPipe,
    TrendArrowComponent,
    UpDownColorDirective,
  ],
  providers: [PercentPipe],
})
export class SharedModule {}
