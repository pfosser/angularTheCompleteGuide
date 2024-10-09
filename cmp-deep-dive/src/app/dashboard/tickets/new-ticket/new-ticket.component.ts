import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  output,
  ViewChild,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ControlComponent, ButtonComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent implements OnInit, AfterViewInit {
  // the selector can be a template variable
  @ViewChild('form') form?: ElementRef<HTMLFormElement>;
  // From v17.3
  // private form = viewChild<ElementRef<HTMLFormElement>>('form');
  //private form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  add = output<{ title: string; text: string }>();

  ngOnInit(): void {
    console.log('ON INIT');
    // console.log(this.form().nativeElement);
    console.log(this.form?.nativeElement);
  }

  // one possibility is to pass the form through a template variable
  // onSubmit(title: string, text: string, form: HTMLFormElement) {
  onSubmit(title: string, text: string) {
    this.add.emit({ title, text });
    this.form?.nativeElement.reset();
    // this.form()?.nativeElement.reset();
  }

  ngAfterViewInit(): void {
    // Here you are guaranteed to have access to @ViewChild elements.
    // With the viewChild() function instead the access is available
    // also in OnInit
    console.log('AFTER VIEW INIT');
    // console.log(this.form().nativeElement);
    console.log(this.form?.nativeElement);
  }
}
