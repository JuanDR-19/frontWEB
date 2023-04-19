import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

// define una interfaz para la herramienta
interface Tool {
  name: string;
  img: string;
  description: string;
  price: any;
}

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  // crea un BehaviorSubject que emite un arreglo de herramientas
  private toolsSubject = new BehaviorSubject<Tool[]>([]);
  // expone el BehaviorSubject como un observable para que los componentes puedan suscribirse a él
  tools$ = this.toolsSubject.asObservable();

  // método que actualiza el BehaviorSubject con nuevas herramientas
  updateTools(newTools: Tool[]) {
    this.toolsSubject.next(newTools);
  }

  constructor(private http: HttpClient, private cookies: CookieService) { }

  // método que obtiene todas las herramientas del servidor
  getTools(): Observable<Tool[]> {
    return this.http.get<Tool[]>("http://localhost:8081/get_tools");
  }

  // método que busca herramientas por nombre de marca en el servidor
  searchBrand(name: string): Observable<Tool[]> {
    return this.http.get<Tool[]>(`http://localhost:8082/get_tool_brand/${name}`);
  }

  // método que busca herramientas por nombre en el servidor
  searchName(brand_name: string): Observable<Tool[]> {
    return this.http.get<Tool[]>(`http://localhost:8082/get_tool_name/${brand_name}`);
  }
}
