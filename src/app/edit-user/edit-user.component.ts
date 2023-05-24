import { Component } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { RegisterService } from "../register.service";
import { LoginService } from "../login.service";
import { CookieService } from "ngx-cookie-service";
import { User, UserService } from "../user.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  userName = '';
  failed = false;
  EditForm = this.formbuilder.group({
    username: '',
    password: '',
    name: '',
    lastname: '',
    birthdate: ''
  });

  authenticated = 0;

  user: User[] = [];
  user1: User = {
    user_id: 0,
    username: '',
    password: '',
    name_user: '',
    last_name_user: '',
    birthdate_user: '',
    city_id: 0,
    token: ''
  };

  userN: User = {
    user_id: 0,
    username: '',
    password: '',
    name_user: '',
    last_name_user: '',
    birthdate_user: '',
    city_id: 0,
    token: ''
  };

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private registerService: RegisterService,
    private loginservice: LoginService,
    private userService: UserService,
    private cookies: CookieService
  ) {}

  ngOnInit() {
    let id = this.cookies.get('id');

    this.userService.getUsers().subscribe((data: User[]) => {
      this.user = data;
      this.user1 = this.user.find(u => u.user_id.toString() === id) || this.user1;
    });
  }

  updateUser(id: number): void {
    let userParam = this.EditForm.value.username;
    let passParam = this.EditForm.value.password;
    let nameParam = this.EditForm.value.name;
    let lastnameParam = this.EditForm.value.lastname;
    let birthdateParam = this.EditForm.value.birthdate;

    this.userN.user_id = Number(userParam);
    if (nameParam != null) {
      this.userN.name_user = nameParam;
    }
    if (passParam != null) {
      this.userN.password = passParam;
    }
    if (lastnameParam != null) {
      this.userN.last_name_user = lastnameParam;
    }
    if (birthdateParam != null) {
      this.userN.birthdate_user = birthdateParam;
    }

    this.userService.updateUser(id, this.userN).subscribe(() => {
      location.reload();
    });
  }
}
