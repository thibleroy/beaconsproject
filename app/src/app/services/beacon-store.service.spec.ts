import { TestBed } from '@angular/core/testing';

import { BeaconStoreService } from './beacon-store.service';

describe('BeaconStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeaconStoreService = TestBed.get(BeaconStoreService);
    expect(service).toBeTruthy();
  });
});
