import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tool } from '../tool.service';
import { BehaviorSubject, of } from 'rxjs';
import {ToolService} from "../tool.service";
import { By } from '@angular/platform-browser';
import { NavmenuComponent } from '../navmenu/navmenu.component';
import { ToolControlComponent } from './tool-control.component';
import { HttpClientModule } from '@angular/common/http';
import { PaginationButtonsComponent } from '../pagination-buttons/pagination-buttons.component';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';

/**
   * @description definir los valores de la tool para las pruebas de cambio en la pantalla
   * mostrando el nombre, la imagen, la descripción y el precio correcto.
   * Se sobre escriben los metodos necesarios para realizar las pruebas
   */
class MockToolService extends ToolService {
  public static mockTools: Tool[] = [
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
    },
  ];

  override tools$ = new BehaviorSubject<Tool[]>(MockToolService.mockTools);
  /**
   * @description override del metodo getTools del servicio, de manera que funcione con la clase 
   * mock creada
   * @returns observable de tipo Tool pero usando el mocktoolservice
   */
  override getTools() {
    return of(MockToolService.mockTools);
  }
  /**
   * @description override del metodo searchBrand del servicio, de manera que funcione con la clase 
   * mock creada
   * @returns observable de tipo Tool pero usando el mocktoolservice
   */
  override searchBrand(name: string) {
    return of(MockToolService.mockTools);
  }
  /**
   * @description override del metodo searchName del servicio, de manera que funcione con la clase 
   * mock creada
   * @returns observable de tipo Tool pero usando el mocktoolservice
   */
  override searchName(brand_name: string) {
    return of(MockToolService.mockTools);
  }
}

describe('ToolControlComponent', () => {
  let component: ToolControlComponent;
  let fixture: ComponentFixture<ToolControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolControlComponent, NavmenuComponent, PaginationButtonsComponent],
      imports: [ HttpClientModule, FormsModule, ReactiveFormsModule]      
      

    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  /**
   * @description Comprueba que al realizar las actualizaciones de las cards de herramientas, los valores
   * mostrados sean iguales a los valores generados en el mockservice para el nombre
   */
  it('Deberia de mostrar los nombres de las herramientas creadas en el mock',() =>{
    fixture.detectChanges();
    const toolNames = fixture.debugElement.queryAll(By.css('.card-title')).map(el => el.nativeElement.textContent.trim());
    const expectedNames = MockToolService.mockTools.map(tool => tool.name);
    expect(toolNames).toEqual(expectedNames);
  })
  /**
   * @description Comprueba que al realizar las actualizaciones de las cards de herramientas, los valores
   * mostrados sean iguales a los valores generados en el mockservice para la descripcion
   */
  it('Deberia de mostrar las descripciones de las herramientas creadas en el mock',() =>{
    fixture.detectChanges();
    const toolDescription = fixture.debugElement.queryAll(By.css('#tool-description')).map(el => el.nativeElement.textContent.trim());
    const expectedDescriptions = MockToolService.mockTools.map(tool => tool.description);
    expect(toolDescription).toEqual(expectedDescriptions);
  })
  /**
   * @description Comprueba que al realizar las actualizaciones de las cards de herramientas, los valores
   * mostrados sean iguales a los valores generados en el mockservice para el precio
   */
  it('Deberia de mostrar los precios de las herramientas creadas en el mock',() =>{
    fixture.detectChanges();
    const toolPrice = fixture.debugElement.queryAll(By.css('#tool-price')).map(el => el.nativeElement.textContent.trim());
    const expectedPrices = MockToolService.mockTools.map(tool => tool.price);
    expect(toolPrice).toEqual(expectedPrices);
  })
  /**
   * @description Comprueba que al realizar las actualizaciones de las cards de herramientas, los valores
   * mostrados sean iguales a los valores generados en el mockservice para la imagen
   */
  it('Deberia de mostrar las imagenes de las herramientas creadas en el mock',() =>{
    fixture.detectChanges();
    const toolImg = fixture.debugElement.queryAll(By.css('#tool-image')).map(el => el.nativeElement.textContent.trim());
    const expectedImages = MockToolService.mockTools.map(tool => tool.img);
    expect(toolImg).toEqual(expectedImages);
  })
});
