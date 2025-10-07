import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const employeeInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  console.log('HTTP Request:', req); // Logs the outgoing request

  return next(req).pipe(
    tap({
      next: event => console.log('HTTP Response:', event), // Logs the response
      error: error => console.error('HTTP Error:', error)  // Logs any error
    })
  );
};

