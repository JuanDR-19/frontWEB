import { TestBed } from '@angular/core/testing';
import { ToolService } from './tool.service';
import {HttpClientModule} from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

describe('ToolService', () => {
  let service: ToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]}).compileComponents();

    service = TestBed.inject(ToolService);

  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
