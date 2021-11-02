import { Component } from '@angular/core';
import { User } from './user/user.model';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mikrum2111-rxjs';

  constructor(public userService: UserService) {
    let user = new User('Peter');
    this.userService.setCurrentUser(user);
  }
}
