import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {ToolService} from "../tool.service";
import {MainMenuComponent} from "../main-menu/main-menu.component";

@Component({
  selector: 'navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['../app.component.css']
})
export class NavmenuComponent {
  constructor(private toolservice: ToolService) {
  }

  word="";

  SearchBrand(){
    this.toolservice.searchBrand(this.word).subscribe(
      (data)=>{
        this.toolservice.updateTools(data);
      }
    )
  }

  SearchName(){
    this.toolservice.searchName(this.word).subscribe(
      (data)=>{
        this.toolservice.updateTools(data);
      }
    )
  }

}
