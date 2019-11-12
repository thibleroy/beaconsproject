import { TestBed } from '@angular/core/testing';

import { BeaconScannerService } from './beacon-scanner.service';

describe('BeaconScannerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeaconScannerService = TestBed.get(BeaconScannerService);
    expect(service).toBeTruthy();
  });
});
