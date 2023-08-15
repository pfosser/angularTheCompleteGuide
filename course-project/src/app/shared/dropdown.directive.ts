import {
  ContentChild,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  private open: boolean = false;

  @HostListener('click') toggleOpen() {
    this.open = !this.open;
    if (this.open) {
      this.renderer.addClass(this.elRef.nativeElement.firstChild, 'show');
      this.renderer.addClass(this.elRef.nativeElement.lastChild, 'show');
    } else {
      this.renderer.removeClass(this.elRef.nativeElement.firstChild, 'show');
      this.renderer.removeClass(this.elRef.nativeElement.lastChild, 'show');
    }
  }

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
}
