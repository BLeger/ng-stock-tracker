import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StockService } from '../../../shared/services/stock.service';

@Component({
  selector: 'app-stock-list-search',
  templateUrl: './stock-list-search.component.html',
  styleUrls: ['./stock-list-search.component.scss'],
})
export class StockListSearchComponent {
  addStockForm = this.fb.group({
    stockSymbol: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private stockService: StockService) {}

  addStock(): void {
    if (this.addStockForm.invalid) {
      return;
    }

    this.stockService.addStock(
      this.addStockForm.get('stockSymbol')!.value ?? ''
    ); // TODO mieux gérer
    this.addStockForm.reset();
  }
}
