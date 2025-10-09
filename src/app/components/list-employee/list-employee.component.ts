import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeStore } from '../../store/EmployeeStore';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-list-employee',
  imports: [CommonModule, IonicModule],
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.scss',
  providers: [EmployeeStore]
})
export class ListEmployeeComponent {


  private formBuilder = inject(FormBuilder);
  private employeeStore = inject(EmployeeStore);
  isEditMode: boolean = false;
  EmployeeForm!: FormGroup;
  editingId: string | number = ''; // if 0 means "not set"
  constructor() {
    this.EmployeeForm = this.formBuilder.group({
      id: [''],
      name: [''],
      position: [''],
      department: ['']
    });
  }

  // Observables
  employeeList$ = this.employeeStore.employeeList$;
  error$ = this.employeeStore.error$;
  loading$ = this.employeeStore.loading$;

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  


  ngOnInit() {
    this.employeeStore.loadEmployeeList();
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        console.log('Editing employee with ID:', params['id']);
        this.isEditMode = true;
        this.editingId = params['id'];
        console.log('Editing ID set to:', typeof this.editingId);
      }
    });
  }

  getEmployeeById(id: string) {
    // Implement logic to fetch employee by ID, e.g., call a service method
    // For example:
    this.employeeStore.getEmployeeById(id);
    this.router.navigate(['/add-employee', id]);
    // .subscribe(employee => {
    //   if (employee) {
    //     this.isEditMode = true;
    //     this.editingId = employee.id;
    //     this.EmployeeForm.patchValue(employee);
    //   } else {
    //     console.log('Employee not found');
    //   }
    // })
  }

  onSubmit() {
    if (this.EmployeeForm.valid) {
      const formData = this.EmployeeForm.value;
      console.log('Form Data:', formData);
      this.employeeStore.addEmployee(formData);
      this.EmployeeForm.reset();
      // Handle form submission, e.g., send data to a service
    } else if (this.isEditMode) {
      const formData = this.EmployeeForm.value;
      console.log('Updating Employee:', formData);
      this.employeeStore.updateEmployee(formData);
    } else {
      console.log('Form is invalid');
    }
  }

  updateEmployee(employee: any) {
    this.employeeStore.updateEmployee(employee);
    this.router.navigate(['/add-employee', employee._id]);
  }

  deleteEmployee(id:any) {
    this.employeeStore.deleteEmployee(id);
  }
}
