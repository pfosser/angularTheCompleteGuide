import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import {
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { tap } from 'rxjs';

function loggingInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  console.log('[Outgoing Request]');
  console.log(request);
  return next(request).pipe(
    tap({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          console.log('[Incomping Response]');
          console.log(event.status);
          console.log(event.body);
        }
      },
    })
  );
  // const req = request.clone({
  //   headers: request.headers.set('X-DEBUG', 'TESTING'),
  // });
  // return next(req);
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([loggingInterceptor]))],
}).catch((err) => console.error(err));
