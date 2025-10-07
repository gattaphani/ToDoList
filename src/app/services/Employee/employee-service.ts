import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../../Modal/EmployeeModal';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = 'http://localhost:5000/employees'; 

  /** GET all employees */
  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/get-emp`);
  }

  /** GET single employee by id */
  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  /** CREATE a new employee */
  addEmployee(employee: Employee): Observable<Employee> {
    console.log('Adding employee:', employee);
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  /** UPDATE an existing employee (full replace) */
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
  }

  /** DELETE a employee by id */
  deleteEmployee(id: string | number): Observable<Employee> {
    return this.http.delete<Employee>(`${this.apiUrl}/${id}`);
  }
}
