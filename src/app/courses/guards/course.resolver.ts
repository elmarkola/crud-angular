import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  ResolveFn,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Resolve,
} from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { Course } from '../model/course';

@Injectable({ providedIn: 'root' })
export class CourseResolver implements Resolve<Course> {
  constructor(private service: CoursesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Course> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({ id: '', name: '', category: '' });
  }
}
