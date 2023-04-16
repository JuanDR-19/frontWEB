import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {HttpClient,HttpParams,HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

interface Tool {
  name: string;
  img: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  constructor(private http:HttpClient,private cookies:CookieService) { }

  getTools(): Observable<Tool[]> {
    return this.http.get<Tool[]>("http://localhost:8081/get_tools");
  }

}
