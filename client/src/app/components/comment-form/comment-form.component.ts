import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  @Input() id: string;
  @Input() context: 'post' | 'comment' = 'post';
  @Output() newCommentEvent = new EventEmitter<any>();

  commentForm: FormGroup = new FormGroup({
    comment: new FormControl('', Validators.required)
  });

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const key = this.context === 'post' ? 'postId' : 'parentCommentId';
    const paramsObj: Object = {
      text: this.commentForm.value.comment,
      author: 13, // TODO: Don't use hardcoded value
      [key]: this.id
    };

    this.commentService.postComment(paramsObj).subscribe(() => {
      this.newCommentEvent.emit();
    });
    this.commentForm.reset();
  }
}
