import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { PaginationButtonsComponent } from './pagination-buttons/pagination-buttons.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UsersControlComponent } from './users-control/users-control.component';
import { ToolControlComponent } from './tool-control/tool-control.component';
import { RegisterComponent } from './register/register.component';
import { EditToolComponent } from './edit-tool/edit-tool.component';
import { EditUserComponent } from './edit-user/edit-user.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavmenuComponent,
    MainMenuComponent,
    PaginationButtonsComponent,
    UsersControlComponent,
    ToolControlComponent,
    RegisterComponent,
    EditToolComponent,
    EditUserComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
