import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, publish, publishReplay, refCount, scan, shareReplay } from 'rxjs/operators';
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

  messages: Subject<Message[]> = new BehaviorSubject<Message[]>([]);

  updates: Subject<any> = new Subject<any>();

  create: Subject<Message> = new Subject<Message>();

  markThreadAsRead: Subject<any> = new Subject<any>();

  constructor() {
    this.updates.pipe(
      scan((messages: Message[], operation: IMessagesOperation) => {
        return operation(messages);
      }, initialMessages)
    ).subscribe(this.messages);

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

    this.markThreadAsRead.pipe(
      map((thread: Thread) => {
        let operator:IMessagesOperation;
        operator = (messages: Message[]): Message[] => {
          return messages.map((message:Message)=>{
            if (message.thread.id === thread.id) {
              message.isRead = true;
            }
            return message;
          });
        };
        return operator;
      })
    ).subscribe(this.updates);


  }

  addMessage(message: Message) {
    this.newMessages.next(message);
  }

  messagesForThreadUser(thread: Thread, user: User): Observable<Message> {
    return this.newMessages.pipe(
      filter((message: Message) => {
        return message.thread.id === thread.id &&
          message.author.id !== user.id;
      })
    );
  }

}
