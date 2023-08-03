import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ServerData } from '../server.model';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css'],
})
export class CockpitComponent {
  @Output()
  serverCreated = new EventEmitter<ServerData>();

  @Output('bpCreated')
  blueprintCreated = new EventEmitter<ServerData>();

  // newServerName = '';
  // newServerContent = '';

  @ViewChild('serverContentInput')
  serverContentInput!: ElementRef;

  onAddServer(name: string) {
    this.serverCreated.emit({
      serverName: name,
      serverContent: this.serverContentInput.nativeElement.value,
    });
  }

  onAddBlueprint(name: string) {
    this.blueprintCreated.emit({
      serverName: name,
      serverContent: this.serverContentInput.nativeElement.value,
    });
  }
}
