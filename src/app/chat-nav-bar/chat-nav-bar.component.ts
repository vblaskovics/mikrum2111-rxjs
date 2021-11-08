import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessagesService } from '../message/messages.service';
import { ThreadService } from '../thread/thread.service';

@Component({
  selector: 'app-chat-nav-bar',
  templateUrl: './chat-nav-bar.component.html'
})
export class ChatNavBarComponent implements OnInit {
  unreadMessagesCounter: Observable<number> = new Observable();

  constructor(
    private messagesService:MessagesService, private threadService: ThreadService) {
    }

  ngOnInit(): void {
    // TODO megcsinálni az olvasatlan üzenet számlálót!
    this.unreadMessagesCounter = combineLatest([
      this.threadService.currentThread,
      this.messagesService.messages
    ]).pipe(
      map(([currentThread, messages]) => {
        return messages
          .filter(m => currentThread.id !== m.thread.id && !m.isRead)
          .length
      })
    );
  }

}
