import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StockStorageService {
  private readonly SYMBOLS_KEY = 'stockSymbols';
  private readonly SEPARATOR = ',';
  stockSymbols: string[];

  constructor() {
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
}
