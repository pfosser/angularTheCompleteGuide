import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';

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
    const customIntervalObservable = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count++);
      }, 1000);
    });

    this.firstObsSub = customIntervalObservable.subscribe((count) =>
      console.log(count)
    );
  }

  ngOnDestroy(): void {
    this.firstObsSub.unsubscribe();
  }
}
