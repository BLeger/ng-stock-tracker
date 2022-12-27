import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockListSearchComponent } from './stock-list-search.component';

describe('StockListSearchComponent', () => {
  let component: StockListSearchComponent;
  let fixture: ComponentFixture<StockListSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockListSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
