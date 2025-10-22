import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeStore } from '../../store/EmployeeStore';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule,ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
  providers: [EmployeeStore]
})
export class AddEmployeeComponent {


  private formBuilder = inject(FormBuilder);
  private employeeStore = inject(EmployeeStore);
  isEditMode: boolean = false;
  EmployeeForm!: FormGroup;
  editingId: string | number = ''; // if 0 means "not set"
  constructor() {
    this.EmployeeForm = this.formBuilder.group({
      _id: [''],
      name: [''],
      position: [''],
      department: [''],
      salary: ['']
    });
    this.employeeStore.loadEmployeeList();
  }

  // Observables
  employeeList$ = this.employeeStore.employeeList$;
  error$ = this.employeeStore.error$;
  loading$ = this.employeeStore.loading$;

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);



  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        console.log('Editing employee with ID:', params['id']);
        this.isEditMode = true;
        this.editingId = params['id'];
        console.log('Editing ID set to:', typeof this.editingId);
        this.employeeList$.subscribe(employees => {
          console.log('Current employees:', employees);
          const employee = employees.find(e => e._id && e._id === this.editingId);
          console.log('Found employee:', employee, this.editingId);
          if (employee?._id) {
            this.EmployeeForm.patchValue({
              name: employee.name,
              position: employee.position,
              department: employee.department,
              salary: employee.salary,
              _id: employee._id  // Ensure ID is set in form value
            });
          }
        });
      }
    });
  }

  // getEmployeeById(id: string) {
  //   // Implement logic to fetch employee by ID, e.g., call a service method
  //   // For example:
  //   this.employeeStore.getEmployeeById(id).subscribe(employee => {
  //     if (employee) {
  //       this.isEditMode = true;
  //       this.editingId = employee.id;
  //       this.EmployeeForm.patchValue(employee);

  //     } else {
  //       console.log('Employee not found');
  //     }
  //   })
  // }

  onSubmit() {
    if (this.editingId && !this.isEditMode) {
      const formData = this.EmployeeForm.value;
      console.log('Form Data:', formData);
      this.employeeStore.addEmployee(formData);
      this.EmployeeForm.reset();
      this.router.navigate(['/list-employee']);
      // Handle form submission, e.g., send data to a service
    } else if (this.isEditMode) {
      const formData = this.EmployeeForm.value;
      console.log('Updating Employee:', formData);
      this.employeeStore.updateEmployee(formData);
      this.router.navigate(['/list-employee']);
    } else {
      console.log('Form is invalid');
    }
  }

}
