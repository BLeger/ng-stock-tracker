import { Component } from '@angular/core';
import { StockStorageService } from '../../shared/services/stock-storage.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss'],
})
export class StockListComponent {
  constructor(public stockStorageService: StockStorageService) {}
}
