import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { UsersControlComponent } from './users-control/users-control.component';
import {ToolControlComponent} from "./tool-control/tool-control.component";
import { RegisterComponent } from './register/register.component';
import {EditToolComponent} from "./edit-tool/edit-tool.component";
import {EditUserComponent} from "./edit-user/edit-user.component";

const routes: Routes = [
  {path:'', component: MainMenuComponent},
  {path: 'login', component: LoginComponent},
  {path: 'users-control', component: UsersControlComponent},
  {path: 'tool-control', component: ToolControlComponent},
  {path: 'reg',component: RegisterComponent},
  {path: 'editT', component: EditToolComponent},
  {path: 'editU',component:EditUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
