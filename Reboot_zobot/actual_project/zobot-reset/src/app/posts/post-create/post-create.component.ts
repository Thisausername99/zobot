import { Component} from '@angular/core';
// import {Post} from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  //styleUrls : ['/post-create.component.css']
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';
  id = 0;
  //@Output() postCreated =new EventEmitter<Post>(); listen from outside of this components

  constructor(public postsService: PostsService) {}

  addBlock() {
    this.postsService.addPost('', ++this.id);
    console.log(this.postsService.getPosts());
  }


  /*onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    /*const post : Post ={ //only pass and emit post
      title : form.value.title,
      content : form.value.content
    }
    this.postsService.addPost(form.value.suggestion);
    form.resetForm();
  }*/
}
