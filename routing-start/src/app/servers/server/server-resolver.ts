import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Server } from '../server-model';
import { ServersService } from '../servers.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServerResolver implements Resolve<Server> {
  constructor(private serverService: ServersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Server | Observable<Server> | Promise<Server> {
    return this.serverService.getServer(+route.params['id'])!;
  }
}
