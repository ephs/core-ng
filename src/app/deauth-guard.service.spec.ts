import { TestBed, inject } from '@angular/core/testing';

import { DeauthGuardService } from './deauth-guard.service';

describe('DeauthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeauthGuardService]
    });
  });

  it('should be created', inject([DeauthGuardService], (service: DeauthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
