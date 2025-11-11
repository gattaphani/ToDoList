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
        path: 'counter',
        loadComponent: () => import('../app/components/counter/counter.component').then((m) => m.CounterComponent),
    },
    {
        path: 'employee',
        loadComponent: () => import('../app/components/employee/employee.component').then((m) => m.EmployeeComponent),
    },
    {
        path: 'add-employee',
        loadComponent: () => import('../app/components/add-employee/add-employee.component').then((m) => m.AddEmployeeComponent),
    },
    {
        path: 'add-employee/:id',
        loadComponent: () => import('../app/components/add-employee/add-employee.component').then((m) => m.AddEmployeeComponent),
    },
    {
        path: 'list-employee',
        loadComponent: () => import('../app/components/list-employee/list-employee.component').then((m) => m.ListEmployeeComponent),
    },
     {
        path: 'list-courses',
        loadComponent: () => import('../app/components/list-courses/list-courses.component').then((m) => m.ListCoursesComponent),
    },
    {
        path: '', redirectTo: 'add-todo', pathMatch: 'full'
    },
    {
        path: '**', redirectTo: 'add-todo'
    },
];
