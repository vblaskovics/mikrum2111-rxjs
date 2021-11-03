import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-chat-nav-bar',
  templateUrl: './chat-nav-bar.component.html'
})
export class ChatNavBarComponent implements OnInit {

  public user!:User;

  constructor(public userService:UserService) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(u => {
      console.log('nav-bar', u.name);
      this.user = u;
    });
  }

}
