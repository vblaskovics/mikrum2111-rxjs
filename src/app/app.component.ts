import { Component } from '@angular/core';
import { ChatExampleData } from './data/chat-example-data';
import { MessagesService } from './message/messages.service';
import { ThreadService } from './thread/thread.service';
import { User } from './user/user.model';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mikrum2111-rxjs';

  constructor(public messagesService: MessagesService,
    public threadService: ThreadService,
    public userService: UserService) {
      ChatExampleData.init(messagesService, threadService, userService);
  }
}
