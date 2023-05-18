import { Component } from '@angular/core';
import { ToolService, Tool } from '../tool.service';

@Component({
  selector: 'tool-control',
  templateUrl: './tool-control.component.html',
  styleUrls: ['./tool-control.component.css']
})
/**
 * @description Componente encargado de mostrar las opciones de manejo de herramientas de acuerdo a las cargadas en la base de datos
 * @class Tool-controlComponent
 * @constructor
 * @param {ToolService} toolservice -servicio de angular para realizar peticiones HTTP al microServicio toolsWeb
 */
export class ToolControlComponent {
  constructor(private toolservice: ToolService) {}
  /**
   * lista de tools a mostrar en la pagina
   * @type {Tool[]}
   */
  tool: Tool[] = [];
  /**

   Inicializa el componente obteniendo la lista de tools
   utilizando el método getTools() y suscribiéndose al resultado para actualizar la variable "tool"
   cuando la lista cambie. También se suscribe al observable "tools$" del servicio ToolService
   para actualizar la variable "tool" cuando la lista de usuarios cambie en el servicio.
   @returns void
   */
   ngOnInit(): void {

    this.toolservice.getTools().subscribe(
      (data: Tool[]) => {
        this.tool = data;
        console.log(data);
      }
    )

    this.toolservice.tools$.subscribe(
      (data: Tool[]) => {
        this.tool = data;
      }
    );
  }
}
