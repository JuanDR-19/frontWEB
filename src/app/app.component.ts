import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})

/**
 * clase del componente inicial de la aplicacion
 * @implements OnInit
 * @class AppComponent
 * @param {Router} router - clase de angular para manejar la ruta entre pantallas de la aplicacion
 */

export class AppComponent implements OnInit {

  /**
   * Variable que imprime el nombre del usuario cuando se autentique
   */
  title = 'Inicio';
  athenticated=0;

  constructor(private router: Router) {}

  ngOnInit() {}

  /**
   * metodo para cambiar de componente y mostrar el componente para iniciar sesion
   */
  logging() {
    // Navega a la ruta "/login" utilizando el método "navigate()" del servicio Router
    this.router.navigate(['/login'])
  }

  
}
