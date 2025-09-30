import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { CounterState } from '../../Modal/counter.state';
import { decrement, increment, reset } from '../../Modal/counter.actions';
import { Observable, Subscription } from 'rxjs';
import { log } from 'console';
import { selectCounterValue } from '../../Modal/counter.selector';

@Component({
  selector: 'app-counter',
  standalone: true,
  providers: [Store],
  imports: [CommonModule, IonicModule],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {
  counter: number = 0;
  counterSubscription$: Subscription | null = null;
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

  ngOnDestroy() {
    this.counterSubscription$?.unsubscribe();
  }
}

