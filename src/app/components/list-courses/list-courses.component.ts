import { Component, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { addCourse, deleteCourse, getCourses, loadCourses, loadCoursesSuccess, showModalAction, updateCourse } from '../../store/courses.actions';
import { Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';
import { courseSelector, isEditModeSelector, showModalSelector } from '../../store/courses.selector';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Course } from '../../Modal/courseModal';
import { selectIsModalOpen } from '../../store/modal.selector';
import { ModalComponent } from "../modal/modal.component";
import { closeModal, openModal } from '../../store/modal.actions';
import { DynamicField, ReusableFormComponent } from '../../shared/reusable-form/reusable-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-list-courses',
  imports: [CommonModule, IonicModule, ModalComponent, ReusableFormComponent],
  standalone: true,
  templateUrl: './list-courses.component.html',
  styleUrl: './list-courses.component.scss'
})
export class ListCoursesComponent {
  courses$: Observable<Course[]>  | null = null;
  showModal$: Observable<boolean> | null = null;
  selectedCourse: Course  | null = null;
  isEditMode$: Observable<boolean> | null = null;
  
  @Output() editForm = new EventEmitter<Course | null>();
  constructor(private store: Store<AppState>, private fb: FormBuilder) { }

  ngOnInit() {
    this.store.dispatch(loadCourses());
    this.courses$ = this.store.select(courseSelector);
    this.showModal$ = this.store.select(showModalSelector);
    this.isEditMode$ = this.store.select(isEditModeSelector);
    }
  
  onOpen() {
    this.selectedCourse = null;
     this.store.dispatch(showModalAction({ value: true }));
      this.store.select(showModalSelector).subscribe(val => {
        console.log('Modal open state:', val);
      });
  }



  fields: DynamicField[] = [
    { control: 'courseName', type: 'text', label: 'Course Name', placeholder: 'Enter course name', errorMessage: 'Required', readonly: false },
    { control: 'instructor', type: 'text', label: 'Instructor', placeholder: 'Enter instructor name', errorMessage: 'Required', readonly: false },
    { control: 'duration', type: 'number', label: 'Duration (hrs)', placeholder: 'Enter duration in hours', readonly: false },
    { control: 'rating', type: 'number', label: 'Rating', placeholder: 'Enter rating', readonly: false },
    { control: 'description', type: 'textarea', label: 'Description', placeholder: 'Enter description', readonly: false },
    { control: 'url', type: 'file', label: 'Image URL', placeholder: 'Enter image URL', readonly: false },
    { control: 'id', type: 'text', label: 'Id', readonly: true }
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

  editCourseForm(formValue: any) {
     if (formValue.id) {
      this.store.dispatch(showModalAction({ value: true }));
    this.store.dispatch(updateCourse({ course: formValue }));
  } else {
    this.store.dispatch(addCourse({ course: formValue }));
  }
  // this.store.dispatch(closeModal());
  }


    ngOnChanges(changes: SimpleChanges) {
    if (this.selectedCourse) {
      // Prepopulate form fields
      console.log('Patching form with selectedCourse:',changes, this.selectedCourse);
      this.courseForm.patchValue(this.selectedCourse);
    }
  }
  onEdit(course:Course){
    this.selectedCourse = course;
    this.store.dispatch(showModalAction({ value: true }));
    this.store.select(showModalSelector).subscribe(val => {
      console.log('Modal open state:', val);
    });
  }

  onDelete(course: Course){
    this.store.dispatch(deleteCourse({id: course.id}))
  }
submitForm(formValue: any) {
    if (formValue.id) {
    this.store.dispatch(updateCourse({ course: formValue }));
  } else {
    this.store.dispatch(addCourse({ course: formValue }));
  }
  this.store.dispatch(showModalAction({ value: false }));
}
}
