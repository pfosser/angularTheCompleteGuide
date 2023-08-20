import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from './servers.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {
  public servers: { id: number; name: string; status: string }[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serversService: ServersService
  ) {}

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    // With only the first parameter, this works both using a relative ('servers') and an absolute
    // ('/servers') path, because the navigate() method doesn't know which route you are currently
    // on and the default behavior is to consider the given paths relative to the root domain.
    // Giving the { relativeTo: this.route } param, the app is broken because it tries to load the
    // path servers/servers
    // this.router.navigate(['servers'], { relativeTo: this.route });
  }
}
