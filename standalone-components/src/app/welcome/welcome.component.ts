import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  // the current component must be standalone too for this to work
  // imports: [DetailsComponent],
})
export class WelcomeComponent {}
