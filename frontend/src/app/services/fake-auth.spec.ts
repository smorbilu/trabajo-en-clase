import { TestBed } from '@angular/core/testing';

import { FakeAuthService } from './fake-auth';

describe('FakeAuth', () => {
  let service: FakeAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
