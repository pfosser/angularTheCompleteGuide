import { Component } from '@angular/core';

import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [WelcomeComponent, RouterModule],
})
export class AppComponent {}
