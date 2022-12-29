import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { StockListSearchComponent } from '../stock-list-search/stock-list-search.component';

import { StockListItemComponent } from './stock-list-item.component';

describe('StockListItemComponent', () => {
  let component: StockListItemComponent;
  let fixture: ComponentFixture<StockListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockListItemComponent, StockListSearchComponent],
      imports: [SharedModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [DatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(StockListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
