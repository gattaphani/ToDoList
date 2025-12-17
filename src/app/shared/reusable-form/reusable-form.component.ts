import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Course } from '../../Modal/courseModal';
import { courseSelector, isEditModeSelector, selectedCourseSelector } from '../../store/courses.selector';
import { Observable } from 'rxjs/internal/Observable';
import { showModalAction } from '../../store/courses.actions';
import { addCourse, selectedCourseAction, setEditModeAction, updateCourse } from '../../store/courses.actions';


export interface DynamicField {
  control: string;       // formControl name
  label: string;         // field label
  type?: string;
  placeholder?: string;  // input placeholder
  readonly?: boolean;   // is field readonly
  errorMessage?: string; // error text
}

@Component({
  selector: 'app-reusable-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  templateUrl: './reusable-form.component.html',
  styleUrls: ['./reusable-form.component.scss']
})
export class ReusableFormComponent implements OnChanges {

  @Input() form!: FormGroup;
  @Input() fields: DynamicField[] = [];
  @Output() submitForm = new EventEmitter<any>();
  isEditMode$: Observable<boolean> | null = null;
  editMode: boolean | null = false;
  selectedCourse$: Observable<Course | null> | null = null;
  selectedData: any = null;
  courses$: Observable<Course[]> = this.store.select(courseSelector)
  constructor(private store: Store) { }

  ngOnInit() {
    this.isEditMode$ = this.store.select(isEditModeSelector);
    this.selectedCourse$ = this.store.select(selectedCourseSelector);
    console.log('ngOnInit - selectedData:', this.selectedData);
    console.log('ngOnInit - editMode:', this.editMode);
    this.isEditMode$.subscribe(mode => {
      this.editMode = mode;
      if (this.editMode) {
        this.selectedCourse$?.subscribe(course => {
          this.selectedData = course;
          this.form.patchValue(this.selectedData);
          console.log('Patching form with selectedData:', this.selectedData);
        });
        console.log('Edit mode in form component:', this.editMode);
      }
      else {
        this.selectedData = null;
        this.form.reset();  // for Add mode
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {

  
  }


  onSubmit() {
    if (this.editMode) {
      if (this.selectedData) {
        this.store.dispatch(updateCourse({ course: this.form.value }));
      };
    }
    else {
      this.store.dispatch(addCourse({ course: this.form.value }));
    }
    this.store.dispatch(showModalAction({ value: false }));
  }

}

