import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { ISentiment } from '../../shared/model/sentiment';
import { StockService } from '../../shared/services/stock.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.scss'],
})
export class SentimentComponent implements OnInit {
  sentiment$?: Observable<ISentiment>;
  symbol = '';
  error = false;

  constructor(
    private stockService: StockService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const symbol = this.activatedRoute.snapshot.paramMap.get('symbol');

    if (symbol) {
      this.symbol = symbol;

      // Some month seems to be missing from finnhub sentiment API
      // So we take the last 6 month and slice to be sure to have 3 months of data
      const to = new Date();
      const from = new Date();
      from.setMonth(from.getMonth() - 6);

      this.sentiment$ = this.stockService
        .getStockSentiment(this.symbol, from, to)
        .pipe(
          map((sentiment) => ({
            ...sentiment,
            data: sentiment.data.slice(-3),
          })),
          catchError(() => {
            this.error = true;
            return EMPTY;
          })
        );
    } else {
      this.error = true;
    }
  }
}
