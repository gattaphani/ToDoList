import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
@Input() title:string='';

 currentDate: Date = new Date();
//  constructor() {
//     setInterval(() => {
//       this.currentDate = new Date();
//     }, 1000);
//   }
 private timerId: any;

  ngOnInit() {
    // this.timerId = setInterval(() => {
    //   this.currentDate = new Date();
    // }, 1000);
  }

  ngOnDestroy() {
    // if (this.timerId) {
    //   clearInterval(this.timerId);
    // }
  }
}
