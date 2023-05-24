import { ComponentFixture, TestBed , waitForAsync} from '@angular/core/testing';

import { MainMenuComponent } from './main-menu.component';
import {LoginComponent} from "../login/login.component";
import {ToolService} from "../tool.service";
import {HttpClientModule} from "@angular/common/http";
import {PaginationButtonsComponent} from "../pagination-buttons/pagination-buttons.component";
import { Tool } from '../tool.service';
import { BehaviorSubject, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NavmenuComponent } from '../navmenu/navmenu.component';

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
    },
    {
      name: 'Tool 2',
      img: 'path/to/image2.jpg',
      description: 'Description 2',
      price: 20.99,
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

describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;
  
  
  beforeEach(async () => {

    TestBed.overrideComponent(
      LoginComponent,
      {set:{providers:[{provide:ToolService, useClass: MockToolService}]}}
    );

    await TestBed.configureTestingModule({
      declarations: [ MainMenuComponent ,PaginationButtonsComponent,NavmenuComponent],
      imports:[HttpClientModule,FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainMenuComponent);
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
  it('Deberia de mostrar los nombres de las herramientas creadas en el mock', waitForAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const toolNames = fixture.debugElement.queryAll(By.css('.card-title')).map(el => el.nativeElement.innerText.trim());
      const expectedNames = MockToolService.mockTools.map(tool => tool.name);
      expect(toolNames).toEqual(expectedNames);
    });
  }));
  
  
  /**
   * @description Comprueba que al realizar las actualizaciones de las cards de herramientas, los valores
   * mostrados sean iguales a los valores generados en el mockservice para la descripcion
   */
  it('Deberia de mostrar las descripciones de las herramientas creadas en el mock', waitForAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const toolDescriptions = fixture.debugElement.queryAll(By.css('[id="tool-description"]')).map(el => el.nativeElement.innerText.trim());
      const expectedDescriptions = MockToolService.mockTools.map(tool => tool.description);
      expect(toolDescriptions).toEqual(expectedDescriptions);
    });
  }));
  
  /**
   * @description Comprueba que al realizar las actualizaciones de las cards de herramientas, los valores
   * mostrados sean iguales a los valores generados en el mockservice para el precio
   */
  it('Deberia de mostrar los precios de las herramientas creadas en el mock', waitForAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const toolPrices = fixture.debugElement.queryAll(By.css('[id="tool-price"]')).map(el => el.nativeElement.innerText.trim());
      const expectedPrices = MockToolService.mockTools.map(tool => tool.price);
      expect(toolPrices).toEqual(expectedPrices);
    });
  }));
  
  
  /**
   * @description Comprueba que al realizar las actualizaciones de las cards de herramientas, los valores
   * mostrados sean iguales a los valores generados en el mockservice para la imagen
   */
  it('Deberia de mostrar las imagenes de las herramientas creadas en el mock', () => {
    fixture.detectChanges();
    const toolImages = fixture.debugElement.queryAll(By.css('[id="tool-image"]')).map(el => el.nativeElement.getAttribute('src'));
    const expectedImages = MockToolService.mockTools.map(tool => tool.img);
    expect(toolImages).toEqual(expectedImages);
  });
  
});
