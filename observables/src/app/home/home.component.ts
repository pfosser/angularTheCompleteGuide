import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, interval, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSub!: Subscription;

  constructor() {}
  ngOnInit() {
    // this.firstObsSub = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });
    const customIntervalObservable: Observable<number> = new Observable(
      (observer) => {
        let count = 0;
        setInterval(() => {
          observer.next(count++);
          if (count === 2) {
            observer.complete();
          }
          if (count > 3) {
            observer.error(new Error('Count is greater than 3!'));
          }
        }, 1000);
      }
    );

    this.firstObsSub = customIntervalObservable
      .pipe(map((data: number) => `Round ${data + 1}`))
      .subscribe({
        next: (count) => console.log(count),
        error: (error) => {
          console.log(error);
          alert(error);
        },
        complete: () => console.log('Completed'),
      });
  }

  ngOnDestroy(): void {
    this.firstObsSub.unsubscribe();
  }
}
