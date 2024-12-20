import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    // this will tell Angular that this control is valid
    return null;
  }

  // you can structure this object however you want.
  // That's just a common convention that you have some kind of
  // descriptive error code that is set to true.
  return {
    doesNotContainQuestionMark: true,
  };
}

function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'test@example.com') {
    return of(null);
  }
  return of({ notUnique: true });
}

// This can be done because we're doing everything here
// in the component. It would not work if doing something
// serverside
let initialEmailValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');
if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl(initialEmailValue, {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        mustContainQuestionMark,
      ],
    }),
  });

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  ngOnInit(): void {
    // This is still possible
    // const savedForm = window.localStorage.getItem('saved-login-form');

    // if (savedForm) {
    //   const loadedForm = JSON.parse(savedForm);
    //   // This is possible
    //   // this.form.controls.email.setValue(loadedForm);
    //   // This you can do with reactive forms
    //   this.form.patchValue({
    //     email: loadedForm.email,
    //   });
    // }

    const subscription = this.form.valueChanges
      .pipe(debounceTime(500))
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

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSubmit() {
    console.log(this.form);
    // with reactive form you have the advantage that Angular understands
    // the structure of your form and there is better typing support
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail, enteredPassword);
  }
}
