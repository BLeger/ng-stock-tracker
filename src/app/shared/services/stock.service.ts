import { Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { ISentiment } from '../model/sentiment';
import { IStock, IStockName } from '../model/stock';
import { FinnhubApiService } from './finnhub-api.service';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private finnhubApi: FinnhubApiService) {}

  /**
   * Abstraction of FinnHubApi search to find a precise stock
   * @param symbol
   * @returns
   */
  private find(symbol: string): Observable<IStockName> {
    return this.finnhubApi.search(symbol).pipe(
      map((search) => {
        const result = search.result.find((result) => result.symbol === symbol);
        if (!result) {
          throw new Error('Unknown stock');
        }

        return {
          name: result.description,
          symbol: result.symbol,
        };
      })
    );
  }

  getStockDetails(symbol: string): Observable<IStock> {
    const find$ = this.find(symbol);
    const quote$ = this.finnhubApi.quote(symbol);

    return combineLatest([find$, quote$]).pipe(
      map(([data, quote]) => {
        return {
          symbol: data.symbol,
          name: data.name,
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
    const find$ = this.find(symbol);
    const sentiment$ = this.finnhubApi.sentiment(symbol, from, to);

    return combineLatest([find$, sentiment$]).pipe(
      map(([data, sentiment]) => {
        return {
          symbol: data.symbol,
          name: data.name,
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
