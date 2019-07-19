import { Component, OnInit, OnDestroy } from '@angular/core';
import {Post} from '../post.model';
import { PostsService } from '../posts.service';
import {Subscription} from 'rxjs';
import { actionReply } from 'src/app/trigger-handler/reply.model';
import { FormControl , FormGroup, FormArray  } from '@angular/forms';

export interface MessageObject {
  id: number;
  response: string; // can be question
  question: boolean;
  quit: boolean;
  quitChoice: string;
}


@Component({
  selector : 'app-post-list',
  templateUrl : '/post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy{
    /*posts=[
      {title: 'First Post', content: 'This is the first post'},
      {title: 'Second Post', content: 'This is the first post'},
      {title: 'Third Post', content: 'This is the first post'},
    ];*/
    posts: Post [] = [];
    private postsSub: Subscription;
    messageStorage: MessageObject[] = [];
    quitOptionArr: string[] = ['Quit', 'Call Support'];
    question = new FormControl('');
    quitText = new FormControl('');
    response = new FormControl('');
    quitOption: string;
    constructor(public postsService: PostsService) {}

    updateQuestion(text: string, index: number) {
      alert(text);
      alert(index);
      if (this.messageStorage.length <= index) {
      const quesObj = {id: index, response : text, question : true, quit: false , quitChoice: ''};
      this.messageStorage.push(quesObj);
      console.log(this.messageStorage);
      } else {
        this.messageStorage[index].response = text;
        console.log(this.messageStorage);
      }
      this.question.setValue('');
    }

    updateResponse(text: string, index: number) {
      if (this.messageStorage.length <= index) {
        const quitObj = {id: index, response : text, question : false, quit: false , quitChoice: '' };
        this.messageStorage.push(quitObj);
      } else {
        this.messageStorage[index].response = text;
      }
      this.response.setValue('');
    }

    updateQuit(text: string, index: number) {
      alert(text);
      alert(index);
      if (this.messageStorage.length <= index) {
      const quitObj = {id: index, response : text, question : false, quit: true , quitChoice: this.quitOption };
      this.messageStorage.push(quitObj);
      console.log(this.messageStorage);
      } else {
        this.messageStorage[index].response = text;
      }
      console.log(this.messageStorage);
      this.quitText.setValue('');
      }

    removePostOption(index: number) {
      if (this.messageStorage.length > index) {
      this.messageStorage.splice(index, 1);
      console.log(this.messageStorage);
      } else {
      return;
      }
    }

    removeSuggest(index: number) {
      if (this.posts.length > index) {
      this.posts.splice(index , 1);
      this.postsService.deletePost(index);
      this.removePostOption(index);
      console.log(this.posts);
      } else {
      return;
      }
    }

    ngOnInit() {
        this.posts = this.postsService.getPosts();
        this.postsSub = this.postsService.getPostUpdateListener()
          .subscribe(( posts: Post[] ) => {
            this.posts = posts;
          });
    }

    ngOnDestroy() {
      this.postsSub.unsubscribe();
    }
}
