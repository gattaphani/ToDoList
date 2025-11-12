import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { closeModal } from '../../store/modal.actions';
// import { ReusableFormComponent } from '../../shared/reusable-form/reusable-form.component';

@Component({
  selector: 'app-modal',
  imports: [],
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
 constructor(private store: Store) {}

  onClose() {
    this.store.dispatch(closeModal());
  }
}
