import { Component } from '@angular/core';
import { ToolService } from '../tool.service';

interface Tool {
  name: string;
  img: string;
  description: string;
}

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['../app.component.css']
})
export class MainMenuComponent {
  constructor(private toolservice: ToolService) {}

  tools: Tool[] = [];

  ngOnInit(): void {
    this.toolservice.getTools().subscribe(
      (data:Tool[]) => {
        this.tools=data;
      }
    );
  }
}
