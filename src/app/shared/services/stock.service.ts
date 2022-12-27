import { Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { IStock } from '../model/stock';
import { FinnhubApiService } from './finnhub-api.service';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private readonly SYMBOLS_KEY = 'stockSymbols';
  private readonly SEPARATOR = ',';
  stockSymbols: string[];

  constructor(private finnhubApi: FinnhubApiService) {
    const storageSymbols = localStorage.getItem(this.SYMBOLS_KEY);

    if (storageSymbols) {
      this.stockSymbols = storageSymbols.split(',');
    } else {
      this.stockSymbols = [];
    }
  }

  addStock(stockSymbol: string): void {
    this.stockSymbols.push(stockSymbol);
    this.updateStocks();
  }

  removeStock(stockSymbol: string): void {
    this.stockSymbols = this.stockSymbols.filter(
      (stock) => stock !== stockSymbol
    );

    this.updateStocks();
  }

  private updateStocks(): void {
    localStorage.setItem(
      this.SYMBOLS_KEY,
      this.stockSymbols.join(this.SEPARATOR)
    );
  }

  getStockDetails(symbol: string): Observable<IStock> {
    const search$ = this.finnhubApi.search(symbol).pipe(
      map((search) => {
        const result = search.result.find((result) => result.symbol === symbol);
        if (!result) {
          throw new Error('');
        }

        return result;
      })
    );
    const quote$ = this.finnhubApi.quote(symbol);

    return combineLatest([search$, quote$]).pipe(
      map(([data, quote]) => {
        return {
          symbol: data.symbol,
          name: data.description,
          price: quote.c,
          changeToday: quote.dp,
          high: quote.h,
          opening: quote.o,
        } as IStock;
      })
    );
  }
}
