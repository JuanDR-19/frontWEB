import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MainMenuComponent, Tool } from './main-menu.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavmenuComponent } from '../navmenu/navmenu.component';
import { PaginationButtonsComponent } from '../pagination-buttons/pagination-buttons.component';
import { ToolService } from '../tool.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;
  let toolService: ToolService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainMenuComponent,NavmenuComponent, PaginationButtonsComponent],
      imports: [HttpClientModule,FormsModule],
      providers: [ToolService]
    }).compileComponents();

    fixture = TestBed.createComponent(MainMenuComponent);
    component = fixture.componentInstance;
    toolService = TestBed.inject(ToolService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should get tools from the service', waitForAsync(() => {
    const mockTools: Tool[] = [
      {
        name: 'Tool 1',
        img: 'path/to/image1.jpg',
        description: 'Description 1',
        price: 10.99,
        id:1
      },
      {
        name: 'Tool 2',
        img: 'path/to/image2.jpg',
        description: 'Description 2',
        price: 20.99,
        id:2
      }
    ];
    spyOn(toolService, 'getTools').and.returnValue(of(mockTools));
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(toolService.getTools).toHaveBeenCalled();
      expect(component.tools).toEqual(mockTools);
    });
  }));
  
});
