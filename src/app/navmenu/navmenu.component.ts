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
  searchType = "brand";
  Authenticated = 0;

  ngOnInit() {
    this.checkAuthentication();
  }

  ngOnChanges() {
    this.checkAuthentication();
  }

  Search() {
    if (this.searchType === "brand") {
      this.searchBrand();
    } else if (this.searchType === "name") {
      this.searchName();
    }
  }

  searchBrand() {
    this.toolservice.searchBrand(this.word).subscribe((data) => {
      this.toolservice.updateTools(data);
    });
  }

  searchName() {
    this.toolservice.searchName(this.word).subscribe((data) => {
      this.toolservice.updateTools(data);
    });
  }

  logOut() {
    this.cookies.delete('token');
    this.cookies.delete("user");
    self.location.reload();
  }

  private checkAuthentication() {
    if (this.cookies.get('token') !== '') {
      this.Authenticated = 1;
    }
  }
}
