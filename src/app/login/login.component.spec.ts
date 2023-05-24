import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavmenuComponent } from '../navmenu/navmenu.component';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from '../login.service';
import { HttpClientModule } from '@angular/common/http';
import { NgControl } from '@angular/forms';

class MockLoginService extends LoginService {
  override getToken(): string {
    return 'BearerABC1234';
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, NavmenuComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule, FormsModule],
      providers: [
        { provide: LoginService, useClass: MockLoginService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * @description Metodo de pruebas para verificar que se cree el componente correctamente
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * @description Verificación de creación de booleano de autenticación en el valor negativo: 0
   */
  it('Debe inicializar el booleano de autenticación en 0', () => {
    expect(component.authenticated).toEqual(0);
  });

  /**
   * @description verificación de mensaje de error al ingresar un ususario y/o una contraseña que estén incorrectos.
   * El servicio no debe especificar cuál de los dos datos ingresados es incorrecto, solo debe mostrar el mensaje de error.
   */
  it('Cuando el componente falla al autenticar, debería mostrar un mensaje de error', () => {
    component.failed = true;
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage.textContent).toContain('Usuario y/o contraseña incorrectos');
  });

  /**
   * @description Mostrar el nombre de usuario al momento de iniciar sesión. Se toma el valor del booleano de
   * autenticación y se establece en verdadero, poniendo el nombre de usuario con un valor predeterminado
   * y verificando que se muestre en la pantalla.
   */
  it('Debe hacer display del nombre de usuario cuando se autentica', () => {
    component.authenticated = 1;
    component.userName = 'John';
    fixture.detectChanges();
    const greeting = fixture.nativeElement.querySelector('.greeting');
    expect(greeting.textContent).toContain('Hola John!');
  });

  /**
   * @description Debe realizar la acción onsubmit del componente.
   */
  it('Debe realizar la acción submit cuando se haga click en el botón', async () => {
    spyOn(component, 'onsubmit');
    fixture.detectChanges();
    await fixture.whenStable(); // Esperar a que se completen las tareas asíncronas
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();
    expect(component.onsubmit).toHaveBeenCalled();
  });
  
});
