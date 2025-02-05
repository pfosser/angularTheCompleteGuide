import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  templateUrl: './dashboard.component.html',
  standalone: true,
  // To unlock all the directives used in the template
  imports: [RouterModule],
})
export class DashboardComponent {}
