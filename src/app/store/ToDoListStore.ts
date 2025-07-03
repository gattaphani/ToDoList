import { Injectable, inject } from '@angular/core';
import { ComponentStore} from '@ngrx/component-store';
// import { tapResponse } from '@ngrx/operators';
// import { MovieService } from './movie.service';
import { ToDoList } from '../Modal/ToDoListModal';
import { exhaustMap, Observable } from 'rxjs';
import { ToDoService } from '../services/to-do.service';
import { tapResponse } from '@ngrx/operators';

export interface ToDoListState {
    todolist: ToDoList[];
    loading: boolean;
    error: string | null;
}

@Injectable()
export class ToDoListStore extends ComponentStore<ToDoListState> {
    private todoService = inject(ToDoService);

    constructor() {
        super({ todolist: [], loading: false, error: null });
    }

    readonly todo$ = this.select(state => state.todolist);
    readonly loading$ = this.select(state => state.loading);
    readonly error$ = this.select(state => state.error);

    // readonly addToDoList = this.effect((todo$: Observable<ToDoList>) =>
    //     todo$.pipe(
    //         exhaustMap(todo => {
    //             debugger
    //             console.log(todo)
    //             this.patchState({ loading: true, error: null });
    //             return this.todoService.addToDo(todo).pipe(
    //                 tapResponse(
    //                     (savedtodo: ToDoList) => {
    //                         this.patchState(state => ({
                                
    //                             todo$: [...state.todolist, savedtodo],
    //                             loading: false,
    //                             error: null
    //                         }));
    //                         todo$.subscribe((s:any)=>{
    //                         console.log(s)    
    //                         })
                          
    //                     },
    //                     (error: any) => {
    //                         this.patchState({
    //                             loading: false,
    //                             error: error?.message ?? 'Unknown error'
    //                         });
    //                     }
    //                 )
    //             );
    //         })
    //     )
    // );
readonly addToDoList = this.effect((todo$: Observable<ToDoList>) =>
  todo$.pipe(
    exhaustMap(todo => {
      this.patchState({ loading: true, error: null });
      return this.todoService.addToDo(todo).pipe(
        tapResponse(
          (savedtodo: ToDoList) => {
            this.patchState(state => ({
              todolist: [...state.todolist, savedtodo], // ✅ fixed here
              loading: false,
              error: null
            }));
          },
          (error: any) => {
            this.patchState({
              loading: false,
              error: error?.message ?? 'Unknown error'
            });
          }
        )
      );
    })
  )
);


}
