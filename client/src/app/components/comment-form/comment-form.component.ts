import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  @Input() id: string;
  @Input() context: 'post' | 'comment' = 'post';
  commentForm: FormGroup = new FormGroup({
    comment: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    //  TODO: Make a Post request to the comment API
    console.log(this.commentForm.value);
  }
}
