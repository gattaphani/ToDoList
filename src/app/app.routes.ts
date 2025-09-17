import { Routes } from '@angular/router';

export const routes: Routes = [
     {
        path: 'add-todo/:id',
        loadComponent: () => import('../app/components/add-todo/add-todo.component').then((m) => m.AddTodoComponent),
    },
    {
        path: 'add-todo',
        loadComponent: () => import('../app/components/add-todo/add-todo.component').then((m) => m.AddTodoComponent),
    },
     {
        path: 'list-todo/:id',
        loadComponent: () => import('../app/components/list-todo/list-todo.component').then((m) => m.ListTodoComponent),
    },
    {
        path: 'list-todo',
        loadComponent: () => import('../app/components/list-todo/list-todo.component').then((m) => m.ListTodoComponent),
    },
    {
        path: '', redirectTo: 'add-todo', pathMatch: 'full'
    },
    {
        path: '**', redirectTo: 'add-todo'
    },
];
