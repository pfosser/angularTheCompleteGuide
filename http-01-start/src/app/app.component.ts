import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('postForm')
  postForm!: NgForm;

  loadedPosts: Post[] = [];

  isFetching = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.http
      .post<{ name: string }>(
        'https://ng-complete-guide-28b6c-default-rtdb.firebaseio.com/posts.json',
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.isFetching = true;
    this.http
      .get<Record<string, Post>>(
        'https://ng-complete-guide-28b6c-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(
        map((responseData) =>
          Object.keys(responseData).map((k) => ({
            ...responseData[k],
            id: k,
          }))
        )
      )
      .subscribe((posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      });
  }
}
