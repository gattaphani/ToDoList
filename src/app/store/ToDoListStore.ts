import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ToDoList } from '../Modal/ToDoListModal';
import { exhaustMap, Observable, of } from 'rxjs';
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

  /**
   * LOAD (Read all todos)
   */
  readonly loadToDoList = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(
      exhaustMap(() => {
        this.patchState({ loading: true, error: null });
        return this.todoService.getToDos().pipe(
          tapResponse(
            (todos: ToDoList[]) => this.patchState({
              todolist: todos,
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

  /**
   * CREATE (Add new todo)
   */
  readonly addToDo = this.effect((todo$: Observable<ToDoList>) =>
    todo$.pipe(
      exhaustMap(todo => {
        this.patchState({ loading: true, error: null });
        return this.todoService.addToDo(todo).pipe(
          tapResponse(
            (savedTodo: ToDoList) => this.patchState(state => ({
              todolist: [...state.todolist, savedTodo],
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
  readonly updateToDo = this.effect((todo$: Observable<ToDoList>) =>
    todo$.pipe(
      exhaustMap(todo => {
        this.patchState({ loading: true, error: null });
        return this.todoService.updateToDo(todo).pipe(
          tapResponse(
            (updatedTodo: ToDoList) => this.patchState(state => ({
              todolist: state.todolist.map(t =>
                t.id === updatedTodo.id ? updatedTodo : t
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
  readonly deleteToDo = this.effect((id$: Observable<string | number>) =>
    id$.pipe(
      exhaustMap((id:number|string) => {
        this.patchState({ loading: true, error: null });
        return this.todoService.deleteToDo(id).pipe(
          tapResponse(
            () => this.patchState(state => ({
              todolist: state.todolist.filter(t => t.id !== id),
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
