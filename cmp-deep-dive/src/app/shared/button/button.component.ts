import { Component } from '@angular/core';

@Component({
  selector: 'button[appButton]',
  // This could also be a possibility
  // selector: 'button.button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {}
