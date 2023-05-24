import { Component } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../login.service';
import { RegisterService } from '../register.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
/**

 @description Componente que muestra la pagina de registro de nuevos usuarios
 @class RegisterComponent
 @constructor
 @param {FormBuilder} formbuilder - Clase de formularios proporcionada por angular
 @param {Router} router - Clase de angular para el manejo de rutas dentro de la aplicacion
 @param {LoginService} loginService - Servicio encargado de hacer las peticiones al microservicio de autorizacion
 */
export class RegisterComponent {

  /**
   * @description variable para controlar el estado de inicio de sesion
   */
  loggedIn = false;

  /**
   * @description variable que almacena el nombre de usuario
   */
  userName = '';

  /**
   * @description variable para controlar si el inicio de sesión falla
   */
  failed = false;

  /**
   * @description formulario de registro construido con FormBuilder
   * @type {FormBuilder}
   */
  checkOutForm = this.formbuilder.group({
    login: '',
    password: '',
    name: '',
    lastname: '',
    birthdate: ''
  });
  
  authenticated = 0;

  constructor(private formbuilder: FormBuilder, private router: Router , private registerService: RegisterService,private cookies:CookieService, private loginService: LoginService) {}
  onsubmit(): void {
    // Obtiene los valores del formulario de inicio de sesión
    let userParam: string;
    let passParam: string;
    let nameParam: string;
    let lastnameParam: string;
    let birthdateParam: string;

    userParam= ''+ this.checkOutForm.value.login;
    passParam=''+this.checkOutForm.value.password;
    nameParam=''+this.checkOutForm.value.name;
    lastnameParam=''+this.checkOutForm.value.lastname;
    birthdateParam=''+this.checkOutForm.value.birthdate;


    // Envía una solicitud de inicio de sesión al servidor
    this.registerService.NewUser(nameParam,1,lastnameParam,userParam,passParam,"",birthdateParam).subscribe(
      (data) :void => {
          this.loginService.setToken(data.token);
          this.loggedIn = true;
          this.userName = userParam;
          this.cookies.set('user',this.userName);
          self.location.reload();
      }
    )
    // Reinicia el formulario de inicio de sesión
    this.checkOutForm.reset();
  }
}
