import {
  Directive,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appUpDownColor]',
})
export class UpDownColorDirective implements OnChanges {
  @HostBinding('class.data-up') dataUp = false;
  @HostBinding('class.data-down') dataDown = false;

  @Input() appUpDownColor = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const positive = changes['appUpDownColor'].currentValue >= 0;
    this.dataUp = positive;
    this.dataDown = !positive;
  }
}
