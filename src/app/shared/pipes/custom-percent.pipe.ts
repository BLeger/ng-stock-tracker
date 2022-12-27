import { PercentPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPercent',
})
export class CustomPercentPipe implements PipeTransform {
  constructor(private percentPipe: PercentPipe) {}

  transform(value: number): string {
    return (value >= 0 ? '+' : '') + this.percentPipe.transform(value, '1.0-2');
  }
}
