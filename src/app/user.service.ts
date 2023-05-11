import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";


interface User {
  name: string;
  last_name: string;
  username: string;
  password: string;
  token: string;
  birthday: string;
}

@Injectable({
  providedIn: 'root'
})
/**

 @description Servicio encargado de realizar las consultas de los usuarios
 @class UserService
 @constructor
 @param {HttpClient} http - servicio Angular que se encarga de realizar las peticiones htttp a los microservicios
 */
export class UserService {
  /**
   * variable compartida de lista de usuarios que genera un observable para que otras clases puedan modificarla y/o verla
   * @type {BehaviorSubject}
   * @private
   */
  private userSubject = new BehaviorSubject<User[]>([]);
  users$ = this.userSubject.asObservable();
  constructor(private http: HttpClient) { }
  /**

   @description Método encargado de devolver TODOS los usuarios
   @method getUsers
   @returns {Observable<User[]>} - Observable que emite la respuesta de la petición HTTP realizada.
   */
   getUsers(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:8083/get_users");
  }
}
export { User };