import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ToDoList } from '../Modal/ToDoListModal';
import { exhaustMap, Observable, of } from 'rxjs';

import { tapResponse } from '@ngrx/operators';
import { ToDoService } from '../services/ToDo/to-do.service';
import { Employee } from '../Modal/EmployeeModal';
import { EmployeeService } from '../services/Employee/employee-service';

export interface EmployeeState {
  employeeList: Employee[];
  loading: boolean;
  error: string | null;
}

@Injectable()
export class EmployeeStore extends ComponentStore<EmployeeState> {

  private employeeService = inject(EmployeeService);

  constructor() {
    super({ employeeList: [], loading: false, error: null });
  }

  readonly employeeList$ = this.select(state => state.employeeList);
  readonly loading$ = this.select(state => state.loading);
  readonly error$ = this.select(state => state.error);

  /**
   * LOAD (Read all employees)
   */
  readonly loadEmployeeList = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(
      exhaustMap(() => {
        this.patchState({ loading: true, error: null });
        return this.employeeService.getAllEmployee().pipe(
          tapResponse(
            (employees: Employee[]) => this.patchState({
              employeeList: employees,
              loading: false,
              error: null
            }),
            (error: any) => this.patchState({
              loading: false,
              error: error?.message ?? 'Unknown error'
            })
          )
        );
      })
    )
  );

    /** GET single employee by id */
  readonly getEmployeeById = this.effect((id$: Observable<string>) =>
    id$.pipe(
      exhaustMap(id => {    
        this.patchState({ loading: true, error: null });
        return this.employeeService.getEmployeeById(id).pipe(
          tapResponse(
            (employee: Employee) => {   
                this.patchState({
                    loading: false,
                    error: null
                    });
                return employee;
            },
            (error: any) => this.patchState({
              loading: false,
                error: error?.message ?? 'Unknown error'
            }))
        );
      })
    )
  );

  /**
   * CREATE (Add new employee)
   */
  readonly addEmployee = this.effect((employee$: Observable<Employee>) =>
    employee$.pipe(
      exhaustMap(employee => {
        this.patchState({ loading: true, error: null });
        return this.employeeService.addEmployee(employee).pipe(
          tapResponse(
            (savedEmployee: Employee) => this.patchState(state => ({
              employeeList: [...state.employeeList, savedEmployee],
              loading: false,
              error: null
            })),
            (error: any) => this.patchState({
              loading: false,
              error: error?.message ?? 'Unknown error'
            })
          )
        );
      })
    )
  );

  /**
   * UPDATE
   */
  readonly updateEmployee = this.effect((employee$: Observable<Employee>) =>
    employee$.pipe(
      exhaustMap(employee => {
        this.patchState({ loading: true, error: null });
        return this.employeeService.updateEmployee(employee).pipe(
          tapResponse(
            (updatedEmployee: Employee) => this.patchState(state => ({
              employeeList: state.employeeList.map(e =>
                e._id === updatedEmployee._id ? updatedEmployee : e
              ),
              loading: false,
              error: null
            })),
            (error: any) => this.patchState({
              loading: false,
              error: error?.message ?? 'Unknown error'
            })
          )
        );
      })
    )
  );

  /**
   * DELETE
   */
  readonly deleteEmployee = this.effect((id$: Observable<string | number>) =>
    id$.pipe(
      exhaustMap((id:number|string) => {
        this.patchState({ loading: true, error: null });
        return this.employeeService.deleteEmployee(id).pipe(
          tapResponse(
            () => this.patchState(state => ({
              employeeList: state.employeeList.filter(e => e._id !== id),
              loading: false,
              error: null
            })),
            (error: any) => this.patchState({
              loading: false,
              error: error?.message ?? 'Unknown error'
            })
          )
        );
      })
    )
  );

}
