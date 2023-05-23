import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavmenuComponent } from './navmenu.component';

describe('NavmenuComponent', () => {
  let component: NavmenuComponent;
  let fixture: ComponentFixture<NavmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavmenuComponent],
      imports: [RouterTestingModule, FormsModule, HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NavmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * @description Prueba de enlace de botones de la barra de navegación de la aplicación
   * prueba para el metodo de inicio
   */
  it('debe de navegar correctamente en los botones de enlace', () => {
    component.navigateTo('/');
    component.getCurrentRoute().then((route) => {
      expect(route).toEqual('/');
    });
  });

  /**
   * @description Prueba de enlace de botones de la barra de navegación de la aplicación
   * prueba para el metodo de login
   */
  it('debe de navegar correctamente en los botones de enlace', () => {
    component.navigateTo('login');
    component.getCurrentRoute().then((route) => {
      expect(route).toEqual('login');
    });
  });

  it('debe de cambiar la palabra en el campo de busqueda y tomarla en un valor de variable que la refleje', () => {
    const searchInput = fixture.debugElement.query(By.css('input[name="word"]')).nativeElement;
    searchInput.value = 'tool';
    searchInput.dispatchEvent(new Event('input'));
    expect(searchInput.value).toEqual('tool');
  });
});