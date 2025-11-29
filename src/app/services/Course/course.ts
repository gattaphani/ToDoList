import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../Modal/courseModal';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
   private readonly apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  /** GET all courses */
  getCoursesService(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  /** GET courses by userId */
  getCoursesByUserId(userId: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}?userId=${userId}`);
  }

  /** GET single course by id */
  getCourseService(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  /** CREATE a new course */
  addCourseService(course: Course): Observable<Course> {
    console.log('Adding course:', course);
    return this.http.post<Course>(this.apiUrl, course);
  }


   /** UPDATE an existing course (full replace) */
   updateCourseService(course: Course): Observable<Course> {
    console.log('Updating course with id:', course);
    console.log(course);
     return this.http.put<Course>(`${this.apiUrl}/${course?.id}`, course);
   }

  /** DELETE a course by id */
  deleteCourseService(id: string|number): Observable<Course> {
    return this.http.delete<Course>(`${this.apiUrl}/${id}`);
  }
}
