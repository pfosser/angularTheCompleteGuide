import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
// import { AnalyticsService } from './app/shared/analytics.service';
import { environment } from './environments/environment';
import { AppRoutingModule } from './app/app-routing.module';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    // Equivalent to specifying { providedIn: 'root' } in the service decorator
    //AnalyticsService

    // This makes our standalone root component
    // aware of our routes and makes the overall
    // Angular application aware of our routes
    importProvidersFrom(AppRoutingModule),
  ],
});
// So lazy loading works just fine here and it's also worth
// noting that all of that works in an application
// in an Angular app where many components including
// the root component, are actually standalone components.
// So app component is a standalone component and nonetheless
// by connecting our routing setup like this, we are able
// to use routing with our app-routing.module and with a couple
// of components that are not standalone components at all:
// dashboard, today, and about are not standalone components.
