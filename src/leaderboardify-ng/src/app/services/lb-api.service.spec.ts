import { TestBed, inject } from '@angular/core/testing';

import { LbApiService } from './lb-api.service';

describe('LbApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LbApiService]
    });
  });

  it('should be created', inject([LbApiService], (service: LbApiService) => {
    expect(service).toBeTruthy();
  }));
});
