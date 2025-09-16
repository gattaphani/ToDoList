import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive} from "@angular/router";

@Component({
    selector: 'app-header',
    imports: [CommonModule, RouterLink, RouterLinkActive],
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
@Input() title:string='';

 currentDate: Date = new Date();

 private timerId: any;

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
