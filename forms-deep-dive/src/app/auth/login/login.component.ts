import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

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
  private form = viewChild.required<NgForm>('form');

  private destroyRef = inject(DestroyRef);

  constructor() {
    // Register a function that should be executed once, once this component
    // has been rendered for the first time.
    // And I'm using afterNextRender because this form, since we're using the
    // template-driven approach, is created with help of the template.  So
    //  it's only after the template rendering that this form is fully initialized.
    afterNextRender(() => {
      const savedForm = window.localStorage.getItem('saved-login-form');
      if (savedForm) {
        const loadedFormData = JSON.parse(savedForm);
        const savedEmail = loadedFormData.email;
        // the timer is to wait for the full init of the
        // control
        setTimeout(() => {
          this.form().setValue({
            email: savedEmail,
            password: '',
          });
          // Or if wanting to target a specific control
          //   this.form().controls['email'].setValue(savedEmail);
        }, 1);
      }
      const subscription = this.form()
        .valueChanges?.pipe(debounceTime(500))
        .subscribe({
          next: (value) => {
            window.localStorage.setItem(
              'saved-login-form',
              JSON.stringify({
                email: value.email,
              }),
            );
          },
        });
      this.destroyRef.onDestroy(() => {
        subscription?.unsubscribe();
      });
    });
  }

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }

    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;

    console.log(formData.form);
    console.log(enteredEmail, enteredPassword);

    formData.form.reset();
  }
}
