import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectCounterValue } from '../../store/counter.selector';
import { addValue, decrement, increment, reset } from '../../store/counter.actions';
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
  inputValue: number = 0;
  private readonly store = inject(Store);
  counter$: Observable<number> = this.store.select(selectCounterValue);

  ngOnInit() {
    this.counterSubscription$ = this.counter$.subscribe((count) => {
      this.counter = count;
      console.log(count);
    });
  }

  onIncrement() {
    this.store.dispatch(increment());
  }

  onDecrement() {
    this.store.dispatch(decrement());
  }

  onReset() {
    this.store.dispatch(reset());
  }

  onAddValue(value: number) {
    const parsedValue = Number(value);
    if (!isNaN(parsedValue)) {
      console.log('Adding value:', addValue({ value: parsedValue }), parsedValue);
      this.store.dispatch(addValue({ value: parsedValue }));
    }
  }
}

