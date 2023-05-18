import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolControlComponent } from './tool-control.component';

describe('ToolControlComponent', () => {
  let component: ToolControlComponent;
  let fixture: ComponentFixture<ToolControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
