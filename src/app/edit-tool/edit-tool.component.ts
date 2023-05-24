import { Component } from '@angular/core';
import {Tool} from "../main-menu/main-menu.component";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {ToolService} from "../tool.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-edit-tool',
  templateUrl: './edit-tool.component.html',
  styleUrls: ['./edit-tool.component.css']
})
export class EditToolComponent {
  tool: Tool = {
    id: 0,
    name: '',
    img: '',
    description: '',
    price: 0,
  };

  EditTForm = this.formBuilder.group({
    name: '',
    img: '',
    description: '',
    price: 0,
  })

  constructor(private formBuilder: FormBuilder, private router: Router, private toolService: ToolService,private  cookies:CookieService) {}


  ngOnInit() {
    // Lógica para obtener el ID de la herramienta a editar y cargar los datos correspondientes
    // Puedes obtener el ID de la URL o de algún otro lugar según tu implementación
    const toolId = this.cookies.get('name');

    this.toolService.searchName(toolId).subscribe((data:Tool[]) => {
      this.tool = data[0];
    });
  }
  updateTool(): void {
    let nameParam:string;
    let imgParam:string;
    let descripParam:string;
    let priceParam:string;

    nameParam = ''+this.EditTForm.value.name;
    imgParam = ''+ this.EditTForm.value.img;
    descripParam= ''+this.EditTForm.value.description;
    priceParam = ''+this.EditTForm.value.description;

    this.tool.name = nameParam;
    this.tool.img=imgParam;
    this.tool.description=descripParam;
    this.tool.price=priceParam;

    this.toolService.updateTool(this.tool, this.tool.id).subscribe(() => {
    });
    this.router.navigate(['/']);
  }

}
