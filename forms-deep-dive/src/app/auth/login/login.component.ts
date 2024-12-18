import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  // By importing this module, Angular registers a directive having
  // the form element as a selector, so Angular can control form elements.
  imports: [FormsModule],
})
export class LoginComponent {
  onSubmit(form: NgForm) {
    console.log(form);
  }
}
