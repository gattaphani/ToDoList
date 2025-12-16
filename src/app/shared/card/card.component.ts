import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TruncatePipe } from '../../Pipe/truncate-pipe';
import { selectedCourseAction, setEditModeAction, showModalAction } from '../../store/courses.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { isEditModeSelector, selectedCourseSelector } from '../../store/courses.selector';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, IonicModule, TruncatePipe],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() data: any | null = null;
  @Output() editForm = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() setMode = new EventEmitter<any>();

  selectedCourse$: Observable<any> | null = null;
  isEditMode$: Observable<boolean> | null = null;
  ngOnInit(): void {
    console.log('CardComponent initialized with data:', this.data);
    this.isEditMode$ = this.store.select(isEditModeSelector);
    this.selectedCourse$ = this.store.select(selectedCourseSelector);
  }


  //   truncate(text: string, wordLimit: number): string {
  //   const words = text.split(' ');
  //   return words.length > wordLimit
  //     ? words.slice(0, wordLimit).join(' ') + '...'
  //     : text;
  // }

  constructor(private store: Store) { }

  onEdit(selectedData: any) {
    console.log('Emitted editForm with data:', selectedData)
    this.editForm.emit(selectedData);
    this.store.dispatch(selectedCourseAction({ course: selectedData }));
    this.store.dispatch(showModalAction({ value: true }));
    this.store.dispatch(setEditModeAction({ isEditMode: true }));
    this.setMode.emit(this.isEditMode$);
  }

  onDelete(selectedData: any) {
    this.delete.emit(selectedData);
  }
}
