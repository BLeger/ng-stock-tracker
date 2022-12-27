import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IFinnHubQuote } from '../model/finnhub-quote';
import { IFinnHubSearch } from '../model/finnhub-search';

@Injectable({
  providedIn: 'root',
})
export class FinnhubApiService {
  constructor(private http: HttpClient) {}

  private createToken(): HttpParams {
    return new HttpParams().set('token', environment.FINNHUB_KEY);
  }

  search(symbol: string): Observable<IFinnHubSearch> {
    return this.http.get<IFinnHubSearch>(environment.FINNHUB_URL + 'search', {
      params: this.createToken().set('q', symbol),
    });
  }

  quote(symbol: string): Observable<IFinnHubQuote> {
    return this.http.get<IFinnHubQuote>(environment.FINNHUB_URL + 'quote', {
      params: this.createToken().set('symbol', symbol),
    });
  }
}
