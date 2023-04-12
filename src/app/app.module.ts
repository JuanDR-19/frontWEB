import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { PaginationButtonsComponent } from './pagination-buttons/pagination-buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavmenuComponent,
    MainMenuComponent,
    PaginationButtonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
