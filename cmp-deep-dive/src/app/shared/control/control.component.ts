import {
  Component,
  contentChild,
  ContentChild,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  // This should be the preferred way now
  // host: {
  //   class: 'control',
  //   '(click)': 'onClick()',
  // },
})
export class ControlComponent {
  // This now exists for compatibility reasons
  // @HostBinding('class') className = 'control';

  label = input.required<string>();

  // ElementRef is a generic type that can refer to any element
  // on the page, but by injecting it into a component like this,
  // Angular will give you access to the host element of that
  // component
  private el = inject(ElementRef);

  // @ContentChild('input') private control?: ElementRef<
  //   HTMLInputElement | HTMLTextAreaElement
  // >;
  // v17.3
  private control =
    contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

  // @HostListener('click')
  onClick() {
    console.log('Clicked!');
    console.log(this.el);
    console.log(this.control());
  }
}
