import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { NavmenuComponent } from './navmenu.component';
import { Router } from '@angular/router';

describe('NavmenuComponent', () => {
  let component: NavmenuComponent;
  let fixture: ComponentFixture<NavmenuComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavmenuComponent],
      imports: [RouterTestingModule, FormsModule, HttpClientModule, AppRoutingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NavmenuComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * @description Prueba de enlace de botones de la barra de navegación de la aplicación
   * prueba para el método de inicio
   */
  it('debe de navegar correctamente en los botones de enlace (inicio)', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    component.navigateTo('/');
    expect(navigateSpy).toHaveBeenCalledWith('/');
  });

  /**
   * @description Prueba de enlace de botones de la barra de navegación de la aplicación
   * prueba para el método de login
   */
  it('debe de navegar correctamente en los botones de enlace (login)', async () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    component.navigateTo('login');
    expect(navigateSpy).toHaveBeenCalledWith('login');
  });

  it('debe de cambiar la palabra en el campo de búsqueda y tomarla en un valor de variable que la refleje', () => {
    const searchInput = fixture.debugElement.query(By.css('input[name="word"]')).nativeElement;
    searchInput.value = 'tool';
    searchInput.dispatchEvent(new Event('input'));
    expect(searchInput.value).toEqual('tool');
  });
});
