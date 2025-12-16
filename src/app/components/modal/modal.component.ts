import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { closeModal } from '../../store/modal.actions';
import { IonicModule } from '@ionic/angular';
import { showModalAction, setEditModeAction } from '../../store/courses.actions';
import { isEditModeSelector, showModalSelector } from '../../store/courses.selector';
import { Observable } from 'rxjs';
// import { ReusableFormComponent } from '../../shared/reusable-form/reusable-form.component';

@Component({
  selector: 'app-modal',
  imports: [IonicModule],
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  showModal$: Observable<boolean> | null = null;
  @Input() data: any;
  @Input() isModalOpen: boolean | null = null;
  @Output() editFormData = new EventEmitter<any>();
  isEditMode$: Observable<boolean> | null = null;
  constructor(private store: Store) { }

  ngOnInit() {
    this.showModal$ = this.store.select(showModalSelector);
    //  this.isEditMode$ = this.store.select(isEditModeSelector);
  }
  onClose() {
    this.store.dispatch(showModalAction({ value: false }));
    this.store.dispatch(setEditModeAction({ isEditMode: false }));
  }


}
