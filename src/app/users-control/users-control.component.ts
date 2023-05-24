import { Component } from '@angular/core';
import { UserService, User } from '../user.service';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'users-control',
  templateUrl: './users-control.component.html',
  styleUrls: ['../app.component.css']
})
/**
 * @description Componente encargado de mostrar las opciones de manejo de usuarios de acuerdo a los usuarios cargados en la base de datos
 * @class Users-controlComponent
 * @constructor
 * @param {UserService} userservice -servicio de angular para realizar peticiones HTTP al microServicio usersWeb
 */
export class UsersControlComponent {
  constructor(private userservice: UserService,private  cookieservice:CookieService,private router:Router) {}

  /**
   * lista de usuarios a mostrar en la pagina
   * @type {User[]}
   */
  user: User[] = [];

  /**

   Inicializa el componente obteniendo la lista de usuarios del servicio UserService
   utilizando el método getUsers() y suscribiéndose al resultado para actualizar la variable "users"
   cuando la lista cambie. También se suscribe al observable "users$" del servicio UserService
   para actualizar la variable "users" cuando la lista de usuarios cambie en el servicio.
   @returns void
   */
   ngOnInit(): void {

    this.userservice.getUsers().subscribe(
      (data: User[]) => {
        this.user = data;
      }
    )

    this.userservice.users$.subscribe(
      (data: User[]) => {
        this.user = data;
      }
    );
  }

  borrar(id: number): void {
    this.userservice.deleteUser(id).subscribe(() => {
      location.reload();
    });
  }

  editU(id:number):void{
     this.cookieservice.set('id',String(id));
     this.router.navigate(['/editU']);
  }
}

