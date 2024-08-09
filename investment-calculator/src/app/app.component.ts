import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { InvestmentInput } from './investment-input.model';
import { UserInputComponent } from './user-input/user-input.component';
import { InvestmentResultsComponent } from './investment-results/investment-results.component';
import { InvestmentResult } from './investment-result.model';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, UserInputComponent, InvestmentResultsComponent],
})
export class AppComponent {
  resultData: InvestmentResult[] = [];

  onCalculateInvestmentResult($event: InvestmentInput) {
    console.log($event);
  }
}
