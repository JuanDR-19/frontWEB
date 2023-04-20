import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})


export class AppComponent implements OnInit {

  // Variable para el título del componente
  title = 'Inicio';

  // Inyecta el servicio Router en el constructor del componente
  constructor(private router: Router) {}

  ngOnInit() {}

  // Método que se ejecuta al hacer clic en el botón de inicio de sesión
  logging() {

    // Navega a la ruta "/login" utilizando el método "navigate()" del servicio Router
    this.router.navigate(['/login'])
  }
}
