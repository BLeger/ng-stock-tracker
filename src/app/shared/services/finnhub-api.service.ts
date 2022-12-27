import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IFinnHubQuote } from '../model/finnhub-quote';
import { IFinnHubSearch, IFinnHubSearchResult } from '../model/finnhub-search';
import { IFinnHubSentiment } from '../model/finnhub-sentiment';

@Injectable({
  providedIn: 'root',
})
export class FinnhubApiService {
  private readonly FINNHUB_DATE_FORMAT = 'yyyy-MM-dd';

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  private createToken(): HttpParams {
    return new HttpParams().set('token', environment.FINNHUB_KEY);
  }

  search(symbol: string): Observable<IFinnHubSearch> {
    return this.http.get<IFinnHubSearch>(environment.FINNHUB_URL + 'search', {
      params: this.createToken().set('q', symbol),
    });
  }

  find(symbol: string): Observable<IFinnHubSearchResult> {
    return this.search(symbol).pipe(
      map((search) => {
        const result = search.result.find((result) => result.symbol === symbol);
        if (!result) {
          throw new Error('Unknown stock');
        }

        return result;
      })
    );
  }

  quote(symbol: string): Observable<IFinnHubQuote> {
    return this.http.get<IFinnHubQuote>(environment.FINNHUB_URL + 'quote', {
      params: this.createToken().set('symbol', symbol),
    });
  }

  sentiment(
    symbol: string,
    from: Date,
    to: Date
  ): Observable<IFinnHubSentiment> {
    return this.http.get<IFinnHubSentiment>(
      environment.FINNHUB_URL + '/stock/insider-sentiment',
      {
        params: this.createToken()
          .set('symbol', symbol)
          .set('from', this.datePipe.transform(from, this.FINNHUB_DATE_FORMAT)!)
          .set('to', this.datePipe.transform(to, this.FINNHUB_DATE_FORMAT)!),
      }
    );
  }
}
