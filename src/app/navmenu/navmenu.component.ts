import { Component } from '@angular/core';
import { ToolService } from "../tool.service";
import { CookieService  } from "ngx-cookie-service";


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

  constructor(private toolservice: ToolService,private cookies:CookieService) {}

  /**
   * nombre de marca o nombre de herramienta a buscar
   * @type {String} word
   */
  word="";
  Authenticated = 0;

  ngOnInit(){
    this.checkAuthentication();
  }

  ngOnChanges(){
    this.checkAuthentication();
  }

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

  logOut(){
    this.cookies.delete('token');
    this.cookies.delete("user");
    self.location.reload();
  }

  private checkAuthentication() {
    if (this.cookies.get('token') !== '') {
      this.Authenticated = 1;
      console.log(this.cookies.get('token'));
    }
  }

}
