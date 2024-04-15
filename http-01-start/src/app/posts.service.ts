import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = {
      title,
      content,
    };

    this.http
      .post<{ name: string }>(
        'https://ng-complete-guide-28b6c-default-rtdb.firebaseio.com/posts.json',
        postData,
        {
          observe: 'response', // 'body' is the default
        }
      )
      .subscribe((responseData) => {
        console.log(responseData.body);
      });
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http
      .get<Record<string, Post>>(
        'https://ng-complete-guide-28b6c-default-rtdb.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
          params: searchParams,
        }
      )
      .pipe(
        map((responseData) => {
          if (responseData == null) {
            return [];
          }
          return Object.keys(responseData).map((k) => ({
            ...responseData[k],
            id: k,
          }));
        }),
        catchError((errorRes) => {
          // send to analytics server
          return throwError(() => errorRes);
        })
      );
  }

  deletePosts() {
    return this.http
      .delete(
        'https://ng-complete-guide-28b6c-default-rtdb.firebaseio.com/posts.json',
        {
          observe: 'events',
          // responseType: 'json', // the default
          responseType: 'text',
        }
      )
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
