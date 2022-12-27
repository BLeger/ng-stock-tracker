import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trend-arrow',
  templateUrl: './trend-arrow.component.html',
  styleUrls: ['./trend-arrow.component.scss'],
})
export class TrendArrowComponent {
  @Input() value = 0;
}
