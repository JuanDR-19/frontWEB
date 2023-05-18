import { Component } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "../login.service";
import { CookieService  } from "ngx-cookie-service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css']
})

/**

 @description Componente que muestra la pagina de inicio de sesion
 @class LoginComponent
 @constructor
 @param {FormBuilder} formbuilder - Clase de formularios proporcionada por angular
 @param {Router} router - Clase de angular para el manejo de rutas dentro de la aplicacion
 @param {LoginService} loginService - Servicio encargado de hacer las peticiones al microservicio de autorizacion
 */
export class LoginComponent {

  /**
   * variable para controlar el estado de inicio de sesion
   */
  loggedIn = false;

  /**
   * variable que almacena el nombre de usuario
   */
  userName = '';

  /**
   * variable para controlar si el inicio de sesión falla
   */
  failed = false;

  /**
   * formulario de inicio de sesion construido con FormBuilder
   * @type {FormBuilder}
   */
  checkOutForm = this.formbuilder.group({
    login:'',
    password:''
  })

  authenticated = 0;

  constructor(private formbuilder: FormBuilder, private router: Router, private loginService: LoginService,private cookies:CookieService) {}

  ngOnInit(){
    if(this.cookies.get('token')!=""){
      this.authenticated=1;
      this.userName=this.cookies.get('user');
    }
  }
  /**
   * @description Envía una solicitud de inicio de sesión al servidor utilizando los valores
   * del formulario de inicio de sesión. Si el inicio de sesión es exitoso, se
   * guarda el token devuelto por el servidor y se establece el estado de inicio
   * de sesión en verdadero. Si el inicio de sesión falla, se muestra una alerta
   * con el mensaje "Usuario o contraseña incorrecta" y el estado de inicio de
   * sesión no se establece en verdadero.
   */
  onsubmit(): void {
    // Obtiene los valores del formulario de inicio de sesión
    let userParam: string;
    let passParam: string;
    userParam= ''+ this.checkOutForm.value.login;
    passParam=''+this.checkOutForm.value.password;

    // Envía una solicitud de inicio de sesión al servidor
    this.loginService.login(userParam, passParam).subscribe(
      (data) :void => {
        // Si el inicio de sesión es exitoso, guarda el token devuelto por el servidor
        // y establece el estado de inicio de sesión en verdadero
        if (data.token == "error"){
          alert("Usuario o contraseña incorrecta");
          this.failed = true;
        } else {
          this.loginService.setToken(data.token);
          this.loggedIn = true;
          this.userName = userParam;
          this.cookies.set('user',this.userName);
          self.location.reload();
        }
      }
    )

    // Reinicia el formulario de inicio de sesión
    this.checkOutForm.reset();
  }
}
