import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {HttpClient,HttpParams,HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LoginService {
   constructor(private http:HttpClient,private cookies:CookieService) { }

  login(user:string,password:string): Observable<any>{
    const headers = new HttpHeaders()
    const body = JSON.stringify({});
    const params = new HttpParams().set('user',user).set('password',password)
    return this.http.post("http://localhost:8083/user",body,{params:params})
  }
  setToken(token:string){
    this.cookies.set("token",token)
  }

  getToken(){
    return this.cookies.get("token")
  }

}
