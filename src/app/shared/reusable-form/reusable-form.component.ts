import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { loadCourses, updateCourse } from '../../store/courses.actions';
import { CourseState } from '../../Modal/courseModal';
import { courseSelector } from '../../store/courses.selector';
import { Observable } from 'rxjs/internal/Observable';


export interface DynamicField {
  control: string;       // formControl name
  label: string;         // field label
  type?: string;         // input type
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
  @Input() fields: any[] = [];
  @Output() submitForm = new EventEmitter<any>();
  @Input() data: any = null;
  @Output() editFormDataChange = new EventEmitter<any>();
  courses$: Observable<CourseState[]> = this.store.select(courseSelector)
  constructor(private store: Store) {}
  
  ngOnInit() {
    // if (this.data) {
    //   debugger
    //   console.log('Edit Form Data:', this.data);
    //   this.store.dispatch(updateCourse({ course: this.data }));
    //   console.log('Dispatched updateCourse action with:', this.data);
    //   this.form.patchValue({
    //     ...this.data
    //   });
    // }
    console.log('ngOnInit - data:', this.data);
    if (this.data) {
      // ensure controls exist before patching
      Promise.resolve().then(() => {
        this.form.patchValue(this.data);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // Rebuild controls dynamically when fields change
    // if (changes['fields'] && this.form) {
    //   console.log('Fields changed:', this.fields);
    //   this.fields.forEach(f => {
    //     if (!this.form.get(f.control)) {
    //       this.form.addControl(f.control, new FormControl(''));
    //     }
    //   });
    // }
    console.log('ngOnChanges triggered with changes:', this.data);
    if (changes['fields'] && this.form) {
      this.fields.forEach(f => {
        if (!this.form.get(f.control)) {
          this.form.addControl(f.control, new FormControl(''));
        }
      });
    }

    // 2️⃣ Patch values when editing
    if (changes['data'] && this.data && this.form) {
      // ensure controls exist before patching
      Promise.resolve().then(() => {
        this.form.patchValue(this.data);
      });
    }
     if (changes['data'] && !this.data) {
    this.form.reset();  // for Add mode
  }
  }
   
  onSubmit() {
  
    console.log('Submitting form with values:', this.form.value);
    this.submitForm.emit(this.form.value);
    console.log('Form Submitted:', this.form.value);
    console.log('Edit Form Data:', this.data);
 
  }
}
