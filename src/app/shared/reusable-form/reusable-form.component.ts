import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


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
  styleUrl: './reusable-form.component.scss'


})
export class ReusableFormComponent implements OnChanges {

  @Input() form!: FormGroup;
  @Input() fields: any[] = [];
  @Output() submitForm = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges) {
    // Rebuild controls dynamically when fields change
    if (changes['fields'] && this.form) {
      this.fields.forEach(f => {
        if (!this.form.get(f.name)) {
          this.form.addControl(f.name, new FormControl(''));
        }
      });
    }
  }
   
  onSubmit() {
    this.submitForm.emit(this.form.value);
    console.log('Form Submitted:', this.form.value);
  }
}
