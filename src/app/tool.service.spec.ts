import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ToolService, Tool } from './tool.service';

describe('ToolService', () => {
  let service: ToolService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ToolService]
    });
    service = TestBed.inject(ToolService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe de mandar una solicitud para obtener las tools', () => {
    const mockTools: Tool[] = [
      {
        name: 'Tool 1',
        img: 'tool1.jpg',
        description: 'Description 1',
        price: 10.99,
        id: 1
      },
      {
        name: 'Tool 2',
        img: 'tool2.jpg',
        description: 'Description 2',
        price: 19.99,
        id:2
      }
    ];

    service.getTools().subscribe(tools => {
      expect(tools).toEqual(mockTools);
    });

    const req = httpMock.expectOne('http://localhost:8081/get_tools');
    expect(req.request.method).toBe('GET');
    req.flush(mockTools);
  });

  it('Debe de realizar una solicitud get', () => {
    const brandName = 'Brand';

    const mockTools: Tool[] = [
      {
        name: 'Tool 1',
        img: 'tool1.jpg',
        description: 'Description 1',
        price: 10.99,
        id: 1
      },
      {
        name: 'Tool 2',
        img: 'tool2.jpg',
        description: 'Description 2',
        price: 19.99,
        id:2
      }
    ];

    service.searchBrand(brandName).subscribe(tools => {
      expect(tools).toEqual(mockTools);
    });

    const req = httpMock.expectOne(`http://localhost:8082/get_tool_brand/${brandName}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTools);
  });

  it('Debe generar una solicitud get(para buscar por nombre)', () => {
    const toolName = 'Tool 1';

    const mockTools: Tool[] = [
      {
        name: 'Tool 1',
        img: 'tool1.jpg',
        description: 'Description 1',
        price: 10.99,
        id:1
      },
      {
        name: 'Tool 3',
        img: 'tool3.jpg',
        description: 'Description 3',
        price: 15.99,
        id:2
      }
    ];

    service.searchName(toolName).subscribe(tools => {
      expect(tools).toEqual(mockTools);
    });

    const req = httpMock.expectOne(`http://localhost:8082/get_tool_name/${toolName}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTools);
  });
});
