import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { autenticadoGuardGuard } from './autenticado-guard.guard';

describe('autenticadoGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => autenticadoGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
