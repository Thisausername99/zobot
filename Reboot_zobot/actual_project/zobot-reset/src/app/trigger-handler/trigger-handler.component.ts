import {Component} from '@angular/core';
import {actionReply} from './reply.model';
import { NgForm } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { PostsService } from '../posts/posts.service';
import { STEPS } from '../build-flow/workflow.model';

@Component({
  selector : 'app-trigger-handler',
  templateUrl : './trigger-handler.component.html',
  styleUrls : ['./trigger-handler.component.css']
})

export class TriggerHandlerComponent{
  welcome: actionReply[] = [];
  welcomeText = '';
  constructor(public postsService: PostsService) {}


  edit(newReply: string) {
    console.log(newReply);
    this.welcomeText = newReply;
  }

  triggerCreate(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.welcomeText = form.value.handlerReply;
  }

  triggerBuild() { // to build script for trigger hanlder
    let trigScript = 'response=Map();\n';
    const triggerResult = this.postsService.getPosts();
    trigScript += 'response.put("replies",{"' + this.welcomeText + '"});\n';
    trigScript += 'response.put("suggestions",{';
    for (let n = 0; n <= triggerResult.length - 1; n++) {
        if (n < triggerResult.length - 1) {
          trigScript += '"' + triggerResult[n].suggestion + '",';
        }
        if (n === triggerResult.length - 1) {
          trigScript += '"' + triggerResult[n].suggestion + '"' + '});\n';
        }
      }
    trigScript += 'return response;';
    console.log(trigScript);
  }
}
