import { Component, Input } from '@angular/core';
import { IStock } from '../../../shared/model/stock';
import { StockService } from '../../../shared/services/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent {
  @Input() symbol!: string;
  stock: IStock = {
    name: 'Tesla',
    symbol: 'TSLA',
    price: 200,
    changeToday: 10,
    opening: 190,
    high: 215,
  };

  constructor(private stockService: StockService) {}

  remove(): void {
    this.stockService.removeStock(this.symbol);
  }
}
