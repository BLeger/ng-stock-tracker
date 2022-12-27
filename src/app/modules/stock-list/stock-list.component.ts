import { Component } from '@angular/core';
import { StockService } from '../../shared/services/stock.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss'],
})
export class StockListComponent {
  constructor(public stockService: StockService) {}
}
