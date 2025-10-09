import { Component,inject } from '@angular/core';
import { EmployeeService } from '../../services/Employee/employee-service';
import { Employee } from '../../Modal/EmployeeModal';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-employee',
  imports: [CommonModule, IonicModule],
  templateUrl: './employee.component.html', 
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
employeedata:any;
loading:boolean=false;
error:any;

  constructor() { }
  private employeeService = inject(EmployeeService);

  ngOnInit() {
    this.fetchEmployees();
  }

   fetchEmployees() {
    this.loading = true;
    this.employeeService.getAllEmployee().subscribe({
      next: (employees: Employee[]) => {
        this.loading = false;
        this.employeedata=employees
        console.log('phani',employees);
      },
      error: (error) => {
        this.loading = false;
        this.error = error;
        console.error('Error fetching employees:', error);
      }
    });
  }

  // deleteEmployee(employee: Employee): void {
  //   console.log('Deleting employee with ID:', employee, employee._id); 
  //   if (employee._id) {
  //     this.employeeService.deleteEmployee(employee._id).subscribe({
  //       next: () => {
  //         console.log('Employee deleted successfully');
  //         this.fetchEmployees(); // Refresh the list after deletion
  //       },
  //       error: (error) => {
  //         console.error('Error deleting employee:', error);
  //       }
  //     });
  //   }
  // }

  editEmployee(employee: Employee): void {
    console.log('Editing employee with ID:', employee);
    // Implement navigation to edit form or open a modal for editing
    // For example, you might use a router to navigate to an edit page
    // this.router.navigate(['/edit-employee', employee._id]);
  }

  // updateEmployee(employee: Employee): void {
  //   console.log('Updating employee with ID:', employee);
  //   // Implement the update logic here
  //   if (employee) {
  //     this.employeeService.updateEmployee(employee).subscribe({
  //       next: () => {
  //         console.log('Employee updated successfully');
  //         this.fetchEmployees(); // Refresh the list after update
  //       },
  //       error: (error) => {
  //         console.error('Error updating employee:', error);
  //       }
  //     });
  //   }
  // }

  ngOnDestroy() {
    // Clean up subscriptions or resources if needed
  }

}