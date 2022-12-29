import { Component, Input, OnInit } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { IStock } from '../../../shared/model/stock';
import { StockStorageService } from '../../../shared/services/stock-storage.service';
import { StockService } from '../../../shared/services/stock.service';

@Component({
  selector: 'app-stock-list-item',
  templateUrl: './stock-list-item.component.html',
  styleUrls: ['./stock-list-item.component.scss'],
})
export class StockListItemComponent implements OnInit {
  @Input() symbol!: string;

  stock$?: Observable<IStock>;
  error = false;

  constructor(
    private stockStorageService: StockStorageService,
    private stockService: StockService
  ) {}

  ngOnInit(): void {
    this.stock$ = this.stockService.getStockDetails(this.symbol).pipe(
      catchError(() => {
        this.error = true;
        return EMPTY;
      })
    );
  }

  remove(): void {
    this.stockStorageService.removeStock(this.symbol);
  }
}
