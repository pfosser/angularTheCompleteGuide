import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { InvestmentResult } from '../investment-result.model';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent {
  private investmentService = inject(InvestmentService);

  // in this way the writable signal of the service is hidden.
  // The computed signal is readonly
  results = computed(() => this.investmentService.resultData());

  // Alternative
  // results = this.investmentService.resultData.asReadonly();
}
