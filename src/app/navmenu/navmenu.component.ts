import { Component } from '@angular/core';
import { ToolService } from "../tool.service";
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['../app.component.css']
})

export class NavmenuComponent {

  constructor(private toolservice: ToolService, private cookies: CookieService, private router: Router) {}

  word = "";
  searchType = "marca";
  Authenticated = 0;
  currentRoute="";

  ngOnInit() {
    this.checkAuthentication();
  }

  search() {

    if (this.searchType === "brand") {
      this.SearchBrand();

    }
    if (this.searchType === "name") {
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

  getCurrentRoute(): Promise<string> {
    return new Promise((resolve) => {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          resolve(event.url);
        }
      });
    });
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }
}
