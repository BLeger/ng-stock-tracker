import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'month',
})
export class MonthPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(value: number): string {
    const date = new Date();
    date.setMonth(value - 1);
    return this.datePipe.transform(date, 'MMMM') ?? value.toString();
  }
}
