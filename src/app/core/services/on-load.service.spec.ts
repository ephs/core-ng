import { TestBed, inject } from '@angular/core/testing';

import { OnLoadService } from './on-load.service';

describe('OnLoadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnLoadService]
    });
  });

  it('should be created', inject([OnLoadService], (service: OnLoadService) => {
    expect(service).toBeTruthy();
  }));
});
