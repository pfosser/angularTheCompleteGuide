import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rect',
  standalone: true,
  imports: [],
  templateUrl: './rect.component.html',
  styleUrl: './rect.component.css',
})
export class RectComponent {
  // size = input.required<{ width: string; height: string }>();
  @Input() size!: { width: string; height: string };

  // sizeChanged = output<{ width: string; height: string }>();
  @Output() sizeChange = new EventEmitter<{ width: string; height: string }>();

  onReset() {
    this.sizeChange.emit({
      width: '200',
      height: '100',
    });
  }
}
