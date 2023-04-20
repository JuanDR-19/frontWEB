import { Component } from '@angular/core';
import { ToolService } from "../tool.service";

@Component({
  selector: 'navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['../app.component.css']
})

/**

 @description Compononete que contiene el header de navegacion.
 @class NavmenuComponent
 @constructor
 @param {ToolService} toolservice -Servicio que se encarga de realizar las peticiones http a microservicio necesario
 */
export class NavmenuComponent {


  constructor(private toolservice: ToolService) {}

  // Variable que contiene la palabra a buscar
  word="";

  /**

   @description Método encargado de llamar al servicio para buscar herramientas por marca
   @method SearchBrand
   */
  SearchBrand() {

    this.toolservice.searchBrand(this.word).subscribe(
      (data) => {
        this.toolservice.updateTools(data);
      }
    )
  }

  /**

   @description Método que se ejecuta al hacer clic en el botón "Buscar por nombre" para llamar al servicio que busca las herramientas por nombre
   @method SearchName
   */
  SearchName() {

    this.toolservice.searchName(this.word).subscribe(
      (data) => {
        this.toolservice.updateTools(data);
      }
    )
  }
}
