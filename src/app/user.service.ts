import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";

interface User {
  user_id : number;
  name_user: string;
  city_id : number;
  last_name_user: string;
  username: string;
  password: string;
  token: string;
  birthdate_user: string;
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
  constructor(private http: HttpClient, private cookies: CookieService) { }
  /**

   @description Método encargado de devolver TODOS los usuarios
   @method getUsers
   @returns {Observable<User[]>} - Observable que emite la respuesta de la petición HTTP realizada.
   */
   getUsers(): Observable<User[]> {
     const token=this.cookies.get('token')
     const headers =new HttpHeaders().set('Authorization',token);
    return this.http.get<User[]>("http://localhost:8083/get_users",{headers});
  }
  /**
   @description Método encargado de eliminar usuarios con el ID especificado
   @method deleteUser
   */
   deleteUser(identifier: number): Observable<any> {
    const url = `http://localhost:8083/deleteUser/${identifier}`;
    const token=this.cookies.get('token')
    const headers =new HttpHeaders().set('Authorization',token);
    return this.http.delete(url,{headers});
  }

  updateUser(id: number, u: { password: string; name_user: string; user_id: number; last_name_user: string; username: string; birthdate_user: string; city_id: number }): Observable<any> {

    const url = `http://localhost:8083/updateUser/${id}`;
    const token = this.cookies.get('token');
    const headers = new HttpHeaders().set('Authorization', token);

    return this.http.put(url, u, { headers: headers });
  }



}
export { User };
