import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { closeModal } from '../../store/modal.actions';
import { IonicModule } from '@ionic/angular';
// import { ReusableFormComponent } from '../../shared/reusable-form/reusable-form.component';

@Component({
  selector: 'app-modal',
  imports: [IonicModule],
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() data: any;
  @Input() isModalOpen: boolean = false;
  @Output() editFormData = new EventEmitter<any>();
 constructor(private store: Store) {}

  onClose() {
    this.store.dispatch(closeModal());
    console.log('Close modal dispatched', this.data);
  }
  // ngOnInit() {
  //   this.getEditFormdata();
  // }
  getEditFormdata() {
    console.log('Modal Component received data:', this.data);
    this.editFormData.emit(this.data);
  }
}
