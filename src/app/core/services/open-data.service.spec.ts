import { TestBed } from '@angular/core/testing';

import { OpenDataService } from './open-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OpenDataService', () => {
  let service: OpenDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(OpenDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
