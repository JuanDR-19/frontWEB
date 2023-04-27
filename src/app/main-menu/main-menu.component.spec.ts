import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuComponent } from './main-menu.component';
import {LoginService} from "../login.service";
import {LoginComponent} from "../login/login.component";
import {ToolService} from "../tool.service";
import {HttpClientModule} from "@angular/common/http";
import {PaginationButtonsComponent} from "../pagination-buttons/pagination-buttons.component";


class MockToolService extends ToolService{

}

describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;

  beforeEach(async () => {

    TestBed.overrideComponent(
      LoginComponent,
      {set:{providers:[{provide:ToolService, useClass: MockToolService}]}}
    );

    await TestBed.configureTestingModule({
      declarations: [ MainMenuComponent ,PaginationButtonsComponent],
      imports:[HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
