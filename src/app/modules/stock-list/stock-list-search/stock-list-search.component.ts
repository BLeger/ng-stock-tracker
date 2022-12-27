import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StockService } from '../../../shared/services/stock.service';

@Component({
  selector: 'app-stock-list-search',
  templateUrl: './stock-list-search.component.html',
  styleUrls: ['./stock-list-search.component.scss'],
})
export class StockListSearchComponent {
  submitted = false;
  addStockForm = this.fb.group({
    stockSymbol: [
      '',
      [
        Validators.required,
        Validators.maxLength(5),
        Validators.pattern('[a-zA-Z]+'),
      ],
    ],
  });

  constructor(private fb: FormBuilder, private stockService: StockService) {}

  addStock(): void {
    this.submitted = true;
    if (this.addStockForm.invalid) {
      return;
    }

    this.stockService.addStock(
      this.addStockForm.get('stockSymbol')!.value ?? ''
    ); // TODO mieux gérer
    this.addStockForm.reset();
    this.submitted = false;
  }
}
