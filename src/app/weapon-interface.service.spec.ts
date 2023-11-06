import { TestBed } from '@angular/core/testing';

import { WeaponInterfaceService } from './weapon-interface.service';

describe('WeaponInterfaceService', () => {
  let service: WeaponInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeaponInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
