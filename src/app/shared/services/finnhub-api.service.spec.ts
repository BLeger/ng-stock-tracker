import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FinnhubApiService } from './finnhub-api.service';

describe('FinnhubApiService', () => {
  let service: FinnhubApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DatePipe],
    });
    service = TestBed.inject(FinnhubApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
