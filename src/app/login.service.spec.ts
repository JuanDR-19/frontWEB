import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import {HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

describe('LoginService', () => {
  let service: LoginService;
  let token='BearerABC1234';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]}).compileComponents();

    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('El token puede ser obtenido de las cookies',()=>{
    service.setToken(token);
    expect(service.getToken()).toBe(token);
  });
});
