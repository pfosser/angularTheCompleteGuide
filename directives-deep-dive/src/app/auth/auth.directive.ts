import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true,
})
export class AuthDirective {
  userType = input.required<Permission>({ alias: 'appAuth' });

  private authService = inject(AuthService);

  /* when injecting a templateref, you tell Angular
     that this directive will be used on an ng-template element
     and that you wanna get hold of that template and
     therefore implicitly also of the content inside of
     that template, which by the way doesn't have
     to be a single element. */
  private templateRef = inject(TemplateRef);

  /* This view container ref in the end is a reference
     to the place in the DOM where this template is being used. */
  private viewContainerRef = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }
}
