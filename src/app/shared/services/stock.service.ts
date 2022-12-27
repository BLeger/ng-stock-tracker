import { Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { ISentiment } from '../model/sentiment';
import { IStock } from '../model/stock';
import { FinnhubApiService } from './finnhub-api.service';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private readonly SYMBOLS_KEY = 'stockSymbols';
  private readonly SEPARATOR = ',';
  stockSymbols: string[];

  // TODO move localStorage vers un autre service
  constructor(private finnhubApi: FinnhubApiService) {
    const storageSymbols = localStorage.getItem(this.SYMBOLS_KEY);

    if (storageSymbols) {
      this.stockSymbols = storageSymbols.split(',');
    } else {
      this.stockSymbols = [];
    }
  }

  addStock(stockSymbol: string): void {
    if (this.stockSymbols.includes(stockSymbol)) {
      return;
    }

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
    const find$ = this.finnhubApi.find(symbol);
    const quote$ = this.finnhubApi.quote(symbol);

    return combineLatest([find$, quote$]).pipe(
      map(([data, quote]) => {
        return {
          symbol: data.symbol,
          name: data.description,
          price: quote.c,
          changeToday: quote.dp,
          high: quote.h,
          opening: quote.o,
        };
      })
    );
  }

  getStockSentiment(
    symbol: string,
    from: Date,
    to: Date
  ): Observable<ISentiment> {
    const find$ = this.finnhubApi.find(symbol);
    const sentiment$ = this.finnhubApi.sentiment(symbol, from, to);

    return combineLatest([find$, sentiment$]).pipe(
      map(([data, sentiment]) => {
        return {
          symbol: data.symbol,
          name: data.description,
          data: sentiment.data.map((s) => ({
            month: s.month,
            year: s.year,
            change: s.change,
            mspr: s.mspr,
          })),
        };
      })
    );
  }
}
