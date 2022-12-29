import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { StockListItemComponent } from './stock-list-item/stock-list-item.component';
import { StockListSearchComponent } from './stock-list-search/stock-list-search.component';
import { StockListComponent } from './stock-list.component';

@NgModule({
  declarations: [
    StockListComponent,
    StockListSearchComponent,
    StockListItemComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SharedModule],
})
export class StockListModule {}
