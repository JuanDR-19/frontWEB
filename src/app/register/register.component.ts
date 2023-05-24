import { Component } from '@angular/core';
import { FormBuilder,FormGroup } from "@angular/forms";
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
  RegForm = this.formbuilder.group({
    username: '',
    password: '',
    name: '',
    lastname: '',
    birthdate: ''
  });

  authenticated = 0;

  constructor(private formbuilder: FormBuilder, private router: Router , private registerService: RegisterService,private loginservice: LoginService,private cookies:CookieService) {}


  onsubmit(): void {
    // Obtiene los valores del formulario de inicio de sesión
    let userParam: string;
    let passParam: string;
    let nameParam: string;
    let lastnameParam: string;
    let birthdateParam: string;
    let cityParam = {
      city_id: 1,
      name: 'cali'
    };

    userParam= ''+ this.RegForm.value.username;
    passParam=''+this.RegForm.value.password;
    nameParam=''+this.RegForm.value.name;
    lastnameParam=''+this.RegForm.value.lastname;
    birthdateParam=''+this.RegForm.value.birthdate;

    // Envía una solicitud de inicio de sesión al servidor
    this.registerService.NewUser(nameParam,cityParam,lastnameParam,userParam,passParam,"",birthdateParam).subscribe(
      (data) :void => {
        if (data==true){

          this.loginservice.login(userParam, passParam).subscribe(
            (data) :void => {
              // Si el inicio de sesión es exitoso, guarda el token devuelto por el servidor
              // y establece el estado de inicio de sesión en verdadero
              if (data.token == "error"){
                alert("Usuario o contraseña incorrecta");
                this.failed = true;
              } else {
                this.loginservice.setToken(data.token);
                this.loggedIn = true;
                this.userName = userParam;
                this.cookies.set('user',this.userName);
                self.location.reload();
              }
            }
          )
          this.userName = userParam;
          this.cookies.set('user',this.userName);
          this.router.navigate(['/'])
        }else{
          alert("El usuario ya existe, intentelo nuevamente con otro usuario");
          this.failed = true;
        }
      }
    )
    // Reinicia el formulario de inicio de sesión
    this.RegForm.reset();
  }
}
