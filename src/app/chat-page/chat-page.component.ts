import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../message/messages.service';
import { ThreadService } from '../thread/thread.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css'],
})
export class ChatPageComponent implements OnInit {

  constructor(
    private userService: UserService,
    private messageService: MessagesService,
    private threadService: ThreadService
  ) {
  }

  ngOnInit(): void {
    

  }

}
