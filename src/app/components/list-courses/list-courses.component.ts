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
import { DynamicField, ReusableFormComponent } from '../../shared/reusable-form/reusable-form.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-courses',
  imports: [CommonModule, IonicModule, ModalComponent, ReusableFormComponent],
  standalone: true,
  templateUrl: './list-courses.component.html',
  styleUrl: './list-courses.component.scss'
})
export class ListCoursesComponent {
  courses$: Observable<CourseState[]> = this.store.select(courseSelector)
  isModalOpen$ = this.store.select(selectIsModalOpen);
  constructor(private store: Store, private fb: FormBuilder) { }

  ngOnInit() {
    this.store.dispatch(loadCourses());
  }
  onOpen() {
    this.store.dispatch(openModal());
    console.log('Open modal dispatched'), 
    this.store.select(selectIsModalOpen),
    this.isModalOpen$.subscribe(val => {
      console.log('Modal open state:', val);
    });
  }
  showModal = false;

  fields: DynamicField[] = [
    { control: 'courseName', label: 'Course Name', errorMessage: 'Required' },
    { control: 'instructor', label: 'Instructor', errorMessage: 'Required' },
    { control: 'duration', type: 'number', label: 'Duration (hrs)' },
    { control: 'rating', type: 'number', label: 'Rating' },
    { control: 'description', label: 'Description' },
    { control: 'url', label: 'Image URL' }
  ];

  courseForm = this.fb.group({
    courseName: ['', Validators.required],
    instructor: ['', Validators.required],
    duration: [1, Validators.min(1)],
    rating: [1, Validators.min(1)],
    description: [''],
    url: ['']
  });

  submitCourseForm(formValue: any) {
    console.log(formValue);
  }

  // openModal() { this.showModal = true; }
  closeModal() { 
    this.showModal = false; 
  }
}
