import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditToolComponent } from './edit-tool.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToolService } from '../tool.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('EditToolComponent', () => {
  let component: EditToolComponent;
  let fixture: ComponentFixture<EditToolComponent>;
  let formBuilder: FormBuilder;
  let router: Router;
  let toolService: ToolService;
  let cookieService: jasmine.SpyObj<CookieService>;

  beforeEach(async () => {
    const cookieServiceSpy = jasmine.createSpyObj('CookieService', ['get']);

    await TestBed.configureTestingModule({
      declarations: [EditToolComponent],
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
        { provide: CookieService, useValue: cookieServiceSpy }
      ]
    }).compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    router = TestBed.inject(Router);
    toolService = TestBed.inject(ToolService);
    cookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditToolComponent);
    component = fixture.componentInstance;

    component.tool = {
      id: 1,
      name: 'Tool 1',
      img: 'image.jpg',
      description: 'Tool description',
      price: 10,
    };

    component.EditTForm.setValue({
      name: 'New Tool',
      img: 'new-image.jpg',
      description: 'New tool description',
      price: 20,
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
