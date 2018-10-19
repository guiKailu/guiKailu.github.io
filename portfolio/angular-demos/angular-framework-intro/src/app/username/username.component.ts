import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-username',
  template: `
    <p (click)="onUsernameClicked()">{{username}}</p>
  `
})

export class UsernameComponent {
  @Input() username = String;
  @Output() userClicked = new EventEmitter<string>();

  onUsernameClicked(){
    this.userClicked.emit(this.username);
  }
}
