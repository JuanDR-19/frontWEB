import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let token='BearerABC1234';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('El token puede ser obtenido de las cookies',()=>{
    service.setToken(token);
    expect(service.getToken).toBe(token);
  });
});
