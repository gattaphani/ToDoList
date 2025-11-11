import { Component } from '@angular/core';
import { getCourses, loadCourses, loadCoursesSuccess } from '../../store/courses.actions';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { courseSelector } from '../../store/courses.selector';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CourseState } from '../../Modal/courseModal';
import { selectIsModalOpen } from '../../store/modal.selector';
import { ModalComponent } from "../modal/modal.component";
import { openModal } from '../../store/modal.actions';

@Component({
  selector: 'app-list-courses',
  imports: [CommonModule,IonicModule, ModalComponent],
  standalone: true,
  templateUrl: './list-courses.component.html',
  styleUrl: './list-courses.component.scss'
})
export class ListCoursesComponent {
 courses$: Observable<CourseState[]> = this.store.select(courseSelector)
 isModalOpen$ = this.store.select(selectIsModalOpen);
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadCourses());
  }
    onOpen() {
      this.store.dispatch(openModal());
      console.log('Open modal dispatched', this.store.select(selectIsModalOpen), this.isModalOpen$);
    }
}
