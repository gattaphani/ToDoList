import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDoList } from '../Modal/ToDoListModal';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private readonly apiUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  /** GET all todos */
  getToDos(): Observable<ToDoList[]> {
    return this.http.get<ToDoList[]>(this.apiUrl);
  }

  /** GET single todo by id */
  getToDo(id: number): Observable<ToDoList> {
    return this.http.get<ToDoList>(`${this.apiUrl}/${id}`);
  }

  /** CREATE a new todo */
  addToDo(todo: ToDoList): Observable<ToDoList> {
    return this.http.post<ToDoList>(this.apiUrl, todo);
  }

  /** UPDATE an existing todo (full replace) */
  updateToDo(todo: ToDoList): Observable<ToDoList> {
    return this.http.put<ToDoList>(`${this.apiUrl}/${todo.id}`, todo);
  }

  /** DELETE a todo by id */
  deleteToDo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
