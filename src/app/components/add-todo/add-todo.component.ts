import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ToDoListStore } from '../../store/ToDoListStore';
import { ToDoList } from '../../Modal/ToDoListModal';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  providers: [ToDoListStore],
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  todoForm: FormGroup;
  isEditMode: boolean = false;
  editingId: any;

  // Observables
  error$ = this.todolistStore.error$;
  loading$ = this.todolistStore.loading$;
  todolist$ = this.todolistStore.todo$;

  constructor(private fb: FormBuilder, private todolistStore: ToDoListStore) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: [''], // optional
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.todolistStore.loadToDoList(); // Initial load
  }

  onSubmit(): void {
    if (this.todoForm.invalid) {
      this.todoForm.markAllAsTouched();
      return;
    }

    const todo: ToDoList = {
      ...this.todoForm.value,
      id: this.editingId ?? Date.now() // Use backend ID in real app
    };

    if (this.isEditMode) {
      this.todolistStore.updateToDo(todo);
    } else {
      this.todolistStore.addToDo(todo);
    }

    this.resetForm();
  }

  editToDo(todo: ToDoList): void {
    this.isEditMode = true;
    this.editingId = todo.id;
    this.todoForm.patchValue(todo);
  }

  deleteToDo(todo: ToDoList): void {
    if (todo.id != null) {
      this.todolistStore.deleteToDo(todo.id);
    }
  }

  resetForm(): void {
    this.todoForm.reset();
    this.isEditMode = false;
    this.editingId = null;
  }
}
