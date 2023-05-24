import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";


interface Tool {
  name: string;
  img: string;
  description: string;
  price: any;
  id:number;
}

@Injectable({
  providedIn: 'root'
})

/**

 @description Servicio encargado de realizar las consultas de las herramientas ya sea con filtro de marca, nombre o sin filtro
 @class ToolService
 @constructor
 @param {HttpClient} http - servicio Angular que se encarga de realizar las peticiones htttp a los microservicios
 */
export class ToolService {

  /**
   * variable compartida de lista de herramientas que genera un observable para que otras clases puedan modificarla y/o verla
   * @type {BehaviorSubject}
   * @private
   */
  private toolsSubject = new BehaviorSubject<Tool[]>([]);
  tools$ = this.toolsSubject.asObservable();

  constructor(private http: HttpClient) { }

  /**

   @description Método encargado de actualizar la lista de herramientas que presenta el main-menu.
   @method updateTools
   @param {Tool[]} newTools - Contiene las herramientas a mostrar.
   */
  updateTools(newTools: Tool[]) {
    this.toolsSubject.next(newTools);
  }

  /**

   @description Método encargado de devolver las herramientas
   @method getTools
   @returns {Observable<Tool[]>} - Observable que emite la respuesta de la petición HTTP realizada.
   */
  getTools(): Observable<Tool[]> {
    return this.http.get<Tool[]>("http://localhost:8081/get_tools");
  }

  /**

   @description Método encargado de buscar las herramientas que pertenezcan a una marca en especifico
   @method searchBrand
   @param {string} name - representa el nombre de la marca que se desea buscar
   @returns {Observable<Tool[]>} - Observable que emite la respuesta de la petición HTTP realizada.
   */
  searchBrand(name: string): Observable<Tool[]> {
    return this.http.get<Tool[]>(`http://localhost:8082/get_tool_brand/${name}`);
  }

  /**

   @description Método encargado de buscar las herramientas que tengan un nombre dado.
   @method searchName
   @param {string} brand_name -representa el nombre de la herramienta a buscar.
   @returns {Observable<Tool[]>} - Observable que emite la respuesta de la petición HTTP realizada.
   */
  searchName(brand_name: string): Observable<Tool[]> {
    return this.http.get<Tool[]>(`http://localhost:8082/get_tool_name/${brand_name}`);
  }

  deleteTool(id:number):Observable<any>{
    const url = `http://localhost:8081/deleteTool/${id}`;
    return this.http.delete(url);
  }

  updateTool(tool: Tool, id: number): Observable<any> {
    const url = `http://localhost:8081/updatetool/${id}`;
    return this.http.put(url, tool);
  }
}
export { Tool };
