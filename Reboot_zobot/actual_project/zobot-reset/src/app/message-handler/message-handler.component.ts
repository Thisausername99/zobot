import {Component, OnInit , Input} from '@angular/core';
import { PostsService } from '../posts/posts.service';
import { _getOptionScrollPosition } from '@angular/material';

export interface MessageObject {
  id: number;
  response: string; // can be question
  question: boolean
  quit: boolean;
  quitChoice: string;
}

@Component({
  selector : 'app-message-hanlder',
  templateUrl : './message-handler.component.html',
  styleUrls : ['./message-handler.component.css']
})

export class MessageHandlerComponent implements OnInit {
  constructor(public postsService: PostsService) {}
  show: boolean = false;
  forQuit = '';
  @Input() messageStorage: MessageObject[] = []; // to store whether the option for message obj
  trigSuggestion = this.postsService.getPosts(); // grab the suggestion
  messageText = this.trigSuggestion.length > 0 ? 'The suggestions are' : '';
  quitOption: string[] = ['Quit', 'Call Support'];

  ngOnInit() {}

  toggleSelection(event: any, text: string) {
    const newMes: MessageObject = {id : this.messageStorage.length , response : '', question : false, quit : false , quitChoice : ''};
    // how to check if checkbox is selected or not
    if (event === 'quit') {
    newMes.response = text; // to pass the message;
    newMes.quit = true;
    newMes.quitChoice = this.forQuit;
    this.show = true;
    }
    if (event === 'question') {
    newMes.response = text;
    newMes.question = true;
    }
    // const magenicVendorExists =  this.messageStorage.reduce((accumulator, vendor) => (accumulator||vendor.id === newMes.id), false);
    if (this.messageStorage.length < this.trigSuggestion.length) {
    this.messageStorage.push(newMes); // add to the storage
    }
    console.log(this.messageStorage);
  }

  /*getInfo() { // store whether the user option
    let msgScript ='response=new Map();\n';
    const resultFlush = this.postsService.getPosts();
    for (let n = 0; n <= resultFlush.length - 1 ; n++) {
      if (n < resultFlush.length - 1) {
        msgScript += '!msg.equalsIgnoreCase("' + resultFlush[n].suggestion + '")&&';
      } else if (n === resultFlush.length - 1) {
        msgScript += '!msg.equalsIgnoreCase("' + resultFlush[n].suggestion  + '")){';
      }
    }
    msgScript += '}}\nif(!msg.isNull()){\nresponse.put("action","context");\n';
    for (let n = 0; n <= this.messageStorage.length; n++) {
      if (this.messageStorage[n].question) {
        msgScript += 'if(msg.equalsIgnoreCase("' + resultFlush[n].suggestion + '))';
        }
      }
  }*/
}
