import { Directive } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
})
export class SafeLinkDirective {
  constructor() {
    console.log('SageLinkDirective is active');
  }

  onConfirmLeavePage(event: MouseEvent) {
    if (!window.confirm('Do you want to leave the app?')) {
      event.preventDefault();
    }
  }
}
