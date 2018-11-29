import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Yann';
  elements: number[] = [];
  message = '';
  hobbies: string[] = ['hiking', 'cooking', 'reading'];
  hobby = '';

  onChangeName() {
    this.name = "Mikaela";
  }

  onAddElement(){
    this.elements.push(this.elements.length + 1);
  }

  getColor(element: number){
    return element  % 2 === 0 ? 'green' : 'red';
  }

  onUserWasClicked(usrName: string) {
    alert(usrName);
  }

  onAddHobby() {
    this.hobbies.push(this.hobby);
  }
}
