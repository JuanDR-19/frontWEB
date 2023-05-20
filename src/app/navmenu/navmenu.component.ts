import { Component } from '@angular/core';
import { ToolService } from "../tool.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['../app.component.css']
})

export class NavmenuComponent {

  constructor(private toolservice: ToolService, private cookies: CookieService) {}

  word = "";
  searchType = "marca";
  Authenticated = 0;

  ngOnInit() {
    this.checkAuthentication();
  }

  ngOnChanges() {
    this.checkAuthentication();
  }

  search() {
    if (this.searchType === "brand") {
      this.SearchBrand();
    } else if (this.searchType === "name") {
      this.SearchName();
    }
  }

  SearchBrand() {
    this.toolservice.searchBrand(this.word).subscribe(
      (data) => {
        this.toolservice.updateTools(data);
      }
    );
  }

  SearchName() {
    this.toolservice.searchName(this.word).subscribe(
      (data) => {
        this.toolservice.updateTools(data);
      }
    );
  }

  logOut() {
    this.cookies.delete('token');
    this.cookies.delete("user");
    location.reload();
  }

  private checkAuthentication() {
    if (this.cookies.get('token') !== '') {
      this.Authenticated = 1;
    }
  }
}
