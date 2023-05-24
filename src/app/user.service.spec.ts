import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserService, User } from './user.service';
import { CookieService } from 'ngx-cookie-service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CookieService', ['get']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: CookieService, useValue: spy }
      ]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    cookieServiceSpy = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe mandar una solicitud GET', () => {
    const mockUsers: User[] = [
      {
        user_id: 1,
        name_user: 'John',
        city_id: 1,
        last_name_user: 'Doe',
        username: 'johndoe',
        password: 'password',
        token: 'token',
        birthdate_user: '2000-01-01'
      },
      {
        user_id: 2,
        name_user: 'Jane',
        city_id: 2,
        last_name_user: 'Doe',
        username: 'janedoe',
        password: 'password',
        token: 'token',
        birthdate_user: '2000-01-02'
      }
    ];

    cookieServiceSpy.get.and.returnValue('token');

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('http://localhost:8083/get_users');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('token');
    req.flush(mockUsers);
  });

  it('debe mandar una solicitud DELETE', () => {
    const userId = 1;
    service.deleteUser(userId).subscribe(response => {
      expect(response.status).toBe(200);
      expect(response.data).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:8083/deleteUser/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({ status: 200, data: {} });
  });
});
