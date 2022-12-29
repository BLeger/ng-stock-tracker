import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StockStorageService } from '../../../shared/services/stock-storage.service';

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

  constructor(
    private fb: FormBuilder,
    private stockStorageService: StockStorageService
  ) {}

  addStock(): void {
    this.submitted = true;
    if (this.addStockForm.invalid) {
      return;
    }

    this.stockStorageService.addStock(
      this.addStockForm.get('stockSymbol')!.value!
    );
    this.addStockForm.reset();
    this.submitted = false;
  }
}
