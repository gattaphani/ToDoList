import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { closeModal } from '../../store/modal.actions';
import { IonicModule } from '@ionic/angular';
import { showModalAction } from '../../store/courses.actions';
import { showModalSelector } from '../../store/courses.selector';
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
  showModal$ : Observable<boolean> | null = null;
  @Input() data: any;
  @Input() isModalOpen: boolean | null = null;
  @Output() editFormData = new EventEmitter<any>();
 constructor(private store: Store) {}

 ngOnInit() {
     this.showModal$ = this.store.select(showModalSelector);
  }
  onClose() {
   this.store.dispatch(showModalAction({ value: false }));
   this.store.select(showModalSelector).subscribe(val => {
     console.log('Modal open state after close:', val);
   })
    // console.log('Close modal dispatched', this.data);
  }
  // ngOnInit() {
  //   this.getEditFormdata();
  // }
  getEditFormdata() {
    console.log('Modal Component received data:', this.data);
    this.editFormData.emit(this.data);
  }
}
