import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {HttpClient,HttpParams,HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

interface Tool {
  name: string;
  img: string;
  description: string;
  price:any;
}

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  private toolsSubject = new BehaviorSubject<Tool[]>([]);
  tools$ = this.toolsSubject.asObservable();

  updateTools(newTools: Tool[]) {
    this.toolsSubject.next(newTools);
  }

  constructor(private http:HttpClient,private cookies:CookieService) { }

  getTools(): Observable<Tool[]> {
    return this.http.get<Tool[]>("http://localhost:8081/get_tools");
  }

  searchBrand(name:string): Observable<Tool[]>{
    return this.http.get<Tool[]>(`http://localhost:8082/get_tool_brand/${name}`);
  }

  searchName(brand_name:string): Observable<Tool[]>{
    return this.http.get<Tool[]>(`http://localhost:8082/get_tool_name/${brand_name}`);
  }

}
