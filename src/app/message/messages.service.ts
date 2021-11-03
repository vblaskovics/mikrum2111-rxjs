import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map, scan, shareReplay } from 'rxjs/operators';
import { Thread } from '../thread/thread.model';
import { User } from '../user/user.model';
import { Message } from './message.model';

const initialMessages: Message[] = [];

interface IMessagesOperation extends Function {
  (messages: Message[]): Message[];
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  newMessages: Subject<Message> = new Subject<Message>();

  messages: Observable<Message[]>;

  updates: Subject<any> = new Subject<any>();

  create: Subject<Message> = new Subject<Message>();

  constructor() {
    this.messages = this.updates.pipe(
      scan((messages: Message[], operation: IMessagesOperation) => {
        return operation(messages);
      }, initialMessages),
      shareReplay(1)
    );

    this.create.pipe(
      map((message: Message): IMessagesOperation => {
        return (messages: Message[]) => {
          return messages.concat(message);
        };
      })
    ).subscribe(this.updates);

    this.newMessages.subscribe(this.create);

    // PÉLDA HASZNÁLAT:
    // let myMessage = new Message({text:"hello"});

    // this.updates.next( (messages:Message[]): Message[] => {
    //   return messages.concat(myMessage);
    // });


  }

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
