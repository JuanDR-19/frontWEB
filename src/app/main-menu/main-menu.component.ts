import { Component } from '@angular/core';
import { ToolService } from '../tool.service';

// Interface que define las propiedades de una herramienta
interface Tool {
  name: string;
  img: string;
  description: string;
  price: any;
}

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['../app.component.css']
})
export class MainMenuComponent {

  // Inyecta el servicio ToolService en el constructor del componente
  constructor(private toolservice: ToolService) {}

  // Lista de herramientas que se mostrarán en la página
  tools: Tool[] = [];

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {

    // Obtiene la lista de herramientas del servicio ToolService utilizando el método getTools()
    // y se suscribe al resultado para actualizar la variable "tools" cuando la lista cambie
    this.toolservice.getTools().subscribe(
      (data: Tool[]) => {
        this.tools = data;
      }
    )

    // Se suscribe al observable "tools$" del servicio ToolService para actualizar la variable "tools"
    // cuando la lista de herramientas cambie en el servicio
    this.toolservice.tools$.subscribe(
      (data: Tool[]) => {
        this.tools = data;
      }
    );
  }
}
