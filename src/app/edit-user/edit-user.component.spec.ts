import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { EditUserComponent } from './edit-user.component';
import { UserService } from '../user.service';
import { HttpClientModule } from '@angular/common/http';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let userService: UserService;
  let cookieService: CookieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUserComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule],
      providers: [UserService, CookieService],
    }).compileComponents();
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    cookieService = TestBed.inject(CookieService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe cargar los datos del usuario en el inicio', () => {
    const userId = '1';
    spyOn(cookieService, 'get').and.returnValue(userId);
    const mockUser = { ...component.user1 };
    spyOn(userService, 'getUsers').and.returnValue(of([mockUser])); // Utiliza "of" para devolver un observable

    component.ngOnInit();

    expect(cookieService.get).toHaveBeenCalledWith('id');
    expect(userService.getUsers).toHaveBeenCalled();
    expect(component.user).toEqual([mockUser]);
    expect(component.user1).toEqual(mockUser);
  });

  
});
