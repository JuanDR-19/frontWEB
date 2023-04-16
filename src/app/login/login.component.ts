import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../login.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css']
})
export class LoginComponent {
  constructor(private formbuilder:FormBuilder,private router:Router,private loginService:LoginService) {
  }
  checkOutForm = this.formbuilder.group({
    login:'',
    password:''
  })
  onsubmit():void{

    let userParam: string;
    let passParam: string;

    userParam= ''+ this.checkOutForm.value.login;
    passParam=''+this.checkOutForm.value.password;

    this.loginService.login(userParam,passParam).subscribe(
      (data) :void=>{
        if (data.token == "error"){
          this.checkOutForm.value.login='';
          this.checkOutForm.value.password=''
          console.log("Usuario o constrasena incorrecta");
        }else{
          this.loginService.setToken(data.token);
          this.router.navigateByUrl('/');
        }

      }
    )

    this.checkOutForm.reset();

  }
}
