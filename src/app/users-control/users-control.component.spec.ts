import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UsersControlComponent } from './users-control.component';
import { NavmenuComponent } from '../navmenu/navmenu.component';
import { PaginationButtonsComponent } from '../pagination-buttons/pagination-buttons.component';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';

describe('UsersControlComponent', () => {
  let component: UsersControlComponent;
  let fixture: ComponentFixture<UsersControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersControlComponent , NavmenuComponent, PaginationButtonsComponent],
      imports: [ HttpClientModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
