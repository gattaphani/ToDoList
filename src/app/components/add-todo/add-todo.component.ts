import { Component } from '@angular/core';
import { ToDoListStore } from '../../store/ToDoListStore';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
// import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  providers: [ToDoListStore],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss'
})
export class AddTodoComponent {
   todoForm: FormGroup;
  currentDate: Date = new Date();

  error$ = this.todolistStore.error$;
  loading$ = this.todolistStore.loading$;
  movies$ = this.todolistStore.todo$;

  constructor(private fb: FormBuilder, private todolistStore: ToDoListStore) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: [false], // used with ion-checkbox
      status: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      this.todolistStore.addToDoList(this.todoForm.value);
      this.todoForm.reset({
        title: '',
        description: '',
        date: false,
        status: ''
      });
    } else {
      this.todoForm.markAllAsTouched(); // show validation errors if user tries to submit
    }
  }
}
