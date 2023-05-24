import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

interface User {
  name_user: string;
  city_id: {
    city_id: number;
    name: string;
  };
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

 @description Servicio encargado de realizar el registro de usuario y de manejar el token de autenticación mediante cookies.
 @class RegisterService
 @constructor
 @param {HttpClient} http - Servicio Angular para realizar peticiones HTTP.
 @param {CookieService} cookies - Servicio para manejar cookies en Angular.
 */
export class RegisterService {
  constructor(private http: HttpClient, private cookies: CookieService) { }
  /**

   @description Método encargado de generar un usuario nuevo
   @method NewUser
   @returns {Null}
   */
   NewUser(
    name_user: string,
    city_id: { city_id: number, name: string },
    last_name_user: string,
    username: string,
    password: string,
    token: string,
    birthdate_user: string
  ): Observable<any> {
    const user: User = {
      name_user,
      city_id,
      last_name_user,
      username,
      password,
      token,
      birthdate_user
    };
    return this.http.post<boolean>('http://localhost:8083/NewUser', user);
  }

}
export { User };
