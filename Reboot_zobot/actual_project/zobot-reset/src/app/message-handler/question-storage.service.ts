import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

export interface Question{
  question: string;
}

@Injectable({providedIn: 'root'})
export class QuesService{
  private questionStorage : Question[] = [];
  private quesUpdated = new Subject<Question[]>();
  getPosts(){
    return [...this.questionStorage]; //return new array instead of preference
  }


  getPostUpdateListener(){
    return this.quesUpdated.asObservable();
  }

  addQues(question: string ){
    const post: Question ={question : question};
    this.questionStorage.push(post);
    this.quesUpdated.next([...this.questionStorage]);
  }
}
