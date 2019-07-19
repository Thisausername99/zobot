import {Post} from './post.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { actionReply } from '../trigger-handler/reply.model';
import { QuesService } from '../message-handler/question-storage.service';
import { post } from 'selenium-webdriver/http';

@Injectable({providedIn: 'root'})
export class PostsService {

  constructor(quesService: QuesService) {}

  private questionStorage: QuesService [] = [];
  private posts: Post[] = [];
  private reply: actionReply[] = [];
  private postsUpdated = new Subject<Post[]>();
  private replyUpdated = new Subject <actionReply[]>(); // to store reply

  getPosts() {
    return [...this.posts]; //return new array instead of preference
  }

  deletePost(index: number) {
    this.posts.splice(index , 1);
  }

  getReplyUpdateListener() {
    return this.replyUpdated.asObservable();
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(newSuggest: string, newId: number) {
    const post: Post = {suggestion: newSuggest, id: newId};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
