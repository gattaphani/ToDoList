import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Course } from '../../Modal/courseModal';
import { courseSelector, isEditModeSelector, selectedCourseSelector } from '../../store/courses.selector';
import { Observable } from 'rxjs/internal/Observable';
import { addCourse, selectedCourseAction, setEditModeAction , updateCourse} from '../../store/courses.actions';


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
  // @Input() selectedData: any = null;
  @Output() submitForm = new EventEmitter<any>();
  isEditMode$: Observable<boolean> | null = null;
  editMode: boolean | null = false;
  selectedCourse$: Observable<Course | null> | null = null;
  selectedData: any = null;
  courses$: Observable<Course[]> = this.store.select(courseSelector)
  constructor(private store: Store) {}
  
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
  
    // 2️⃣ Patch values when editing
    // if (this.selectedData) {
    //   // ensure controls exist before patching
    //   Promise.resolve().then(() => {
    //     this.form.patchValue(this.selectedData);
    //   });
    // }
  
  else {
        this.selectedData = null;
        this.form.reset();  // for Add mode
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
  
    // console.log('ngOnChanges triggered with changes:', this.selectedData);
    // if (changes['fields'] && this.form) {
    //   this.fields.forEach(f => {
    //     if (!this.form.get(f.control)) {
    //       this.form.addControl(f.control, new FormControl(''));
    //     }
    //   });
    // }

    // 2️⃣ Patch values when editing
  //   if (changes['selectedData'] && this.selectedData && this.form) {
  //     // ensure controls exist before patching
  //     Promise.resolve().then(() => {
  //       this.form.patchValue(this.selectedData);
  //     });
  //   }
  //    if (changes['selectedData'] && !this.selectedData) {
  //   this.form.reset();  // for Add mode
  // }
  }
   
  // onSubmit() {
  //   // this.submitForm.emit(this.form.value);
  //   if(this.editMode){
  //     console.log('editMode:', this.editMode);
  //     console.log('Editing existing course with ID:', this.selectedData);
  //     this.selectedCourse$.subscribe(course => {
  //       console.log('Selected course from store:', course);
  //        if (this.selectedData) {
  //         this.form.patchValue(this.selectedData);
  //       }
  //       this.selectedData = course;
  //     });
  //     this.form.patchValue(this.selectedData)
  //     console.log('Dispatched updateCourse action with:', this.form.value);
  //     // this.store.dispatch(selectedCourseAction({ course: true }));
  //     this.store.dispatch(updateCourse({ course: this.form.value }));
      
  //   }
  //   else{
  //     this.store.dispatch(addCourse({ course: this.form.value }));
  //   }
  //   console.log('Form Submitted:', this.form.value);
  //   console.log('Edit Form Data:', this.selectedData);
  // } 
  
 onSubmit() {
    if (this.editMode) {
      // console.log('editMode:', this.editMode);
      // console.log('Editing existing course with ID:', this.selectedData);
     
        // this.selectedCourse$?.subscribe((course: Course | null) => {
        //   console.log('Selected course from store:', course);
        //   this.selectedData = course;
          // patch value inside the subscription, after selectedData is set
          if (this.selectedData) {
            // this.form.patchValue(this.selectedData);
             this.store.dispatch(updateCourse({ course: this.form.value }));
          }
        ;
      
      // console.log('Dispatched updateCourse action with:', this.form.value);
     
    }
    else {
      this.store.dispatch(addCourse({ course: this.form.value }));
    }
  }

}

