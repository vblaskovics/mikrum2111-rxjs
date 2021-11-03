import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Thread } from '../thread/thread.model';
import { User } from '../user/user.model';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  newMessages: Subject<Message> = new Subject<Message>();

  constructor() { }

  addMessage(message: Message) {
    this.newMessages.next(message);
  }

  messagesForThreadUser(thread: Thread, user: User): Observable<Message> {
    return this.newMessages.pipe(
      filter((message: Message) => {
        return message.thread.id === thread.id &&
          message.author.id === user.id;
      })
    );
  }

}
