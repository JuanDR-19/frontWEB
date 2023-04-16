import { Component } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "../login.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css']
})
export class LoginComponent {
  constructor(private formbuilder: FormBuilder, private router: Router, private loginService: LoginService) {
  }

  loggedIn = false; // nueva variable para controlar el estado de inicio de sesión
  userName = ''; // nueva variable para almacenar el nombre del usuario

  checkOutForm = this.formbuilder.group({
    login:'',
    password:''
  })

  onsubmit(): void {
    let userParam: string;
    let passParam: string;

    userParam= ''+ this.checkOutForm.value.login;
    passParam=''+this.checkOutForm.value.password;

    this.loginService.login(userParam,passParam).subscribe(
      (data) :void => {
        if (data.token == "error"){
          alert("Usuario o contraseña incorrecta");
        } else {
          this.loginService.setToken(data.token);
          this.loggedIn = true; // establece el estado de inicio de sesión en verdadero
          this.userName = userParam; // guarda el nombre de usuario en la variable userName
        }
      }
    )

    this.checkOutForm.reset();
  }
}
