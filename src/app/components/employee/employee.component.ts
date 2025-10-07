import { Component,inject } from '@angular/core';
import { EmployeeService } from '../../services/Employee/employee-service';
import { Employee } from '../../Modal/EmployeeModal';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-employee',
  imports: [CommonModule],
  templateUrl: './employee.component.html', 
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
employeedata:any;
  constructor() { }
  private employeeService = inject(EmployeeService);

  ngOnInit() {
    this.fetchEmployees();
  }

   fetchEmployees() {
    this.employeeService.getAllEmployee().subscribe({
      next: (employees: Employee[]) => {
        this.employeedata=employees
        console.log('phani',employees);
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
      }
    });
  }

}
