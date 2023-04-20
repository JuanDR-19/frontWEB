import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

/**

 @description Servicio encargado de realizar la autenticación de usuario y de manejar el token de autenticación mediante cookies.
 @class LoginService
 @constructor
 @param {HttpClient} http - Servicio Angular para realizar peticiones HTTP.
 @param {CookieService} cookies - Servicio para manejar cookies en Angular.
 */
export class LoginService {
  constructor(private http: HttpClient, private cookies: CookieService) { }

  /**

   @description Método encargado de realizar la autenticación de usuario.
   @method login
   @param {string} user - Nombre de usuario ingresado por el usuario.
   @param {string} password - Contraseña ingresada por el usuario.
   @returns {Observable<any>} - Observable que emite la respuesta de la petición HTTP realizada.
   */
  login(user: string, password: string): Observable<any> {
    // Se crea el objeto HttpHeaders vacío
    const headers = new HttpHeaders();
    // Se crea el objeto body vacío
    const body = JSON.stringify({});
    // Se crean los parámetros con el usuario y la contraseña ingresados
    const params = new HttpParams().set('user', user).set('password', password);
    // Se realiza una petición POST a la URL especificada con los parámetros y body especificados
    return this.http.post("http://localhost:8083/user", body, { params: params });
  }

  /**

   @description Método encargado de guardar el token en las cookies.
   @method setToken
   @param {string} token - Token generado por el servidor.
   @returns {void}
   */
  setToken(token: string) {
    this.cookies.set("token", token);
  }

  /**

   @description Método encargado de obtener el token guardado en las cookies.
   @method getToken
   @returns {string} - Token guardado en las cookies.
   */
  getToken() {
    return this.cookies.get("token");
  }
}
