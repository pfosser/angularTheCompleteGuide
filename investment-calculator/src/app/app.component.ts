import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { InvestmentInput } from './investment-input.model';
import { UserInputComponent } from './user-input/user-input.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, UserInputComponent],
})
export class AppComponent {
  onCalculateInvestmentResult($event: InvestmentInput) {
    console.log($event);
  }
}
