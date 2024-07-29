import { Injectable } from '@angular/core';

// @Injectable({ providedIn: 'root' })
export class LoggingService {
  lastlog?: string;

  printLog(message: string) {
    console.log(message);
    console.log(this.lastlog);
    this.lastlog = message;
  }
}

// Note. For a service, using @Injectable({ providedIn: 'root' }) is equivalent to
// providing it in the app module or to providing it in an eagerly loaded module (e.g.
// the Core module).
// If it is provided in a lazy loaded module, that creates a separate instance.
// Attention must be paid because also services provided in modules imported by
// a lazy loaded module, have a distinct instance.

// The rule of thumb is that you provide services through @Injectable
// or in the app module.  If you do it differently, you should have a strong reason
// and you should either be able to rule out that this module
// you're adding the service in is loaded lazily
// or you deliberately want multiple instances.
