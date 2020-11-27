import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: any;
  replies: any[];
  showSubComments: boolean = false;
  showReplyForm: boolean = false;

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
  }

  showReplies = () => {
    this.commentService.getCommentReplies(this.comment.id).subscribe((replies: any) => {
      this.replies = replies;
      this.showSubComments = !this.showSubComments;
    });
  }

  reply = () => {
    this.showReplyForm = !this.showReplyForm;
  }
}
