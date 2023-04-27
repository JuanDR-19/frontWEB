import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {LoginService} from "../login.service";
import {HttpClientModule} from "@angular/common/http";

class MockLoginService extends LoginService{
  override getToken(): string {
    return 'BearerABC1234';
  }
}
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(
      LoginComponent,
      {set:{providers:[{provide:LoginService, useClass: MockLoginService}]}}
    );

    await TestBed.configureTestingModule(
      {
        declarations: [LoginComponent],
        imports:[ReactiveFormsModule,RouterTestingModule,HttpClientModule]
      })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
