import { Component, OnInit, Input } from "@angular/core";
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef
} from "primeng/dynamicdialog";
import { NgbButtonLabel } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-comments-modal",
  templateUrl: "./comments-modal.component.html",
  styleUrls: ["./comments-modal.component.scss"],
  providers: [DialogService]
})
export class CommentsModalComponent implements OnInit {
  comments = [];
  author;
  comment;
  editingComment;
  editingCommentObj;

  constructor(
    public dialogService: DialogService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.comments = this.config.data.comments;
    console.log(this.comments);
  }
  submit() {
    if (!this.comments) {
      this.comments = [];
    }
    this.comments.unshift({
      author: this.author,
      comment: this.comment,
      date: new Date()
    });
    this.author = null;
    this.comment = null;
    this.ref.close(this.comments);
  }
  editComment(index) {
    this.editingComment = index;
    this.editingCommentObj = this.comments[index];
  }
  deleteComment(index) {
    this.comments.splice(index, 1);
  }
  saveComment() {
    this.comments[this.editingComment].date = new Date();
    this.comments = this.comments.sort((a, b) => 
      b.date - a.date
    );
    this.editingComment = null;
  }
  onHide() {
    console.log("ssss");
  }
}
