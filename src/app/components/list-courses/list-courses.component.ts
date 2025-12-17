import { Component, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { addCourse, deleteCourse, getCourses, loadCourses, loadCoursesSuccess, setEditModeAction, showModalAction, updateCourse } from '../../store/courses.actions';
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
import { CardComponent } from "../../shared/card/card.component";

@Component({
  selector: 'app-list-courses',
  imports: [CommonModule, IonicModule, ModalComponent, ReusableFormComponent, CardComponent],
  standalone: true,
  templateUrl: './list-courses.component.html',
  styleUrl: './list-courses.component.scss'
})
export class ListCoursesComponent {
  courses$!: Observable<Course[]>;
  showModal$!: Observable<boolean>;
  selectedCourse: Course | null = null;
  isEditMode$!: Observable<boolean>;

  @Output() editForm = new EventEmitter<Course | null>();
  @Output() editCourseFormEvent = new EventEmitter<number>();
  constructor(private store: Store<AppState>, private fb: FormBuilder) { }

  ngOnInit() {
    this.courses$ = this.store.select(courseSelector);
    this.showModal$ = this.store.select(showModalSelector);
    this.isEditMode$ = this.store.select(isEditModeSelector);
    this.store.dispatch(loadCourses());
  }

  onOpen() {
    this.selectedCourse = null;
    this.store.dispatch(showModalAction({ value: true }));
    this.store.dispatch(setEditModeAction({ isEditMode: false }));
  }



  fields: DynamicField[] = [
    { control: 'courseName', type: 'text', label: 'Course Name', placeholder: 'Enter course name', errorMessage: 'Required', readonly: false },
    { control: 'instructor', type: 'text', label: 'Instructor', placeholder: 'Enter instructor name', errorMessage: 'Required', readonly: false },
    { control: 'duration', type: 'number', label: 'Duration (hrs)', placeholder: 'Enter duration in hours', readonly: false },
    { control: 'rating', type: 'number', label: 'Rating', placeholder: 'Enter rating', readonly: false },
    { control: 'description', type: 'textarea', label: 'Description', placeholder: 'Enter description', readonly: false },
    { control: 'price', type: 'text', label: 'Price', placeholder: 'Enter price', readonly: false },
    { control: 'url', type: 'file', label: 'Image URL', placeholder: 'Enter image URL', readonly: false },
    // { control: 'id', type: 'text', label: 'Id', readonly: true }
  ];

  courseForm = this.fb.group({
    courseName: ['', Validators.required],
    instructor: ['', Validators.required],
    duration: [1, Validators.min(1)],
    rating: [1, Validators.min(1)],
    description: [''],
    url: [''],
    price: [''],
    // id: [''] // optional, backend will assign
  });


  onDelete(course: Course) {
    this.store.dispatch(deleteCourse({ id: course.id }))
  }

  setEditMode(mode: any) {
    console.log('Edit mode set to:', mode);
    mode.subscribe((isEditMode: boolean) => {
      console.log('Emitted isEditMode value:', isEditMode);
      this.store.dispatch(setEditModeAction({ isEditMode: isEditMode }));
    });
  }

  editCourseForm(formValue: any) {
    this.selectedCourse = formValue;
    this.courseForm.patchValue(formValue);
    this.editCourseFormEvent.emit(formValue);
  }
}

