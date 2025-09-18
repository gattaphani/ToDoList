import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ToDoListStore } from '../../store/ToDoListStore';
import { ToDoList } from '../../Modal/ToDoListModal';
import { Router } from '@angular/router';
@Component({
    selector: 'app-list-todo',
    imports: [IonicModule, CommonModule],
    providers: [ToDoListStore],
    templateUrl: './list-todo.component.html',
    standalone: true,
    styleUrl: './list-todo.component.scss'
})
export class ListTodoComponent {

    todolistStore = inject(ToDoListStore);
    router = inject(Router);
    // Observables
    error$ = this.todolistStore.error$;
    loading$ = this.todolistStore.loading$;
    todolist$ = this.todolistStore.todo$;

    ngOnInit(): void {
        console.log('ListTodoComponent initialized');
        this.todolistStore.loadToDoList();
        // this.todolist$.subscribe(todos => {
        //     console.log('Current todos:', todos);
        // });
    }


    deleteToDo(todo: ToDoList): void {
        console.log('Deleting todo with ID:', todo, todo.id);
        if (todo.id) {
            this.todolistStore.deleteToDo(todo.id);
        }
    }
    editToDo(todo: ToDoList): void {
        console.log('Editing todo with ID:', todo.id);
        if (todo.id) {
            this.router.navigate(['/add-todo', todo.id]);
        }
    }
}
