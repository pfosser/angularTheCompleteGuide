import { Component } from '@angular/core';
import { Server } from './server.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  serverElements: Server[] = [
    { type: 'server', name: 'Testserver', content: 'Just a test!' },
  ];
}
