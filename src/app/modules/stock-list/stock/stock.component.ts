import { Component, Input, OnInit } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { IStock } from '../../../shared/model/stock';
import { StockService } from '../../../shared/services/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  @Input() symbol!: string;

  stock$?: Observable<IStock | undefined>;
  error = false;

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.stock$ = this.stockService.getStockDetails(this.symbol).pipe(
      catchError(() => {
        this.error = true;
        return EMPTY;
      })
    );
  }

  remove(): void {
    this.stockService.removeStock(this.symbol);
  }
}
