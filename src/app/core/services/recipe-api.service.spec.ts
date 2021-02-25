import { TestBed } from '@angular/core/testing';

import { RecipeApiService } from './recipe-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RecipeApiService', () => {
  let service: RecipeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(RecipeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
