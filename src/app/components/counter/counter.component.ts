import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { counterSelector, toggleSelector } from '../../store/counter.selector';
import { addValue, decrement, increment, reset, toggle } from '../../store/counter.actions';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-counter',
  standalone: true,
  providers: [Store],
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {
  counter: number = 0;
  counterSubscription$: Subscription | null = null;
  toggleSubscription$: Subscription | null = null;
  toggleState: boolean = false;
  inputValue: number = 0;
  showInput: boolean = false;
  private readonly store = inject(Store);
  counter$: Observable<number> = this.store.select(counterSelector);
  // select the toggle boolean from the store state directly (avoid selecting the action creator)
  toggle$: Observable<boolean> = this.store.select(toggleSelector); // <-- use selector, not the action creator
  ngOnInit() {
    this.counterSubscription$ = this.counter$.subscribe((count) => {
      this.counter = count;
      console.log('count:', count);
    });
    this.toggleSubscription$ = this.toggle$.subscribe((toggle) => {
      this.toggleState = toggle;
      console.log('toggle:', toggle);
    });
  }

  onIncrement() {
    this.store.dispatch(increment());
    console.log('Increment action dispatched', this.store, increment());
  }

  onDecrement() {
    this.store.dispatch(decrement());
    console.log('Decrement action dispatched', this.store, decrement());
  }

  onReset() {
    this.store.dispatch(reset());
    console.log('Reset action dispatched', this.store, reset());
  }

  onAddValue(value: number) {
    const parsedValue = Number(value);
    if (!isNaN(parsedValue)) {
      console.log('Adding value:', addValue({ value: parsedValue }), parsedValue);
      this.store.dispatch(addValue({ value: parsedValue }));
    }
  }
  onToggleInput() {
    this.showInput = !this.showInput;
    console.log('Toggling input field visibility:', this.showInput, toggle({ toggleValue: this.showInput }));
    this.store.dispatch(toggle({ toggleValue: this.showInput }));
  }


  ngOnDestroy() {
    if (this.counterSubscription$) {
      this.counterSubscription$.unsubscribe();
    }
    if (this.toggleSubscription$) {
      this.toggleSubscription$.unsubscribe();
    }   
  } 
}
