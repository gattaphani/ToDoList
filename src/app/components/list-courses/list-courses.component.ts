import { Component } from '@angular/core';
import { addCourse, deleteCourse, getCourses, loadCourses, loadCoursesSuccess, updateCourse } from '../../store/courses.actions';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { courseSelector } from '../../store/courses.selector';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CourseState } from '../../Modal/courseModal';
import { selectIsModalOpen } from '../../store/modal.selector';
import { ModalComponent } from "../modal/modal.component";
import { closeModal, openModal } from '../../store/modal.actions';
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
  // selectedCourse: CourseState | null = null;
  isModalOpen$ = this.store.select(selectIsModalOpen);
  constructor(private store: Store, private fb: FormBuilder) { }

  ngOnInit() {
    this.store.dispatch(loadCourses());

  }
  onOpen() {
    this.store.dispatch(openModal());
    console.log('Open modal dispatched'), 
    // this.store.select(selectIsModalOpen),
    this.isModalOpen$.subscribe(val => {
      console.log('Modal open state:', val);
    });
  }


  fields: DynamicField[] = [
    { control: 'courseName', label: 'Course Name', errorMessage: 'Required' },
    { control: 'instructor', label: 'Instructor', errorMessage: 'Required' },
    { control: 'duration', type: 'number', label: 'Duration (hrs)' },
    { control: 'rating', type: 'number', label: 'Rating' },
    { control: 'description', label: 'Description' },
    { control: 'url', label: 'Image URL' },
    { control: 'id', label: 'Id'}
  ];

  courseForm = this.fb.group({
    courseName: ['', Validators.required],
    instructor: ['', Validators.required],
    duration: [1, Validators.min(1)],
    rating: [1, Validators.min(1)],
    description: [''],
    url: [''],
    id: [''] // optional, backend will assign
  });

  submitCourseForm(formValue: any) {
    // this.selectedCourse = null;
    console.log(formValue);
    this.store.dispatch(addCourse({ course: formValue }));
    this.store.dispatch(closeModal());
    // this.closeModal();
  }

  onEdit(course:CourseState){
    // this.selectedCourse = course;
    this.onOpen();
    this.store.dispatch(updateCourse({course}))
  }

  onDelete(course: CourseState){
    this.store.dispatch(deleteCourse({id: course.id}))
  }

  // openModal() { this.showModal = true; }
  // closeModal() { 
  //   this.showModal = false; 
  // }
}
