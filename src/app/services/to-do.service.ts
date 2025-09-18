import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ToDoList } from '../Modal/ToDoListModal';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private readonly apiUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  /** GET all todos */
 getToDos(): Observable<ToDoList[]> {
  return this.http.get<ToDoList[]>(this.apiUrl)
  // .pipe(
  //   map((todos, index) =>
  //     todos.map((todo, i) => ({
  //       ...todo,
  //       id: todo.id ?? i + 1
  //     }))
  //   )
  // );
}


  /** GET single todo by id */
  getToDo(id: string): Observable<ToDoList> {
    return this.http.get<ToDoList>(`${this.apiUrl}/${id}`);
  }

  /** CREATE a new todo */
  addToDo(todo: ToDoList): Observable<ToDoList> {
    console.log('Adding todo:', todo);
    return this.http.post<ToDoList>(this.apiUrl, todo);
  }

  /** UPDATE an existing todo (full replace) */
  updateToDo(todo: ToDoList): Observable<ToDoList> {
    return this.http.put<ToDoList>(`${this.apiUrl}/${todo.id}`, todo);
  }

  /** DELETE a todo by id */
  deleteToDo(id: string|number): Observable<ToDoList> {
    return this.http.delete<ToDoList>(`${this.apiUrl}/${id}`);
  }
}
