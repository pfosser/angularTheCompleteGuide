import { Component, EventEmitter, Output } from '@angular/core';
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

  newServerName = '';

  newServerContent = '';

  onAddServer() {
    this.serverCreated.emit({
      serverName: this.newServerName,
      serverContent: this.newServerContent
    });
  }

  onAddBlueprint() {
    this.blueprintCreated.emit({
      serverName: this.newServerName,
      serverContent: this.newServerContent
    });
  }
}
