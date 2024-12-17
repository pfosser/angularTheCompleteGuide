import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { HttpClient } from '@angular/common/http';
import { map, catchError, throwError } from 'rxjs';
import { Place } from '../place.model';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);

  isFetching = signal(false);

  error = signal('');

  private httpClient = inject(HttpClient);

  private destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<{ places: Place[] }>(
        'http://localhost:3000/user-places' /*,
        {
          // observe: 'response'
          observe: 'events'
          // when observing events: you get notified of various
          // events that occur during the lifecycle of the
          // request
        }*/
      )
      .pipe(
        map((resData) => resData.places),
        catchError((error) => {
          // Managing the error here leaves the subscriber
          // object cleaner
          console.log(error);
          return throwError(() => {
            return new Error('Something went wrong fetching the user places. Please try again later.');
          });
        })
      )
      .subscribe({
        next: (places) => {
          //console.log(response);
          // console.log(response.body?.places); // if observing response
          this.places.set(places);
        },
        error: (error: Error) => {
          this.error.set(error.message);
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
