import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDoList } from '../Modal/ToDoListModal';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  
   private readonly apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  addToDo(todo: ToDoList): Observable<ToDoList> {
    console.log(todo)
    return this.http.post<ToDoList>(this.apiUrl, todo);
  }
}
