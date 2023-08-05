import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Server } from '../server.model';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
})
export class ServerElementComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterContentChecked,
    OnDestroy
{
  //  @Input('srvElement')
  //  element!: Server;

  @Input()
  name!: string;

  constructor() {
    console.log('constructor called!');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called!');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called!');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called!');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called!');
  }

  ngDoCheck(): void {
    console.log('ngDoCheck called!');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called!', changes);
  }

  ngOnInit() {
    console.log('ngOnInit called!');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called!');
  }
}
