import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../../Modal/EmployeeModal';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  constructor(private http: HttpClient) {}

  private readonly apiUrl = 'http://localhost:5000/employees';

  /** GET all employees */
 getAllEmployee(): Observable<Employee[]> {
  return this.http.get<Employee[]>(this.apiUrl)
}

  /** GET todos by userId */
  getToDosByUserId(userId: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}?userId=${userId}`);
  }
  
  /** GET single todo by id */
  getToDo(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  /** CREATE a new todo */
  addToDo(todo: Employee): Observable<Employee> {
    console.log('Adding todo:', todo);
    return this.http.post<Employee>(this.apiUrl, todo);
  }

  /** UPDATE an existing todo (full replace) */
  updateToDo(todo: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${todo.id}`, todo);
  }

  /** DELETE a todo by id */
  deleteToDo(id: string|number): Observable<Employee> {
    return this.http.delete<Employee  >(`${this.apiUrl}/${id}`);
  }
}
