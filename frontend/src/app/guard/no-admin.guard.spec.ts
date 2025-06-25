import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { noAdminGuard } from './no-admin.guard';

describe('noAdminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => noAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
