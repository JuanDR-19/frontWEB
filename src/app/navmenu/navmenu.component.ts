import { Component } from '@angular/core';
import { ToolService } from "../tool.service";

@Component({
  selector: 'navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['../app.component.css']
})
export class NavmenuComponent {

  // Inyecta el servicio ToolService en el constructor del componente
  constructor(private toolservice: ToolService) {}

  // Variable que contiene la palabra a buscar
  word="";

  // Método que se ejecuta al hacer clic en el botón "Buscar por marca"
  SearchBrand() {

    // Llama al método "searchBrand()" del servicio ToolService para buscar herramientas por marca
    // y se suscribe al resultado para actualizar la lista de herramientas cuando se reciban los datos
    this.toolservice.searchBrand(this.word).subscribe(
      (data) => {
        // Actualiza la lista de herramientas en el servicio ToolService utilizando el método "updateTools()"
        // con los datos recibidos de la búsqueda
        this.toolservice.updateTools(data);
      }
    )
  }

  // Método que se ejecuta al hacer clic en el botón "Buscar por nombre"
  SearchName() {

    // Llama al método "searchName()" del servicio ToolService para buscar herramientas por nombre
    // y se suscribe al resultado para actualizar la lista de herramientas cuando se reciban los datos
    this.toolservice.searchName(this.word).subscribe(
      (data) => {
        // Actualiza la lista de herramientas en el servicio ToolService utilizando el método "updateTools()"
        // con los datos recibidos de la búsqueda
        this.toolservice.updateTools(data);
      }
    )
  }
}
