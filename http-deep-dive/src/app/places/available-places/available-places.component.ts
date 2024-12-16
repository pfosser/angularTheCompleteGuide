import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Place } from '../place.model';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);

  isFetching = signal(false);

  private httpClient = inject(HttpClient);

  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<{ places: Place[] }>(
        'http://localhost:3000/places' /*,
        {
          // observe: 'response'
          observe: 'events'
          // when observing events: you get notified of various
          // events that occur during the lifecycle of the
          // request
        }*/
      )
      .pipe(map((resData) => resData.places))
      .subscribe({
        next: (places) => {
          //console.log(response);
          // console.log(response.body?.places); // if observing response
          this.places.set(places);
        },
        complete: () => {
          this.isFetching.set(false);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
