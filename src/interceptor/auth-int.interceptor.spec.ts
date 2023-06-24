import { TestBed } from '@angular/core/testing';

import { AuthIntInterceptor } from './auth-int.interceptor';

describe('AuthIntInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthIntInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthIntInterceptor = TestBed.inject(AuthIntInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
