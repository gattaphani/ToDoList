import { Component } from '@angular/core';
import { getCourses } from '../../store/courses.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { courseSelector } from '../../store/courses.selector';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-list-courses',
  imports: [CommonModule,IonicModule ],
  standalone: true,
  templateUrl: './list-courses.component.html',
  styleUrl: './list-courses.component.scss'
})
export class ListCoursesComponent {
  courses$: Observable<any> = this.store.select(courseSelector);

constructor(private store: Store) {}
ngOnInit() {
  // Component initialization logic
  
  this.store.dispatch(getCourses());
  this.courses$.subscribe(data => {
    console.log('Courses data from store:', data);
  });
 
  // console.log('Dispatched getCourses action', getCourses(), this.store.select(courseSelector));
}
// getCourses() {
//   this.store.dispatch(getCourses());
//    this.courses$.subscribe(data => {
//     console.log('Courses data from store:', data);
//   });
//   console.log('Dispatched getCourses action from button', getCourses());
// }
}
