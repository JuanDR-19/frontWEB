import { Component } from '@angular/core';
import { ToolService } from '../tool.service';

// Interface que define las propiedades de una herramienta
interface Tool {
  name: string;
  img: string;
  description: string;
  price: any;
  id: number;
}

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['../app.component.css']
})

/**
 * @description Componente encargado de mostrar el menu con todas las herramientas
 * @class MainMenuComponent
 * @constructor
 * @param {ToolService} toolservice -servicio de angular para realizar peticiones HTTP al microServicio ToolsWeb y ToolsSearch
 */
export class MainMenuComponent {

  constructor(private toolservice: ToolService) {}

  /**
   * lista de herramientas a mostrar en la pagina principal
   * @type {Tool[]}
   */
  tools: Tool[] = [];

  /**

   Inicializa el componente obteniendo la lista de herramientas del servicio ToolService
   utilizando el método getTools() y suscribiéndose al resultado para actualizar la variable "tools"
   cuando la lista cambie. También se suscribe al observable "tools$" del servicio ToolService
   para actualizar la variable "tools" cuando la lista de herramientas cambie en el servicio.
   @returns void
   */
  ngOnInit(): void {

    this.toolservice.getTools().subscribe(
      (data: Tool[]) => {
        this.tools = data;
      }
    )

    this.toolservice.tools$.subscribe(
      (data: Tool[]) => {
        this.tools = data;
      }
    );
  }
}
export {Tool}
