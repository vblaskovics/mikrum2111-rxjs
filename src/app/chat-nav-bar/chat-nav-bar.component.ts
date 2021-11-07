import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../message/messages.service';
import { ThreadService } from '../thread/thread.service';

@Component({
  selector: 'app-chat-nav-bar',
  templateUrl: './chat-nav-bar.component.html'
})
export class ChatNavBarComponent implements OnInit {

  constructor(
    private messagesService:MessagesService, private threadService: ThreadService) {
    }

  ngOnInit(): void {
    // TODO megcsinálni az olvasatlan üzenet számlálót!
  }

}
