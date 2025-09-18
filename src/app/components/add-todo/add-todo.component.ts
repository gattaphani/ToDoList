import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ToDoListStore } from '../../store/ToDoListStore';
import { ToDoList } from '../../Modal/ToDoListModal';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule],
  providers: [ToDoListStore],
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  todoForm: FormGroup;
  isEditMode: boolean = false;
  editingId: string | number = ''; // if 0 means "not set"
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
      id: [''], // optional, backend will assign
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
        console.log('Editing ID set to:', typeof this.editingId);
        this.todolist$.subscribe(todos => {
          console.log('Current todos:', todos);
          const todo = todos.find(t => t.id && t.id === this.editingId);
          console.log('Found todo:', todo, this.editingId);
          if (todo?.id) {
            this.todoForm.patchValue({
              title: todo.title,
              description: todo.description,
              date: todo.date,
              status: todo.status,
              id: todo.id  // Ensure ID is set in form value
            });
          }
          console.log('Form patched with todo:', this.todoForm.value);
        });
      } else {
        this.isEditMode = false;
      }
    });

  }


  onSubmit(): void {
    if (this.todoForm.invalid) {
      this.todoForm.markAllAsTouched();
      return;
    }
    const todoData = this.todoForm.getRawValue();
    console.log('Form submitted with data:', todoData);

    if (this.isEditMode && this.editingId != null) {
      // UPDATE → attach id
      const updatedTodo = { ...todoData, id: this.editingId };
      this.todolistStore.updateToDo(updatedTodo);
      this.router.navigate(['/list-todo', this.editingId]);
    } else {
      // CREATE → remove id if it exists (defensive coding)
      const { id, ...newTodo } = todoData;  // destructure id out
      this.todolistStore.addToDo(newTodo);
      this.router.navigate(['/list-todo']);
    }

    this.resetForm();
  }


  resetForm(): void {
    this.todoForm.reset();
    this.isEditMode = false;
    // this.editingId = '';
  }
}
