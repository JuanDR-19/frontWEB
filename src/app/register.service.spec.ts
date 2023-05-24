import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RegisterService, User } from './register.service';

describe('RegisterService', () => {
  let service: RegisterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegisterService]
    });
    service = TestBed.inject(RegisterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe de verificar que se hace una petición POST', () => {
    const newUser: User = {
      name_user: 'John',
      city_id:{
        city_id:1,
        name:'Bogota'
      },
      last_name_user: 'Doe',
      username: 'johndoe',
      password: 'password',
      token: 'token',
      birthdate_user: '2000-01-01'
    };

    service.NewUser(
      newUser.name_user,
      newUser.city_id,
      newUser.last_name_user,
      newUser.username,
      newUser.password,
      newUser.token,
      newUser.birthdate_user
    ).subscribe();

    const req = httpMock.expectOne('http://localhost:8083/NewUser');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);

    req.flush({});
  });
});
