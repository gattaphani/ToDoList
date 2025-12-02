import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TruncatePipe } from '../../Pipe/truncate-pipe';

@Component({
  selector: 'app-card',
   standalone: true,
  imports: [CommonModule, IonicModule, TruncatePipe],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
 @Input() data: any | null = null;
  // @Output() edit = new EventEmitter<Course>();
  // @Output() delete = new EventEmitter<Course>();

  // onEdit() {
  //   this.edit.emit(this.data);
  // }
  // ngOnInit(): void {  
  //   console.log('CardComponent initialized with data:', this.data);
  // }


//   truncate(text: string, wordLimit: number): string {
//   const words = text.split(' ');
//   return words.length > wordLimit
//     ? words.slice(0, wordLimit).join(' ') + '...'
//     : text;
// }

}
