import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private cookies: CookieService) { }

  // Método para realizar la autenticación de usuario
  // Recibe como parámetros el usuario y contraseña ingresados por el usuario
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

  // Método para guardar el token en las cookies
  // Recibe como parámetro el token generado por el servidor
  setToken(token: string) {
    this.cookies.set("token", token);
  }

  // Método para obtener el token guardado en las cookies
  getToken() {
    return this.cookies.get("token");
  }
}
