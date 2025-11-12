import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseState } from '../../Modal/courseModal';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
   private readonly apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  /** GET all courses */
  getCourses(): Observable<CourseState[]> {
    return this.http.get<CourseState[]>(this.apiUrl);
  }

  /** GET courses by userId */
  getCoursesByUserId(userId: string): Observable<CourseState[]> {
    return this.http.get<CourseState[]>(`${this.apiUrl}?userId=${userId}`);
  }

  /** GET single course by id */
  getCourse(id: string): Observable<CourseState> {
    return this.http.get<CourseState>(`${this.apiUrl}/${id}`);
  }

  /** CREATE a new course */
  addCourse(course: CourseState): Observable<CourseState> {
    console.log('Adding course:', course);
    return this.http.post<CourseState>(this.apiUrl, course);
  }


   /** UPDATE an existing course (full replace) */
   updateCourse(course: CourseState): Observable<CourseState> {
    console.log(course.id)
     return this.http.put<CourseState>(`${this.apiUrl}/${course.id}`, course);
   }

  /** DELETE a course by id */
  deleteCourse(id: string|number): Observable<CourseState> {
    return this.http.delete<CourseState>(`${this.apiUrl}/${id}`);
  }
}
