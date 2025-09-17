import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ToDoListStore } from '../../store/ToDoListStore';
import { ToDoList } from '../../Modal/ToDoListModal';
import { ActivatedRoute, Router } from '@angular/router';

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
  editingId: string  = ''; // if 0 means "not set"
  todolistStore = inject(ToDoListStore);

  // Observables
  error$ = this.todolistStore.error$;
  loading$ = this.todolistStore.loading$;
  todolist$ = this.todolistStore.todo$;
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: [''], // optional,
      id: [''], // optional,
      status: ['', Validators.required]
    });
    this.todolistStore.loadToDoList();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        console.log('Editing todo with ID:', params['id']);
        this.isEditMode = true;
        this.editingId = params['id'];
        this.todolist$.subscribe(todos => {
          console.log('Current todos:', todos);
          const todo = todos.find(t => t.id && t.id === this.editingId);
          console.log('Found todo:', todo);
          if (todo) {
            this.todoForm.patchValue(todo);
          }
        });
      } else {
        this.isEditMode = false;
      }
    });

  }

  // loadToDos(): void {
  //   this.todolistStore.loadToDoList();
  // }

  onSubmit(): void {
    if (this.todoForm.invalid) {
      this.todoForm.markAllAsTouched();
      return;
    }

    const todo: ToDoList = {
      ...this.todoForm.value,
      id: this.editingId ?? ''  // Use backend ID in real app
    };

    if (this.isEditMode) {
      this.todolistStore.updateToDo(todo);
      this.router.navigate(['/list-todo', this.editingId]);
    } else {
      this.todolistStore.addToDo(todo);
      this.router.navigate(['/list-todo']);
    }

    this.resetForm();
  }

  resetForm(): void {
    this.todoForm.reset();
    this.isEditMode = false;
    this.editingId = '';
  }
}
